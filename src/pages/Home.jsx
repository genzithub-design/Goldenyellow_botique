import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, Globe, Sparkles, ChevronLeft, ChevronRight, Play, Eye, Calendar } from 'lucide-react';
import { SareeCard, Masonry, ImageTrail, Stack, ScrollStack, ScrollStackItem, Footer } from '../components';
import { optimizeUnsplashUrl } from '../utils/image';
import { collections, products } from '../data';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"
];


// Interactive artisan steps
const ARTISAN_STEPS = [
  {
    id: 'step-1',
    title: 'Pure Silk Dyeing',
    subtitle: 'Cauldron Coloring',
    desc: 'Raw mulberry silk filaments are twisted and washed, then submerged in hand-heated brass cauldrons with organic color dyes to lock in rich, vibrant shades that last for decades.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-2',
    title: 'Gold Zari Spinning',
    subtitle: 'The Golden Core',
    desc: 'Pure red silk threads are wrapped in silver wire, then electroplated with liquid 24-karat gold to create our signature heavy borders that do not tarnish over time.',
    image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-3',
    title: 'Jacquard Punching',
    subtitle: 'Architectural Graphs',
    desc: 'Elaborate temple borders, paisley curves, and peacock designs are hand-punched onto rectangular cards, creating the physical mechanical code used to guide the needles.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-4',
    title: 'Korvai Loom Weaving',
    subtitle: 'The Interlocked Edge',
    desc: 'Two master weavers coordinate in sync on hand-powered pit looms. They interlock the contrast borders with the body silk using the historic, secure Korvai joinery.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Home() {
  const trendingSarees = useMemo(() => products.slice(0, 6), []);
  const homeCollections = collections;
  const [activeArtisanStep, setActiveArtisanStep] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Track mobile breakpoint for scroll distance
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <div className="bg-transparent flex flex-col min-h-screen relative font-sans grain-bg overflow-x-hidden" ref={scrollRef}>
      


      {/* ── SCROLL PROGRESS GOLD LINE ── */}
      <motion.div
        className="fixed top-0 left-0 h-[4px] bg-gold-gradient z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      {/* ── 1. ELEGANT RESPONSIVE HERO (Peach-Pink Theme from Mockup) ── */}
      <section className="relative pt-32 pb-16 lg:py-24 bg-transparent overflow-hidden flex items-center min-h-[80vh]">
        <div className="container-main relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text details */}
            <div className="lg:col-span-6 flex flex-col justify-center items-start gap-6 text-left">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-main)] leading-tight max-w-2xl">
                Effortless Elegance for Your Everyday Look
              </h1>
              
              <p className="font-sans text-sm sm:text-base text-[var(--text-sub)] font-normal leading-relaxed max-w-xl">
                Discover the effortless charm of simple sarees made with soft, breathable fabrics that keep you comfortable throughout the day, while adding a graceful touch to your everyday look.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Link 
                  to="/collections" 
                  className="rounded-full bg-[#4a0612] hover:bg-[#5c0b1a] text-white font-sans text-sm font-semibold px-8 py-3.5 transition-all duration-300 shadow-md hover:shadow-lg text-center min-w-[140px]"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/collections" 
                  className="rounded-full bg-[#ffb5bc] hover:bg-[#ffa1a9] text-[#4a0612] font-sans text-sm font-semibold px-8 py-3.5 transition-all duration-300 text-center min-w-[140px]"
                >
                  Explore
                </Link>
              </div>
            </div>

            {/* Right side model image stack */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-8">
              <div className="w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] lg:w-[500px] lg:h-[640px] xl:w-[560px] xl:h-[700px] relative">
                <Stack
                  randomRotation
                  sensitivity={100}
                  sendToBackOnClick={true}
                  cards={HERO_IMAGES.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`card-${i + 1}`} 
                      className="card-image animate-fade-in"
                    />
                  ))}
                  autoplay
                  autoplayDelay={4000}
                  pauseOnHover={true}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. EDITORIAL BRAND HERITAGE SECTION ── */}
      <section className="section-padding bg-transparent relative overflow-hidden border-b border-gold-200/10">
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            
            {/* Left side: Overlapping Editorial Images with smooth scrolling parallax entrance */}
            <div className="lg:col-span-6 relative h-[520px] flex items-center justify-center">
              
              {/* Back Image (Weaver context) */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 bottom-6 w-72 h-[380px] bg-cream-200 border border-gold-300/30 rounded-sm overflow-hidden shadow-2xl hidden sm:block hover:scale-[1.02] transition-transform duration-500"
              >
                <div className="absolute inset-0 bg-burgundy-950/15 pointer-events-none" />
                <img
                  src={optimizeUnsplashUrl("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b", 500)}
                  alt="Traditional Weaver hand"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Front Frame Image (Model wearing Saree) */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-80 sm:w-96 h-[460px] bg-cream-50/50 backdrop-blur-sm border border-gold-accent/40 p-2.5 rounded-sm shadow-2xl z-10 hover:border-gold-accent hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] transition-all duration-500"
              >
                <div className="w-full h-full overflow-hidden bg-cream-200 relative">
                  <div className="absolute inset-0 border border-gold-vintage/25 pointer-events-none z-10" />
                  <img
                    src={optimizeUnsplashUrl("https://images.unsplash.com/photo-1608748010899-18f300247112", 500)}
                    alt="Authentic silk drape styling"
                    className="w-full h-full object-cover object-top hover:scale-108 transition-transform duration-1000 ease-out"
                  />
                </div>
              </motion.div>

              {/* Floating gold badge design */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-gold-accent/25 bg-[#FCFAF6]/60 backdrop-blur-sm flex items-center justify-center text-gold-vintage text-[10px] tracking-widest uppercase font-bold shadow-lg animate-float hidden md:flex"
              >
                <div className="text-center font-serif leading-relaxed">
                  Pure <br />Handloom <br />Crafts
                </div>
              </motion.div>
            </div>

            {/* Right side: Elegant details text with staggered entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col gap-6 lg:pl-10"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="text-gold-accent animate-pulse" size={16} />
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
                  Legacy & Craftsmanship
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-wide font-light leading-tight">
                Authentic Weaves <br />Created for Longevity
              </h2>

              <div className="w-16 h-[2px] bg-gold-vintage rounded-full"></div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                <p>
                  At Golden Yellow Boutique, each saree is a work of slow fashion art. We partner directly with artisan weavers in traditional Indian hubs (from Kanchipuram pit looms to Varanasi brocade suites) to safeguard historic loom guilds.
                </p>
                <p>
                  We prioritize direct weavers welfare, completely bypassing middlemen. This fair-trade approach ensures that every gold thread loop and silk knot provides sustainable livelihood support to weavers' families.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-gold-200/20">
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-white font-semibold hover:text-gold-accent transition-colors">100%</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 font-bold mt-1">Silk Mark Certified</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-white font-semibold hover:text-gold-accent transition-colors">450+</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 font-bold mt-1">Master Weavers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-white font-semibold hover:text-gold-accent transition-colors">30 Days</span>
                  <span className="text-[9px] uppercase tracking-wider text-white/70 font-bold mt-1">Average Weave Period</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE SCROLL STACK COLLECTIONS ── */}
      <section className="pt-20 lg:pt-32 pb-0 bg-transparent relative overflow-hidden">
        <div className="container-main">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
                Bespoke Catalogs
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light">
                Shop by Weave Craft
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-widest font-bold text-burgundy-850 hover:text-gold-accent transition-colors duration-300 flex items-center gap-1.5 shrink-0"
            >
              Explore All Categories <ArrowRight size={14} />
            </Link>
          </div>

          <ScrollStack 
            useWindowScroll={true} 
            itemDistance={150}
            itemScale={0.02}
            itemStackDistance={35}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.92}
            blurAmount={1}
            rotationAmount={0}
          >
            {homeCollections.map((col, idx) => (
              <ScrollStackItem key={col.slug}>
                {/* Image side */}
                <div className="w-full md:w-1/2 h-[220px] md:h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-burgundy-950/20 z-10 pointer-events-none" />
                  <img 
                    src={optimizeUnsplashUrl(col.image, 600)} 
                    alt={col.title} 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-charcoal-950/80 backdrop-blur-sm border border-gold-accent/30 px-3 py-1 rounded-sm text-[8px] uppercase tracking-widest text-gold-accent font-bold">
                    0{idx + 1} / Collection
                  </div>
                </div>

                {/* Text Details side */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center items-start gap-4 bg-gradient-to-br from-[#1B0509] to-[#25030A] text-cream-50 h-auto md:h-full">
                  <span className="text-[10px] uppercase tracking-widest text-gold-accent font-bold">
                    {col.origin}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 tracking-wide font-medium leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs text-cream-300 font-light leading-relaxed max-w-md">
                    {col.description}
                  </p>
                  <div className="w-12 h-[1px] bg-gold-accent/30 my-1"></div>
                  <Link 
                    to={`/collections/${col.slug}`} 
                    className="btn-gold py-2.5 px-6 text-[9px] tracking-widest uppercase font-bold mt-2 shadow-md hover:shadow-lg flex items-center gap-1.5"
                  >
                    View Collection <ArrowRight size={12} />
                  </Link>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>

        </div>
      </section>


      {/* ── BENTO GRID HERITAGE SHOWCASE ── */}
      <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden border-y border-[var(--border-glow-intense)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(91,14,29,0.18)_0%,transparent_60%)] pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_75%_30%,rgba(197,160,89,0.06)_0%,transparent_55%)] pointer-events-none z-0" />

        <div className="container-main relative z-10">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold block mb-2">
                Heritage Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-main)] tracking-wide font-light">
                Woven in Gold &amp; Silk
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-widest font-bold text-gold-accent hover:text-[var(--text-main)] transition-colors duration-300 flex items-center gap-1.5 shrink-0"
            >
              View All Collections <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Bento Grid — 4 cols desktop, 2 cols mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[190px] md:auto-rows-[220px]">

            {/* A — Tall card (row-span-2 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.05 }}
              className="col-span-1 md:row-span-2 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop" alt="Kanchipuram Silk"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">01</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Kanchipuram</span>
                <p className="font-serif text-white text-base mt-0.5 leading-tight">Pure Silk Heritage</p>
              </div>
            </motion.div>

            {/* B — Wide top-center (col-span-2 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className="col-span-1 md:col-span-2 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop" alt="Banarasi Silk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">02</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Banarasi</span>
                <p className="font-serif text-white text-base mt-0.5 leading-tight">Zari Brocade Majesty</p>
              </div>
            </motion.div>

            {/* C — Top-right small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="col-span-1 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=600&auto=format&fit=crop" alt="Cotton Weave"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">03</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Cotton</span>
                <p className="font-serif text-white text-sm mt-0.5">Artisan Weave</p>
              </div>
            </motion.div>

            {/* D — Text CTA card (col-span-2 on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 md:col-span-2 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-card-inner)] border border-[var(--border-glow-intense)] flex flex-col justify-center items-center p-6 text-center relative overflow-hidden group cursor-pointer hover:border-gold-accent/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.09)_0%,transparent_70%)] pointer-events-none group-hover:opacity-[1.5] transition-opacity duration-700" />
              {/* corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-accent/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-accent/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-accent/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-accent/40" />
              <Sparkles size={18} className="text-gold-accent mb-3 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.32em] text-gold-accent font-bold mb-2">
                Heritage Canvas
              </span>
              <p className="font-serif text-[var(--text-main)] text-base sm:text-lg leading-snug mb-5">
                Every thread tells a story<br />of artisan legacy
              </p>
              <Link to="/collections" className="btn-gold py-2 px-5 text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5">
                Explore All <ArrowRight size={11} />
              </Link>
            </motion.div>

            {/* E — Mid-right small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.25 }}
              className="col-span-1 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop" alt="Organza Saree"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">04</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Organza</span>
                <p className="font-serif text-white text-sm mt-0.5">Sheer Elegance</p>
              </div>
            </motion.div>

            {/* F — Bottom-left small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.3 }}
              className="col-span-1 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" alt="Traditional Weave"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">05</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Traditional</span>
                <p className="font-serif text-white text-sm mt-0.5">Classic Drape</p>
              </div>
            </motion.div>

            {/* G — Bottom-center wide (col-span-2 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.35 }}
              className="col-span-1 md:col-span-2 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=600&auto=format&fit=crop" alt="Bridal Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">06</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Bridal</span>
                <p className="font-serif text-white text-base mt-0.5 leading-tight">Royal Bridal Ensemble</p>
              </div>
            </motion.div>

            {/* H — Bottom-right small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4 }}
              className="col-span-1 relative group overflow-hidden cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" alt="Designer Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-gold-accent/40 px-2.5 py-1">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">07</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[8px] uppercase tracking-widest text-gold-accent font-bold">Designer</span>
                <p className="font-serif text-white text-sm mt-0.5">Contemporary Art</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── 4. ARTISAN PROCESS — GEN-Z REDESIGN ── */}
      <section className="relative bg-[var(--bg-primary)] overflow-hidden border-y border-[var(--border-glow)]">

        {/* Ghost number watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeArtisanStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-[clamp(140px,22vw,280px)] font-black text-[var(--text-main)] opacity-[0.03] leading-none tracking-tighter select-none"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              0{activeArtisanStep + 1}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-burgundy-800/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-main relative z-10 py-20 lg:py-28">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-bold block mb-3">
              Weaving Chronicles
            </span>
            <h2 className="font-black text-4xl sm:text-6xl lg:text-7xl text-[var(--text-main)] tracking-tight leading-none uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              The Art<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(197,160,89,0.6)' }}>of Making.</span>
            </h2>
          </motion.div>

          {/* Horizontal pill tab nav */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
            {ARTISAN_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveArtisanStep(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                  activeArtisanStep === idx
                    ? 'bg-gold-accent border-gold-accent text-[#08060A]'
                    : 'bg-[var(--bg-card)] border-[var(--border-glow)] text-[var(--text-muted)] hover:border-gold-accent/40 hover:text-[var(--text-main)]'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-black ${activeArtisanStep === idx ? 'bg-[#08060A] text-gold-accent' : 'bg-[var(--border-glow-intense)] text-[var(--text-muted)]'}`}>
                  {idx + 1}
                </span>
                {step.subtitle}
              </button>
            ))}
          </div>

          {/* Main content: Full-bleed image + overlay card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArtisanStep}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[420px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden"
            >
              {/* Full image */}
              <img
                src={optimizeUnsplashUrl(ARTISAN_STEPS[activeArtisanStep].image, 800)}
                alt={ARTISAN_STEPS[activeArtisanStep].title}
                className="w-full h-full object-cover object-center scale-105"
              />

              {/* Dynamic gradient overlay matching theme background color */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/60 via-transparent to-transparent" />

              {/* Stage pill badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--border-glow-intense)] rounded-full px-4 py-2">
                <span className="w-5 h-5 rounded-full bg-gold-accent flex items-center justify-center text-[9px] font-black text-[#08060A]">{activeArtisanStep + 1}</span>
                <span className="text-[9px] uppercase tracking-widest text-[var(--text-main)] font-bold">{ARTISAN_STEPS[activeArtisanStep].subtitle}</span>
              </div>

              {/* Bottom text overlay card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-lg">
                  <h3 className="font-black text-2xl sm:text-4xl text-[var(--text-main)] leading-tight tracking-tight uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {ARTISAN_STEPS[activeArtisanStep].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-sub)] font-light leading-relaxed">
                    {ARTISAN_STEPS[activeArtisanStep].desc}
                  </p>
                </div>

                {/* Step counter */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">Step</span>
                  <span className="font-black text-5xl sm:text-6xl text-[var(--text-main)] opacity-20 leading-none" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    0{activeArtisanStep + 1}
                  </span>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest">/ 0{ARTISAN_STEPS.length}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-4 flex gap-1.5">
            {ARTISAN_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveArtisanStep(idx)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  activeArtisanStep === idx ? 'bg-gold-accent flex-[3]' : 'bg-[var(--border-glow-intense)] flex-1 hover:bg-gold-accent/40'
                }`}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ── 5. TRENDING SAREES — MODERN EDITORIAL GRID ── */}
      <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,89,0.07)_0%,transparent_55%)] pointer-events-none" />

        <div className="container-main relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-bold block mb-2">
                Most Desired
              </span>
              <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--text-main)] tracking-tight leading-none uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Trending<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(197,160,89,0.5)' }}>Now.</span>
              </h2>
            </div>
            <Link
              to="/collections"
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gold-accent hover:text-[var(--text-main)] transition-colors duration-300 border border-gold-accent/30 hover:border-gold-accent px-5 py-2.5 rounded-full shrink-0"
            >
              Browse All <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Editorial Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[220px] md:auto-rows-[240px]"
          >
            {trendingSarees.slice(0, 6).map((saree, idx) => {
              // Layout: card 0 = tall (row-span-2), card 3 = wide (col-span-2)
              const isTall = idx === 0;
              const isWide = idx === 3;
              return (
                <motion.div
                  key={saree.id}
                  variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative group overflow-hidden cursor-pointer ${isTall ? 'row-span-2' : ''} ${isWide ? 'col-span-2' : 'col-span-1'}`}
                >
                  <Link to={`/saree/${saree.id}`} className="block w-full h-full">
                    {/* Image */}
                    <img
                      src={optimizeUnsplashUrl(saree.image, 500)}
                      alt={saree.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Base dynamic vignette matching section background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/85 via-[var(--bg-secondary)]/20 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[var(--bg-secondary)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Top-left badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--border-glow-intense)] rounded-full px-3 py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                      <span className="text-[8px] uppercase tracking-widest text-[var(--text-main)] font-bold">{saree.material}</span>
                    </div>

                    {/* Price tag — top right */}
                    <div className="absolute top-3 right-3 bg-gold-accent text-[#0D0B0F] text-[9px] font-black px-2.5 py-1 rounded-sm tracking-wider">
                      {saree.price}
                    </div>

                    {/* Bottom content — slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                      <h3 className={`font-black text-[var(--text-main)] tracking-tight leading-tight uppercase ${isTall || isWide ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {saree.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        <span className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">{saree.color}</span>
                        <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-[var(--text-main)] font-bold">
                          View <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>

                    {/* Gold shimmer top border */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-accent via-gold-300 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-600" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-glow-intense)] pt-6"
          >
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">
              Showing {Math.min(6, trendingSarees.length)} of {trendingSarees.length}+ masterpieces
            </p>
            <Link
              to="/collections"
              className="btn-gold py-2.5 px-6 text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5"
            >
              Explore Full Catalog <ArrowRight size={11} />
            </Link>
          </motion.div>

        </div>
      </section>


      {/* ── 6. VIDEO CONSULTATION / APPOINTMENT CTA ── */}
      <section className="py-24 relative bg-[var(--bg-primary)] overflow-hidden border-y border-[var(--border-glow-intense)]">
        <div className="absolute inset-0 bg-[var(--burgundy)]/5 z-10 pointer-events-none" />
        <div className="container-main relative z-20 flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-[var(--text-main)] flex flex-col gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold flex items-center gap-1.5">
              <Play size={12} className="text-gold-accent fill-gold-accent" /> Virtual Showroom Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-wide font-light leading-snug">
              Examine the Craftsmanship, live from Kanchipuram
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-sub)] font-light leading-relaxed">
              Can't visit our physical showrooms? Book a high-definition video shopping slot. Our heritage curators will host a live consultation, unfolding sarees, detailing zari layers, and showing colors in natural daylight.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-glow-intense)] p-8 sm:p-10 rounded-sm w-full lg:max-w-md flex flex-col gap-6 text-[var(--text-main)] shadow-2xl hover:border-gold-accent/50 transition-colors"
          >
            <div className="flex gap-4 items-start border-b border-[var(--border-glow)] pb-4">
              <Calendar className="text-gold-accent shrink-0 mt-0.5 animate-pulse" size={24} />
              <div>
                <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Schedule Video Visit</h4>
                <p className="text-[10px] text-[var(--text-muted)]">Free 30-minute private showroom slot</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-[var(--text-sub)]">Examine fabrics under high-magnification cams</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-[var(--text-sub)]">Get styling advice from professional bridal drapers</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-[var(--text-sub)]">Personalized shipping packaging checks</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="btn-gold py-3.5 w-full flex items-center justify-center gap-2 shadow-lg"
            >
              Book Showroom Slot
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── 7. WHY CHOOSE US (Staggered Cards) ── */}
      <section className="section-padding bg-transparent">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)]/75 backdrop-blur-sm border border-[var(--border-glow)] rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-[var(--bg-card-inner)] shadow-inner">
                <Award size={28} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">
                100% Pure Certified Silk
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                All our silk sarees bear the certified Silk Mark tag, guaranteeing authentic Mulberry silk yarns and gold-plated silver zari of the highest purity grades.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)]/75 backdrop-blur-sm border border-[var(--border-glow)] rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-[var(--bg-card-inner)] shadow-inner">
                <Sparkles size={26} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">
                Traditional Craftsmanship
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                We work directly with master weavers, keeping ancient weaving guilds alive and ensuring fair wages are paid directly to handloom artists.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)]/75 backdrop-blur-sm border border-[var(--border-glow)] rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-[var(--bg-card-inner)] shadow-inner">
                <Globe size={26} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-main)] mb-3">
                Worldwide Boutique Delivery
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                We ship our luxury sarees internationally. Our team offers online video boutique tours and consultation to customize blouse styles before dispatch.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 8. LUXURY CLIENT REVIEW (TESTIMONIALS) ── */}
      <section className="section-padding bg-[var(--bg-card)]/60 backdrop-blur-sm border-t border-[var(--border-glow)]">
        <div className="container-main text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-3 block">
            Customer Praise
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-main)] tracking-wide font-light mb-16">
            Words of Appreciation
          </h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto relative px-8 py-4"
          >
            {/* Elegant Quotation Marks Visual Accent */}
            <span className="absolute top-[-20px] left-0 font-serif text-[120px] text-gold-accent/15 leading-none pointer-events-none select-none">“</span>
            
            <blockquote className="font-serif text-xl sm:text-3xl italic text-[var(--text-main)] leading-relaxed font-light mb-8">
              "The Muhurtham Kanchipuram saree I ordered from Golden Yellow Boutique was beyond words. The weight of the silk, the shimmer of the pure gold zari, and the detail in the wedding cart design on the pallu left everyone spellbound. It is a family treasure now."
            </blockquote>
            
            <cite className="font-sans text-xs uppercase tracking-widest font-bold text-gold block">
              — Arundhati S., Bangalore
            </cite>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
