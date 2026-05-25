import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, Globe, Sparkles, ChevronLeft, ChevronRight, Play, Eye, Calendar } from 'lucide-react';
import { collections, sareeDataMap, allSareesList } from '../data';
import { SareeCard, Masonry, ImageTrail, Stack, SparkleBackground, ScrollStack, ScrollStackItem } from '../components';

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
  const [trendingSarees, setTrendingSarees] = useState([]);
  const [activeArtisanStep, setActiveArtisanStep] = useState(0);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Load trending sarees
  useEffect(() => {
    const kanchiList = sareeDataMap['kanchipuram-silk'] || [];
    const banarasiList = sareeDataMap['banarasi-silk'] || [];
    const organzaList = sareeDataMap['organza-sarees'] || [];
    const bridalList = sareeDataMap['bridal-sarees'] || [];
    
    setTrendingSarees([
      kanchiList[0], // Swarnanjali Crimson
      banarasiList[0], // Shahi Katan Maroon
      organzaList[4], // Indu Golden Tissue
      bridalList[0], // Vara Mahalakshmi Red
      kanchiList[4], // Neelambari Royal Blue
      banarasiList[4] // Gulmarg Peach Tanchoi
    ].filter(Boolean));
  }, []);


  return (
    <div className="bg-transparent flex flex-col min-h-screen relative font-sans grain-bg overflow-x-hidden" ref={scrollRef}>
      
      {/* ── BACKGROUND AMBIENT GLOWS & SPARKLES ── */}
      <SparkleBackground />

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
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-tight max-w-2xl">
                Effortless Elegance for Your Everyday Look
              </h1>
              
              <p className="font-sans text-sm sm:text-base text-[#4a4a4a] font-normal leading-relaxed max-w-xl">
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
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
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
                    src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
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

              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light leading-tight">
                Authentic Weaves <br />Created for Longevity
              </h2>

              <div className="w-16 h-[2px] bg-gold-vintage rounded-full"></div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-muted font-light leading-relaxed">
                <p>
                  At Golden Yellow Boutique, each saree is a work of slow fashion art. We partner directly with artisan weavers in traditional Indian hubs (from Kanchipuram pit looms to Varanasi brocade suites) to safeguard historic loom guilds.
                </p>
                <p>
                  We prioritize direct weavers welfare, completely bypassing middlemen. This fair-trade approach ensures that every gold thread loop and silk knot provides sustainable livelihood support to weavers' families.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-gold-200/20">
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-burgundy-800 font-semibold hover:text-gold-accent transition-colors">100%</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold mt-1">Silk Mark Certified</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-burgundy-800 font-semibold hover:text-gold-accent transition-colors">450+</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold mt-1">Master Weavers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl text-burgundy-800 font-semibold hover:text-gold-accent transition-colors">30 Days</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold mt-1">Average Weave Period</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE SCROLL STACK COLLECTIONS ── */}
      <section className="section-padding bg-transparent relative overflow-hidden">
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
            itemDistance={280} 
            itemScale={0.02}
            itemStackDistance={35}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.92}
            blurAmount={1}
            rotationAmount={0}
          >
            {[
              collections[0], // Kanchipuram
              collections[1], // Banarasi
              collections[2], // Cotton
              collections[4], // Organza
              collections[7]  // Bridal
            ].filter(Boolean).map((col, idx) => (
              <ScrollStackItem key={col.slug}>
                {/* Image side */}
                <div className="w-full md:w-1/2 h-[220px] md:h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-burgundy-950/20 z-10 pointer-events-none" />
                  <img 
                    src={col.image} 
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

      {/* ── INTERACTIVE WEAVER CANVAS (IMAGE TRAIL) ── */}
      <section className="relative h-[65vh] bg-[#0E0B0A] overflow-hidden flex flex-col justify-center items-center text-center px-6 border-y border-gold-800/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,14,29,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
        
        {/* Dynamic Image Trail background layer */}
        <ImageTrail
          items={[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
          ]}
          variant={7}
        />

        {/* Foreground Content with viewport entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-2xl pointer-events-none flex flex-col items-center gap-4"
        >
          <Sparkles size={24} className="text-gold-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold">
            Interactive Canvas
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-50 tracking-wide font-light leading-snug">
            Weave Your Trail of Elegance
          </h2>
          <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed max-w-md">
            Move your cursor or drag your finger across the canvas to unveil a shifting, dynamic tapestry of our heritage handloom creations.
          </p>
          <div className="w-12 h-[1px] bg-gold-accent mt-2"></div>
        </motion.div>
      </section>

      {/* ── 4. ARTISAN PROCESS SECTION (INTERACTIVE STAGES) ── */}
      <section className="section-padding bg-transparent border-b border-gold-200/10 relative">
        <div className="container-main">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto text-center mb-16 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
              Weaving Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light">
              Crafting A Masterpiece
            </h2>
            <div className="w-12 h-[1.5px] bg-gold-vintage mt-2"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Weaving Stage Details Selector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {ARTISAN_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveArtisanStep(idx)}
                  className={`text-left p-6 border transition-all duration-500 rounded-sm flex flex-col gap-2 shadow-sm ${
                    activeArtisanStep === idx
                      ? 'bg-burgundy-800 border-gold-accent text-cream-50 shadow-xl translate-x-3'
                      : 'bg-white border-gold-200/25 text-charcoal-850 hover:bg-cream-100/50 hover:border-gold-300 hover:translate-x-1'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${activeArtisanStep === idx ? 'text-gold-accent' : 'text-gold-vintage'}`}>
                    Stage 0{idx + 1} — {step.subtitle}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium">{step.title}</h3>
                </button>
              ))}
            </div>

            {/* Right: Dynamic description with image crossfade & shadow */}
            <motion.div 
              layout
              className="lg:col-span-7 bg-white/80 backdrop-blur-sm border border-gold-200/35 p-8 sm:p-12 rounded-sm shadow-2xl flex flex-col sm:flex-row gap-8 items-center h-auto sm:h-[400px]"
            >
              {/* Dynamic Image */}
              <div className="w-full sm:w-1/2 aspect-square sm:h-full overflow-hidden bg-cream-100 border border-gold-200/30 rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeArtisanStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    src={ARTISAN_STEPS[activeArtisanStep].image}
                    alt={ARTISAN_STEPS[activeArtisanStep].title}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
              </div>

              {/* Dynamic details description */}
              <div className="flex-1 flex flex-col gap-3 justify-center">
                <span className="text-[10px] uppercase tracking-widest text-gold-vintage font-bold">
                  Details
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-charcoal-850 font-medium leading-snug">
                  {ARTISAN_STEPS[activeArtisanStep].title}
                </h4>
                <p className="text-xs text-muted leading-relaxed font-light">
                  {ARTISAN_STEPS[activeArtisanStep].desc}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 5. TRENDING SAREES GRID ── */}
      <section className="section-padding bg-transparent">
        <div className="container-main">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
                Most Desired
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light">
                Trending Masterpieces
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-widest font-bold text-burgundy-850 hover:text-gold-accent transition-colors duration-300 flex items-center gap-1.5 shrink-0"
            >
              Browse Full Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trendingSarees.map((saree) => (
              <motion.div 
                key={saree.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <SareeCard saree={saree} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 6. VIDEO CONSULTATION / APPOINTMENT CTA ── */}
      <section className="py-24 relative bg-[#0E0B0A] overflow-hidden border-y border-gold-800/20">
        <div className="absolute inset-0 bg-burgundy-950/15 z-10 pointer-events-none" />
        <div className="container-main relative z-20 flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-cream-50 flex flex-col gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold flex items-center gap-1.5">
              <Play size={12} className="text-gold-accent fill-gold-accent" /> Virtual Showroom Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-wide font-light leading-snug">
              Examine the Craftsmanship, live from Kanchipuram
            </h2>
            <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed">
              Can't visit our physical showrooms? Book a high-definition video shopping slot. Our heritage curators will host a live consultation, unfolding sarees, detailing zari layers, and showing colors in natural daylight.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FCFAF6]/10 backdrop-blur-md border border-gold-600/30 p-8 sm:p-10 rounded-sm w-full lg:max-w-md flex flex-col gap-6 text-cream-50 shadow-2xl hover:border-gold-accent/50 transition-colors"
          >
            <div className="flex gap-4 items-start border-b border-gold-800/30 pb-4">
              <Calendar className="text-gold-accent shrink-0 mt-0.5 animate-pulse" size={24} />
              <div>
                <h4 className="font-serif text-lg font-medium text-cream-100">Schedule Video Visit</h4>
                <p className="text-[10px] text-cream-300">Free 30-minute private showroom slot</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-cream-200">Examine fabrics under high-magnification cams</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-cream-200">Get styling advice from professional bridal drapers</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gold-accent font-bold">✔</span>
                <span className="font-light text-cream-200">Personalized shipping packaging checks</span>
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
              className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm border border-gold-200/20 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-cream-50 shadow-inner">
                <Award size={28} />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-3">
                100% Pure Certified Silk
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                All our silk sarees bear the certified Silk Mark tag, guaranteeing authentic Mulberry silk yarns and gold-plated silver zari of the highest purity grades.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm border border-gold-200/20 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-cream-50 shadow-inner">
                <Sparkles size={26} />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-3">
                Traditional Craftsmanship
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                We work directly with master weavers, keeping ancient weaving guilds alive and ensuring fair wages are paid directly to handloom artists.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm border border-gold-200/20 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold-300 flex items-center justify-center text-gold-vintage mb-6 bg-cream-50 shadow-inner">
                <Globe size={26} />
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-3">
                Worldwide Boutique Delivery
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                We ship our luxury sarees internationally. Our team offers online video boutique tours and consultation to customize blouse styles before dispatch.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 8. LUXURY CLIENT REVIEW (TESTIMONIALS) ── */}
      <section className="section-padding bg-[#FCFAF6]/60 backdrop-blur-sm border-t border-gold-200/20">
        <div className="container-main text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold mb-3 block">
            Customer Praise
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light mb-16">
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
            
            <blockquote className="font-serif text-xl sm:text-3xl italic text-charcoal-700 leading-relaxed font-light mb-8">
              "The Muhurtham Kanchipuram saree I ordered from Golden Yellow Boutique was beyond words. The weight of the silk, the shimmer of the pure gold zari, and the detail in the wedding cart design on the pallu left everyone spellbound. It is a family treasure now."
            </blockquote>
            
            <cite className="font-sans text-xs uppercase tracking-widest font-bold text-gold-vintage block">
              — Arundhati S., Bangalore
            </cite>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
