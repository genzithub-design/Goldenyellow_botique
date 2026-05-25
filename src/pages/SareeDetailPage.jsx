import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Heart, Share2, CornerDownRight, Sparkles } from 'lucide-react';
import { allSareesList, sareeDataMap } from '../data';
import { WhatsAppInquiry, SareeCard } from '../components';

export default function SareeDetailPage() {
  const { id } = useParams();
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transform: 'scale(1)' });
  const containerRef = useRef(null);

  // Find the current saree
  const saree = useMemo(() => {
    return allSareesList.find((item) => item.id === id);
  }, [id]);

  // Find related sarees (same material or collection, excluding current)
  const relatedSarees = useMemo(() => {
    if (!saree) return [];
    return allSareesList
      .filter((item) => item.material === saree.material && item.id !== saree.id)
      .slice(0, 3);
  }, [saree]);

  // Find category slug for breadcrumbs
  const categorySlug = useMemo(() => {
    if (!saree) return '';
    for (const [slug, list] of Object.entries(sareeDataMap)) {
      if (list.some((item) => item.id === saree.id)) {
        return slug;
      }
    }
    return '';
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
    <div className="bg-cream-100 min-h-screen pb-24">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-cream-50 py-3.5 border-b border-gold-200/20">
        <div className="container-main flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted font-semibold">
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
          <span className="text-charcoal-800 font-bold">{saree.name}</span>
        </div>
      </div>

      {/* 2. PRODUCT DETAIL SPLIT */}
      <section className="container-main pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: IMAGE VIEWER WITH ZOOM */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Interactive Zoom Box */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] bg-cream-50 border border-gold-200 rounded-sm overflow-hidden cursor-crosshair shadow-lg"
            >
              {/* Actual Image */}
              <img
                src={saree.image}
                alt={saree.name}
                className="w-full h-full object-cover object-top transition-transform duration-200"
                style={zoomStyle.display === 'none' ? {} : { transform: zoomStyle.transform, transformOrigin: zoomStyle.transformOrigin }}
              />

              {/* Hover indicator cue */}
              {zoomStyle.display === 'none' && (
                <div className="absolute bottom-4 right-4 bg-charcoal-900/60 backdrop-blur-sm text-cream-50 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm flex items-center gap-1 font-sans pointer-events-none">
                  <Sparkles size={10} className="text-gold-accent animate-pulse" />
                  Hover to Magnify Weave
                </div>
              )}
            </div>
            
            {/* Authenticity Certificate Box */}
            <div className="flex items-center gap-4 bg-cream-50 border border-gold-200/50 p-4 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-gold-light/20 flex items-center justify-center text-gold-vintage border border-gold-300/40">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-burgundy-900">
                  Certified Heritage Handloom
                </h4>
                <p className="text-[10px] text-muted font-light leading-relaxed">
                  Accompanying Silk Mark label ensures authentic mulberry silk threads and real gold-plated metallic border zari threads.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT DETAILS & WHATSAPP CTA */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Header info */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-vintage font-bold bg-gold-light/20 border border-gold-300/30 px-3 py-1.5 rounded-sm inline-block mb-3">
                {saree.material}
              </span>
              
              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-800 font-light tracking-wide leading-tight">
                {saree.name}
              </h1>
              
              <div className="flex items-center justify-between mt-3 pb-4 border-b border-gold-200/30">
                <span className="text-2xl font-serif text-burgundy-850 font-semibold tracking-wide">
                  {saree.price}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
                  SKU: {saree.id}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] uppercase tracking-widest font-bold text-charcoal-750">
                Drape Story & Weave Details
              </h4>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                {saree.description}
              </p>
            </div>

            {/* Spec Table */}
            <div className="bg-cream-50 border border-gold-200/40 rounded-sm overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 border-b border-gold-200/20 bg-cream-100/50">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-burgundy-900">
                  Specifications
                </h4>
              </div>
              <div className="divide-y divide-gold-200/20 font-sans text-xs">
                <div className="grid grid-cols-2 px-5 py-2.5">
                  <span className="text-muted font-light">Material / Fabric</span>
                  <span className="text-charcoal-800 font-medium">{saree.material}</span>
                </div>
                <div className="grid grid-cols-2 px-5 py-2.5">
                  <span className="text-muted font-light">Color Palette</span>
                  <span className="text-charcoal-800 font-medium">{saree.color}</span>
                </div>
                {saree.zariType && (
                  <div className="grid grid-cols-2 px-5 py-2.5">
                    <span className="text-muted font-light">Zari Description</span>
                    <span className="text-charcoal-800 font-medium">{saree.zariType}</span>
                  </div>
                )}
                {saree.weavingTechnique && (
                  <div className="grid grid-cols-2 px-5 py-2.5">
                    <span className="text-muted font-light">Weaving Style</span>
                    <span className="text-charcoal-800 font-medium">{saree.weavingTechnique}</span>
                  </div>
                )}
                {saree.borderSize && (
                  <div className="grid grid-cols-2 px-5 py-2.5">
                    <span className="text-muted font-light">Border Dimensions</span>
                    <span className="text-charcoal-800 font-medium">{saree.borderSize}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 px-5 py-2.5">
                  <span className="text-muted font-light">Care Recommendation</span>
                  <span className="text-charcoal-800 font-medium">{saree.careInstructions}</span>
                </div>
                <div className="grid grid-cols-2 px-5 py-2.5">
                  <span className="text-muted font-light">Recommended Occasion</span>
                  <span className="text-charcoal-800 font-medium">{saree.occasion}</span>
                </div>
              </div>
            </div>

            {/* Styling advice / note */}
            <div className="flex flex-col gap-2 p-5 bg-gold-light/10 border border-gold-300/20 rounded-sm">
              <h5 className="text-[10px] uppercase tracking-wider font-bold text-gold-vintage flex items-center gap-1.5">
                <CornerDownRight size={12} /> Designer Styling Tip
              </h5>
              <p className="text-[11px] text-muted font-light leading-relaxed">
                Pair this {saree.color.toLowerCase()} drape with classic antique gold temple jewelry, a traditional silk brocade blouse, and clean jasmine blooms in your hair to capture authentic luxury heritage.
              </p>
            </div>

            {/* WhatsApp Inquiry CTA */}
            <div className="flex flex-col gap-3.5 mt-2">
              <WhatsAppInquiry saree={saree} className="w-full py-4 text-xs tracking-widest font-semibold" />
              <p className="text-[10px] text-muted text-center leading-relaxed font-light">
                Our sales team replies within 1 hour to share full pricing, high-res videos, and arrange global shipping configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS */}
      {relatedSarees.length > 0 && (
        <section className="container-main pt-24 mt-12 border-t border-gold-200/20">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
              Complementary Weaves
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-800 tracking-wide font-light">
              You May Also Admire
            </h2>
            <div className="w-12 h-[1px] bg-gold-vintage mt-1"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedSarees.map((item) => (
              <SareeCard key={item.id} saree={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
