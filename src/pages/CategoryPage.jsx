import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SareeCard, Footer } from '../components';
import { optimizeUnsplashUrl } from '../utils/image';
import { collections, products } from '../data';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  // Find collection details statically
  const collectionMeta = useMemo(() => {
    return collections.find((col) => col.slug === categorySlug);
  }, [categorySlug]);

  // Filter products by collection slug
  const collectionProducts = useMemo(() => {
    if (!categorySlug) return [];
    return products.filter((p) => p.collectionSlug === categorySlug);
  }, [categorySlug]);

  // Filter products by subcategory
  const filteredProducts = useMemo(() => {
    if (activeSubcategory === 'All') {
      return collectionProducts;
    }
    return collectionProducts.filter((p) => p.subcategory === activeSubcategory);
  }, [collectionProducts, activeSubcategory]);

  // Helper: parse price string e.g. "₹45,500" -> 45500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const prods = [...filteredProducts];
    if (sortBy === 'price-low') {
      return prods.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === 'price-high') {
      return prods.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return prods; // 'featured'
  }, [filteredProducts, sortBy]);

  if (!collectionMeta) {
    return (
      <div className="container-main py-24 text-center">
        <h2 className="font-serif text-3xl mb-4 text-[var(--text-main)]">Category Not Found</h2>
        <p className="text-xs text-[var(--text-muted)] mb-8">The requested collection catalog could not be loaded.</p>
        <Link to="/collections" className="btn-gold py-2.5 px-6 text-[9px] tracking-widest uppercase font-bold inline-flex">
          Back to All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20 text-[var(--text-main)] transition-colors duration-500">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-[var(--bg-card)] py-3.5 border-b border-[var(--border-glow)]">
        <div className="container-main flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
          <Link to="/" className="hover:text-gold-accent transition-colors duration-300">Home</Link>
          <ChevronRight size={10} />
          <Link to="/collections" className="hover:text-gold-accent transition-colors duration-300">Collections</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--text-main)] font-bold">{collectionMeta.title}</span>
        </div>
      </div>

      {/* 2. MINIMAL LUXURY HEADER */}
      <section className="bg-[#08060A] py-14 relative overflow-hidden border-b border-gold-accent/10">
        {/* Subtle decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="container-main text-center relative z-10 flex flex-col items-center">
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-light tracking-[0.2em] uppercase">
            {collectionMeta.title}
          </h1>
          <div className="w-16 h-[1px] bg-gold-accent mt-5 opacity-60" />
        </div>
      </section>

      {/* 4. PRODUCT SHOWROOM GRID */}
      <section className="container-main pt-16">
        <div className="flex flex-col gap-8 w-full">
          
          {/* Subcategories Filter Chips (Luxury Glassmorphic Pills) */}
          {collectionMeta.subcategories && collectionMeta.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-3 items-center justify-start py-2 border-b border-gold-accent/10 pb-8">
              <button
                onClick={() => setActiveSubcategory('All')}
                className={`text-[9px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full font-extrabold transition-all duration-500 border ${
                  activeSubcategory === 'All'
                    ? 'bg-gold-accent text-burgundy-950 border-gold-accent shadow-xl shadow-gold-accent/20 scale-102'
                    : 'bg-white/5 backdrop-blur-md text-white/70 border-gold-accent/15 hover:bg-white/10 hover:border-gold-accent/30 hover:text-white hover:-translate-y-0.5'
                }`}
              >
                All
              </button>
              {collectionMeta.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`text-[9px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full font-extrabold transition-all duration-500 border ${
                    activeSubcategory === sub
                      ? 'bg-gold-accent text-burgundy-950 border-gold-accent shadow-xl shadow-gold-accent/20 scale-102'
                      : 'bg-white/5 backdrop-blur-md text-white/70 border-gold-accent/15 hover:bg-white/10 hover:border-gold-accent/30 hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Sorting / Catalog details bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-glow)] pb-4 mb-2">
            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Heritage Showroom
              </span>
              <span className="text-[11px] text-[var(--text-muted)] tracking-wider">
                Showing <strong>{sortedProducts.length}</strong> premium {collectionMeta.title?.toLowerCase()}
              </span>
            </div>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[var(--bg-card)] border border-[var(--border-glow)] text-[var(--text-main)] text-[11px] px-3 py-1.5 focus:outline-none focus:border-gold-accent rounded-sm font-sans cursor-pointer"
              >
                <option value="featured">Featured Weaves</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products grid using premium SareeCard components */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full">
              {sortedProducts.map((product) => (
                <SareeCard key={product.id} saree={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[var(--bg-card)] border border-[var(--border-glow)] rounded-sm max-w-xl mx-auto w-full">
              <h3 className="font-serif text-2xl text-[var(--text-main)] font-medium mb-2">Showroom Empty</h3>
              <p className="text-xs text-[var(--text-muted)] font-light max-w-xs mx-auto leading-relaxed">
                We are currently replenishing our digital showroom shelves for this collection. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
