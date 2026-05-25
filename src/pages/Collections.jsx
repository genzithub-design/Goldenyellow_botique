import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Search, Sparkles } from 'lucide-react';
import { collections, allSareesList } from '../data';
import { SareeCard, Masonry } from '../components';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Filter sarees if in search mode
  const filteredSarees = searchQuery
    ? allSareesList.filter(
        (saree) =>
          saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="bg-transparent min-h-screen pb-20">
      
      {/* Search Header OR General Header */}
      <section className="bg-charcoal-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden grain-bg border-b border-gold-800/40">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/40 to-charcoal-900/10 z-10" />
        <div className="container-main relative z-20 text-center flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold">
            {searchQuery ? 'Search Showroom' : 'Heritage Catalogs'}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide font-light">
            {searchQuery ? `Results for "${searchQuery}"` : 'Saree Collections'}
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 font-light max-w-xl leading-relaxed mt-2">
            {searchQuery
              ? `Found ${filteredSarees.length} exquisite drapes matching your query.`
              : 'Browse our handloom catalogs divided by weave style, silk weight, and embroidery craft.'}
          </p>
          <div className="w-16 h-[1px] bg-gold-accent mt-4"></div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-main pt-16">
        {searchQuery ? (
          /* ── SEARCH RESULTS MODE ── */
          <div>
            {filteredSarees.length > 0 ? (
              <Masonry
                items={filteredSarees.map((saree, index) => ({
                  id: saree.id,
                  img: saree.image,
                  url: `/saree/${saree.id}`,
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
              <div className="text-center py-20 bg-cream-50 border border-gold-200/30 p-8 max-w-xl mx-auto rounded-sm">
                <Search size={32} className="text-gold-vintage mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-charcoal-800 font-medium mb-2">No Sarees Found</h3>
                <p className="text-xs text-muted font-light leading-relaxed mb-6">
                  We couldn't find any sarees matching "{searchQuery}". Try searching for categories like "Silk", "Cotton", or colors like "Red" or "Green".
                </p>
                <Link to="/collections" className="btn-burgundy">
                  Browse All Collections
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* ── GENERAL COLLECTIONS LIST MODE ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {collections.map((col, index) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="luxury-card flex flex-col sm:flex-row group h-auto sm:h-64 relative bg-cream-50/50 border border-gold-200/30 hover:border-gold-accent/60 shadow-lg hover:shadow-2xl duration-500"
              >
                {/* Gold Top line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-gradient transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-30"></div>

                {/* Image side */}
                <div className="w-full sm:w-1/2 h-48 sm:h-full overflow-hidden bg-cream-200 relative shrink-0">
                  {/* Inner Decorative Golden Border Frame inside the image */}
                  <div className="absolute inset-3 border border-gold-accent/0 group-hover:inset-4 group-hover:border-gold-accent/50 transition-all duration-500 pointer-events-none z-20"></div>
                  
                  {/* Hover visual overlay */}
                  <div className="absolute inset-0 bg-burgundy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                  />
                </div>

                {/* Info side */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between group-hover:bg-cream-200/10 transition-colors duration-500">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-gold-vintage font-bold">
                        {col.origin}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-burgundy-850 font-bold bg-gold-light/35 px-2.5 py-1 rounded-sm border border-gold-300/10">
                        <Layers size={10} className="text-gold-accent" /> {col.count} Items
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-charcoal-800 group-hover:text-burgundy-900 transition-colors duration-300 font-medium relative w-max pb-1">
                      {col.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-vintage group-hover:w-full transition-all duration-500 ease-out"></span>
                    </h3>
                    <p className="text-xs text-muted font-light line-clamp-3 mt-3 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  <Link
                    to={`/collections/${col.slug}`}
                    className="btn-outline-gold px-4 py-2 mt-4 text-[9px] tracking-wider text-center w-full sm:w-max flex items-center justify-center gap-2 group-hover:bg-gold-accent group-hover:text-burgundy-900 transition-all duration-500"
                  >
                    Explore Weaves <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
