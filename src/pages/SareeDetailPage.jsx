import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Heart, Share2, CornerDownRight, Sparkles, Loader } from 'lucide-react';
import { getAllProducts } from '../api/admin';
import { WhatsAppInquiry, SareeCard, Footer } from '../components';
import { optimizeUnsplashUrl } from '../utils/image';

export default function SareeDetailPage() {
  const { id } = useParams();
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transform: 'scale(1)' });
  const containerRef = useRef(null);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductData() {
      try {
        const prods = await getAllProducts();
        setAllProducts(prods);
      } catch (err) {
        console.error('Failed to load database catalog products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
  }, []);

  // Find the current saree
  const saree = useMemo(() => {
    return allProducts.find((item) => item.id === id);
  }, [allProducts, id]);

  // Find related sarees (same material or collection, excluding current)
  const relatedSarees = useMemo(() => {
    if (!saree) return [];
    return allProducts
      .filter((item) => item.material === saree.material && item.id !== saree.id)
      .slice(0, 3);
  }, [allProducts, saree]);

  // Find category slug for breadcrumbs
  const categorySlug = useMemo(() => {
    return saree ? saree.collectionSlug : '';
  }, [saree]);

  // Beautiful interactive zoom-magnifier on hover
  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', transform: 'scale(1)' });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gold-accent gap-2">
        <Loader className="animate-spin" size={28} />
        <span className="text-[10px] uppercase tracking-widest font-bold">Revealing Weave Craft...</span>
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="container-main py-20 text-center">
        <h2 className="font-serif text-3xl mb-4 text-charcoal-800">Saree Not Found</h2>
        <p className="text-xs text-muted mb-8">The requested heritage weave could not be located in our catalog.</p>
        <Link to="/collections" className="btn-burgundy">
          Return to Showroom
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0E0C10] min-h-screen pb-24">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-[#120F15] py-3.5 border-b border-white/5">
        <div className="container-main flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">
          <Link to="/" className="hover:text-gold-accent transition-colors duration-300">Home</Link>
          <ChevronRight size={10} />
          {categorySlug && (
            <>
              <Link to={`/collections/${categorySlug}`} className="hover:text-gold-accent transition-colors duration-300">
                {saree.material}
              </Link>
              <ChevronRight size={10} />
            </>
          )}
          <span className="text-white/80 font-bold">{saree.name}</span>
        </div>
      </div>

      {/* 2. PRODUCT DETAIL SPLIT */}
      <section className="container-main pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: IMAGE VIEWER WITH ZOOM */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Main Interactive Zoom Box */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] bg-[#120F15] border border-white/5 rounded-lg overflow-hidden cursor-crosshair shadow-2xl"
            >
              {/* Actual Image */}
              <img
                src={optimizeUnsplashUrl(saree.image, 1000)}
                alt={saree.name}
                className="w-full h-full object-cover object-top transition-transform duration-200"
                style={zoomStyle.display === 'none' ? {} : { transform: zoomStyle.transform, transformOrigin: zoomStyle.transformOrigin }}
              />

              {/* Hover indicator cue */}
              {zoomStyle.display === 'none' && (
                <div className="absolute bottom-4 right-4 bg-[#0F0D11]/90 backdrop-blur-md border border-white/10 text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 font-sans pointer-events-none">
                  <Sparkles size={8} className="text-gold-accent animate-pulse" />
                  Hover to Magnify Weave
                </div>
              )}
            </div>
            
            {/* Authenticity Certificate Box */}
            <div className="flex items-center gap-4 bg-[#120F15] border border-white/5 p-5 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-accent border border-white/10 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-gold-accent">
                  Certified Heritage Handloom
                </h4>
                <p className="text-[10px] text-white/40 font-light leading-relaxed mt-1">
                  Accompanying Silk Mark label ensures authentic mulberry silk threads and real gold-plated metallic border zari threads.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT DETAILS & WHATSAPP CTA */}
          <div className="lg:col-span-6 flex flex-col gap-8 lg:sticky lg:top-28">
            
            {/* Header info */}
            <div>
              <span className="text-[8px] uppercase tracking-[0.25em] text-gold-accent font-extrabold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 inline-block mb-4">
                {saree.material}
              </span>
              
              <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-wide leading-tight">
                {saree.name}
              </h1>
              
              <div className="flex items-center justify-between mt-4 pb-4 border-b border-white/5">
                <span className="text-2xl font-serif text-gold-accent font-light tracking-wide">
                  {saree.price}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">
                  SKU: {saree.id}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-gold-accent">
                Drape Story & Weave Details
              </h4>
              <p className="text-xs sm:text-sm text-white/55 font-light leading-relaxed">
                {saree.description}
              </p>
            </div>

            {/* Spec Table */}
            <div className="bg-[#120F15] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
              <div className="px-5 py-3.5 border-b border-white/5 bg-[#16121A]">
                <h4 className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-gold-accent">
                  Specifications
                </h4>
              </div>
              <div className="divide-y divide-white/5 font-sans text-xs">
                <div className="grid grid-cols-2 px-5 py-3">
                  <span className="text-white/40 font-light">Material / Fabric</span>
                  <span className="text-white font-medium">{saree.material}</span>
                </div>
                <div className="grid grid-cols-2 px-5 py-3">
                  <span className="text-white/40 font-light">Color Palette</span>
                  <span className="text-white font-medium">{saree.color}</span>
                </div>
                {saree.zariType && (
                  <div className="grid grid-cols-2 px-5 py-3">
                    <span className="text-white/40 font-light">Zari Description</span>
                    <span className="text-white font-medium">{saree.zariType}</span>
                  </div>
                )}
                {saree.weavingTechnique && (
                  <div className="grid grid-cols-2 px-5 py-3">
                    <span className="text-white/40 font-light">Weaving Style</span>
                    <span className="text-white font-medium">{saree.weavingTechnique}</span>
                  </div>
                )}
                {saree.borderSize && (
                  <div className="grid grid-cols-2 px-5 py-3">
                    <span className="text-white/40 font-light">Border Dimensions</span>
                    <span className="text-white font-medium">{saree.borderSize}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 px-5 py-3">
                  <span className="text-white/40 font-light">Care Recommendation</span>
                  <span className="text-white font-medium">{saree.careInstructions}</span>
                </div>
                <div className="grid grid-cols-2 px-5 py-3">
                  <span className="text-white/40 font-light">Recommended Occasion</span>
                  <span className="text-white font-medium">{saree.occasion}</span>
                </div>
              </div>
            </div>

            {/* Styling advice / note */}
            <div className="flex flex-col gap-2 p-5 bg-[#17131D]/80 border border-white/5 rounded-lg">
              <h5 className="text-[10px] uppercase tracking-wider font-extrabold text-gold-accent flex items-center gap-1.5">
                <CornerDownRight size={12} /> Designer Styling Tip
              </h5>
              <p className="text-[11px] text-white/50 font-light leading-relaxed">
                Pair this {saree.color.toLowerCase()} drape with classic antique gold temple jewelry, a traditional silk brocade blouse, and clean jasmine blooms in your hair to capture authentic luxury heritage.
              </p>
            </div>

            {/* WhatsApp Inquiry CTA */}
            <div className="flex flex-col gap-3.5 mt-2">
              <WhatsAppInquiry saree={saree} className="w-full py-4 text-xs tracking-widest font-semibold" />
              <p className="text-[9px] text-white/35 text-center leading-relaxed font-light">
                Our sales team replies within 1 hour to share full pricing, high-res videos, and arrange global shipping configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS */}
      {relatedSarees.length > 0 && (
        <section className="container-main pt-24 mt-12 border-t border-white/5">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-bold">
              Complementary Weaves
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide font-light">
              You May Also Admire
            </h2>
            <div className="w-12 h-[1px] bg-gold-accent mt-1"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedSarees.map((item) => (
              <SareeCard key={item.id} saree={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
