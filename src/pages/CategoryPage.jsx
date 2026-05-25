import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, RefreshCw, X, ChevronRight, BookOpen } from 'lucide-react';
import { collections, sareeDataMap } from '../data';
import { SareeCard, Masonry } from '../components';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();

  // Find collection details
  const collectionMeta = useMemo(() => {
    return collections.find((col) => col.slug === categorySlug);
  }, [categorySlug]);

  // Find products list for this category
  const rawProducts = useMemo(() => {
    return sareeDataMap[categorySlug] || [];
  }, [categorySlug]);

  // States for filter and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Helper: parse price string e.g. "₹45,500" -> 45500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  };

  // Extract unique colors and weaving techniques for filter selectors
  const filterOptions = useMemo(() => {
    const colors = new Set();
    const techniques = new Set();

    rawProducts.forEach((p) => {
      if (p.color) colors.add(p.color.split(' ')[0]); // Get main color keyword
      if (p.weavingTechnique) techniques.add(p.weavingTechnique);
    });

    return {
      colors: Array.from(colors),
      techniques: Array.from(techniques)
    };
  }, [rawProducts]);

  // Filter products based on active criteria
  const filteredProducts = useMemo(() => {
    return rawProducts.filter((product) => {
      // 1. Search Query filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Color filter
      const matchesColor = selectedColor
        ? product.color.toLowerCase().includes(selectedColor.toLowerCase())
        : true;

      // 3. Weaving technique filter
      const matchesTechnique = selectedTechnique
        ? product.weavingTechnique === selectedTechnique
        : true;

      // 4. Price range filter
      const priceVal = parsePrice(product.price);
      let matchesPrice = true;
      if (selectedPriceRange === 'under-10k') {
        matchesPrice = priceVal < 10000;
      } else if (selectedPriceRange === '10k-30k') {
        matchesPrice = priceVal >= 10000 && priceVal <= 30000;
      } else if (selectedPriceRange === '30k-50k') {
        matchesPrice = priceVal > 30000 && priceVal <= 50000;
      } else if (selectedPriceRange === 'over-50k') {
        matchesPrice = priceVal > 50000;
      }

      return matchesSearch && matchesColor && matchesTechnique && matchesPrice;
    });
  }, [rawProducts, searchQuery, selectedColor, selectedTechnique, selectedPriceRange]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedColor('');
    setSelectedPriceRange('');
    setSelectedTechnique('');
  };

  if (!collectionMeta) {
    return (
      <div className="container-main py-20 text-center">
        <h2 className="font-serif text-3xl mb-4 text-charcoal-800">Category Not Found</h2>
        <p className="text-xs text-muted mb-8">The requested saree collection catalog could not be loaded.</p>
        <Link to="/collections" className="btn-burgundy">
          Back to All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-20">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-cream-50 py-3.5 border-b border-gold-200/20">
        <div className="container-main flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted font-semibold">
          <Link to="/" className="hover:text-gold-accent transition-colors duration-300">Home</Link>
          <ChevronRight size={10} />
          <Link to="/collections" className="hover:text-gold-accent transition-colors duration-300">Collections</Link>
          <ChevronRight size={10} />
          <span className="text-charcoal-800 font-bold">{collectionMeta.title}</span>
        </div>
      </div>

      {/* 2. CATEGORY HERO BANNER */}
      <section className="relative h-[45vh] bg-charcoal-950 overflow-hidden grain-bg border-b border-gold-850/30">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/60 to-transparent z-10" />
        <img
          src={collectionMeta.image}
          alt={collectionMeta.title}
          className="w-full h-full object-cover object-center absolute inset-0 opacity-80"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12">
          <div className="container-main text-cream-50 flex flex-col gap-2 max-w-4xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-bold">
              Weaving Origin: {collectionMeta.origin}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-wide font-light">
              {collectionMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed max-w-2xl mt-2">
              {collectionMeta.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. MATERIAL HISTORICAL DESCRIPTION BOX */}
      <section className="bg-cream-50 border-b border-gold-200/20 py-10">
        <div className="container-main max-w-4xl flex gap-6 items-start">
          <div className="hidden sm:block p-3.5 bg-gold-light/20 text-gold-vintage border border-gold-300/40 rounded-sm">
            <BookOpen size={24} />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xs uppercase tracking-widest font-bold text-burgundy-800">
              Craftsmanship & History
            </h4>
            <p className="text-xs text-muted leading-relaxed font-light">
              {collectionMeta.weavingHistory}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT FILTERING & SHOWROOM GRID */}
      <section className="container-main pt-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* A. SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block w-64 bg-cream-50/50 backdrop-blur-md border border-gold-200/50 p-6 rounded-sm sticky top-24 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gold-100 pb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-burgundy-900 flex items-center gap-1.5">
                <SlidersHorizontal size={14} /> Filter Showroom
              </span>
              {(selectedColor || selectedPriceRange || selectedTechnique || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] text-burgundy-800 hover:text-gold-accent font-semibold flex items-center gap-1 transition-colors duration-300"
                >
                  <RefreshCw size={10} /> Clear
                </button>
              )}
            </div>

            {/* Color Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-700">
                Primary Hue
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white border border-gold-200 text-xs px-3 py-2 focus:outline-none focus:border-gold-accent rounded-sm font-sans"
              >
                <option value="">All Colors</option>
                {filterOptions.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-700">
                Price Estimate
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-white border border-gold-200 text-xs px-3 py-2 focus:outline-none focus:border-gold-accent rounded-sm font-sans"
              >
                <option value="">All Price Ranges</option>
                <option value="under-10k">Under ₹10,000</option>
                <option value="10k-30k">₹10,000 – ₹30,000</option>
                <option value="30k-50k">₹30,000 – ₹50,000</option>
                <option value="over-50k">Above ₹50,000</option>
              </select>
            </div>

            {/* Technique Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-700">
                Weaving Technique
              </label>
              <select
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="bg-white border border-gold-200 text-xs px-3 py-2 focus:outline-none focus:border-gold-accent rounded-sm font-sans"
              >
                <option value="">All Techniques</option>
                {filterOptions.techniques.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* B. MAIN DISPLAY SECTION */}
          <div className="flex-1 w-full">
            
            {/* Search and Mobile filter button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-cream-50/30 backdrop-blur-sm border border-gold-200/30 p-4 mb-8 rounded-sm">
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search inside this weave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-gold-200 pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-gold-accent rounded-sm font-sans w-full"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-vintage" />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Count badge */}
                <span className="text-[11px] text-muted tracking-wider">
                  Showing <strong>{filteredProducts.length}</strong> of {rawProducts.length} Sarees
                </span>
                
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center justify-center gap-1.5 border border-gold-accent px-4 py-2 text-[10px] tracking-wider uppercase font-bold text-gold-vintage bg-white hover:bg-cream-100 transition-all rounded-sm shrink-0"
                >
                  <SlidersHorizontal size={12} /> Filters
                </button>
              </div>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <Masonry
                items={filteredProducts.map((product, index) => ({
                  id: product.id,
                  img: product.image,
                  url: `/saree/${product.id}`,
                  height: [600, 480, 720, 520, 800, 560, 680, 500][index % 8]
                }))}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                blurToFocus={true}
                colorShiftOnHover={true}
              />
            ) : (
              <div className="text-center py-20 bg-cream-50 border border-gold-200/30 rounded-sm">
                <Search size={32} className="text-gold-vintage mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-charcoal-800 font-medium mb-1">No Matching Weaves</h3>
                <p className="text-xs text-muted font-light max-w-sm mx-auto leading-relaxed">
                  We couldn't find any sarees matching your active filters. Try clearing some selections or search queries.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-burgundy mt-6"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* C. MOBILE FILTERS DRAWER MODAL */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <div
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="relative w-80 max-w-full bg-cream-50 h-full p-6 flex flex-col justify-between shadow-2xl border-l border-gold-200 z-10 animate-fade-in"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gold-150 pb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-burgundy-900 flex items-center gap-1.5">
                  <SlidersHorizontal size={14} /> Refine Weaves
                </span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-charcoal-700 hover:text-gold-accent transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Color filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-750">
                  Primary Hue
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-white border border-gold-200 text-xs px-3 py-2.5 focus:outline-none rounded-sm font-sans"
                >
                  <option value="">All Colors</option>
                  {filterOptions.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-750">
                  Price Estimate
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-white border border-gold-200 text-xs px-3 py-2.5 focus:outline-none rounded-sm font-sans"
                >
                  <option value="">All Price Ranges</option>
                  <option value="under-10k">Under ₹10,000</option>
                  <option value="10k-30k">₹10,000 – ₹30,000</option>
                  <option value="30k-50k">₹30,000 – ₹50,000</option>
                  <option value="over-50k">Above ₹50,000</option>
                </select>
              </div>

              {/* Technique filter */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal-750">
                  Weaving Technique
                </label>
                <select
                  value={selectedTechnique}
                  onChange={(e) => setSelectedTechnique(e.target.value)}
                  className="bg-white border border-gold-200 text-xs px-3 py-2.5 focus:outline-none rounded-sm font-sans"
                >
                  <option value="">All Techniques</option>
                  {filterOptions.techniques.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 border-t border-gold-150 pt-4 mt-6">
              <button
                onClick={handleResetFilters}
                className="flex-1 border border-gold-accent py-3 text-[10px] tracking-wider uppercase font-bold text-gold-vintage hover:bg-cream-100 transition-all rounded-sm"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 bg-burgundy-800 text-white py-3 text-[10px] tracking-wider uppercase font-bold hover:bg-burgundy-950 transition-all rounded-sm"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
