import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, BookOpen, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { collections, sareeDataMap } from '../data';
import { SareeCard, Footer } from '../components';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const [sortBy, setSortBy] = useState('featured');

  // Find collection details
  const collectionMeta = useMemo(() => {
    return collections.find((col) => col.slug === categorySlug);
  }, [categorySlug]);

  // Find products list for this category
  const rawProducts = useMemo(() => {
    return sareeDataMap[categorySlug] || [];
  }, [categorySlug]);

  // Helper: parse price string e.g. "₹45,500" -> 45500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...rawProducts];
    if (sortBy === 'price-low') {
      return products.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === 'price-high') {
      return products.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return products; // 'featured'
  }, [rawProducts, sortBy]);

  if (!collectionMeta) {
    return (
      <div className="container-main py-24 text-center">
        <h2 className="font-serif text-3xl mb-4 text-[var(--text-main)]">Category Not Found</h2>
        <p className="text-xs text-[var(--text-muted)] mb-8">The requested saree collection catalog could not be loaded.</p>
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

      {/* 2. CATEGORY HERO BANNER */}
      <section className="relative h-[48vh] bg-[var(--bg-secondary)] overflow-hidden border-b border-[var(--border-glow)]">
        {/* Glow point overlays */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-burgundy-900/10 blur-[100px] pointer-events-none animate-pulse" />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/60 to-transparent z-10" />
        <img
          src={collectionMeta.image}
          alt={collectionMeta.title}
          className="w-full h-full object-cover object-center absolute inset-0 opacity-40 scale-102 hover:scale-105 transition-transform duration-[2s]"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12">
          <div className="container-main text-[var(--text-main)] flex flex-col gap-3 max-w-5xl">
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold-accent font-extrabold px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)] w-fit">
              Weaving Origin: {collectionMeta.origin}
            </span>
            
            <h1 className="font-sans text-5xl sm:text-7xl font-black uppercase tracking-tight text-[var(--text-main)] leading-none mt-2">
              THE 
              <span className="text-transparent font-serif italic font-light lowercase text-gold-accent block sm:inline normal-case ml-0 sm:ml-4">
                {collectionMeta.title}.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed max-w-2xl mt-3">
              {collectionMeta.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. MATERIAL HISTORICAL DESCRIPTION & SHOPPING ASSURANCES BOX */}
      <section className="bg-[var(--bg-card)] border-b border-[var(--border-glow)] py-12 relative overflow-hidden">
        <div className="container-main max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
          
          {/* History info left */}
          <div className="flex gap-6 items-start max-w-3xl">
            <div className="hidden sm:block p-3.5 bg-[var(--bg-card-inner)] text-gold-accent border border-[var(--border-glow)] rounded-sm">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-gold-accent">
                Heritage & History
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                {collectionMeta.weavingHistory}
              </p>
            </div>
          </div>

          {/* Trust assurances right */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-[var(--border-glow)] pt-6 lg:pt-0 lg:pl-8 text-xs">
            <div className="flex items-center gap-3">
              <Truck className="text-gold-accent shrink-0" size={16} />
              <div className="flex flex-col">
                <span className="font-bold text-[10px] uppercase tracking-wider">Free Global Delivery</span>
                <span className="text-[9px] text-[var(--text-muted)]">Insured transit packaging</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-gold-accent shrink-0" size={16} />
              <div className="flex flex-col">
                <span className="font-bold text-[10px] uppercase tracking-wider">Pure Silk Guaranteed</span>
                <span className="text-[9px] text-[var(--text-muted)]">Official Silk Mark Certified</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="text-gold-accent shrink-0" size={16} />
              <div className="flex flex-col">
                <span className="font-bold text-[10px] uppercase tracking-wider">Custom Blouses</span>
                <span className="text-[9px] text-[var(--text-muted)]">Fitted before dispatch</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PRODUCT SHOWROOM GRID */}
      <section className="container-main pt-16">
        <div className="flex flex-col gap-8 w-full">
          
          {/* Sorting / Catalog details bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-glow)] pb-4 mb-2">
            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                Heritage Showroom
              </span>
              <span className="text-[11px] text-[var(--text-muted)] tracking-wider">
                Showing <strong>{sortedProducts.length}</strong> mastercraft sarees
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
