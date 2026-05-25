import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Shield, Heart, HeartHandshake } from 'lucide-react';
import { Footer } from '../components';

export default function About() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-24 text-[var(--text-main)]">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[var(--bg-secondary)] text-[var(--text-main)] py-24 sm:py-32 relative overflow-hidden border-b border-[var(--border-glow)]">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-burgundy-900/10 blur-[100px] pointer-events-none animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase text-[var(--text-main)] opacity-[0.02] tracking-[0.1em] font-sans">
            LEGACY
          </span>
        </div>

        <div className="container-main relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-extrabold px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)]">
            Our Story & Legacy
          </span>
          
          <h1 className="font-sans text-5xl sm:text-7xl font-black uppercase tracking-tight text-[var(--text-main)] leading-none">
            ABOUT 
            <span className="text-transparent font-serif italic font-light lowercase text-gold-accent block sm:inline normal-case ml-0 sm:ml-4">
              Us.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg leading-relaxed mt-2">
            Celebrating the timeless art of handloom weaving, connecting master artisans to modern ethnic fashion patrons.
          </p>
        </div>
      </section>

      {/* 2. THE BRAND VISION SPLIT */}
      <section className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-glow)]">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 h-[500px] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-glow)] rounded-lg shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
                alt="Weaving loom craftsmanship"
                className="w-full h-full object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 border-[12px] border-[var(--border-glow)] pointer-events-none" />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-gold-accent" size={16} />
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-extrabold">
                  Since 1978
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-main)] tracking-wide font-light leading-tight">
                Crafted by Hand. <br />Cherished for Generations.
              </h2>
              
              <div className="w-12 h-[1px] bg-gold-accent"></div>
              
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[var(--text-sub)] font-light leading-relaxed">
                <p>
                  Golden Yellow Boutique began with a single vision: to bridge the gap between traditional weavers’ communities and the patrons of luxury sarees. What started in the ancient weaving lanes of Kanchipuram has now expanded into a pan-Indian heritage showcase representing the pinnacle of loom crafts.
                </p>
                <p>
                  Every saree in our collection is curated directly from the handlooms of our master weaver partners. We avoid intermediaries, ensuring that the financial rewards of this monumental craft flow directly back to the weaving cooperatives and families who have sustained this heritage across four centuries.
                </p>
                <p>
                  From auspicious bridal reds crafted with real gold-dipped silver zari to breathable daily linen wraps printed with natural vegetable dyes, we celebrate the unique stories woven into every handloom piece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE HANDLOOM TIMELINE / PROCESS */}
      <section className="section-padding bg-[var(--bg-secondary)] border-b border-[var(--border-glow)]">
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-bold">
              Artisan Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-main)] tracking-wide font-light">
              Anatomy of a Handloom Masterpiece
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-light max-w-md mt-1">
              It takes up to 4 weavers and 30 days of meticulous manual work to craft a single Kanchipuram or Banarasi bridal saree.
            </p>
            <div className="w-12 h-[1px] bg-gold-accent mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[var(--bg-card)] p-6 border border-[var(--border-glow)] rounded-lg relative flex flex-col gap-4 shadow-2xl">
              <span className="font-serif text-4xl text-gold-accent/25 font-light">01</span>
              <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Thread Preparation</h4>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Raw mulberry silk fibers are spun and twisted to strengthen the yarn, then hand-dyed in boiling cauldrons with organic colors.
              </p>
            </div>

            <div className="bg-[var(--bg-card)] p-6 border border-[var(--border-glow)] rounded-lg relative flex flex-col gap-4 shadow-2xl">
              <span className="font-serif text-4xl text-gold-accent/25 font-light">02</span>
              <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Zari Selection</h4>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Fine silk cores are wrapped in pure silver wires, then dipped in liquid gold alloy to craft the signature heritage metallic luster.
              </p>
            </div>

            <div className="bg-[var(--bg-card)] p-6 border border-[var(--border-glow)] rounded-lg relative flex flex-col gap-4 shadow-2xl">
              <span className="font-serif text-4xl text-gold-accent/25 font-light">03</span>
              <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Design Card Punching</h4>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Elaborate temple borders or Mughal floral curves are meticulously graphed onto cards which direct the movement of individual loom needles.
              </p>
            </div>

            <div className="bg-[var(--bg-card)] p-6 border border-[var(--border-glow)] rounded-lg relative flex flex-col gap-4 shadow-2xl">
              <span className="font-serif text-4xl text-gold-accent/25 font-light">04</span>
              <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Double-loom Weaving</h4>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                Artisans join the borders and body using the interlocking (Korvai) technique, operating pedal-driven handlooms in rhythmic harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND VALUES & ETHICAL STANDARDS */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start bg-[var(--bg-card)] p-6 rounded-lg border border-[var(--border-glow)] shadow-2xl">
              <div className="p-3 bg-[var(--bg-card-inner)] text-gold-accent border border-[var(--border-glow)] rounded-sm shrink-0">
                <Award size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Certified Authenticity</h4>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  We are official Silk Mark certificate holders. Every item is verified by hand before dispatch to guarantee its materials match our declarations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-[var(--bg-card)] p-6 rounded-lg border border-[var(--border-glow)] shadow-2xl">
              <div className="p-3 bg-[var(--bg-card-inner)] text-gold-accent border border-[var(--border-glow)] rounded-sm shrink-0">
                <HeartHandshake size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Artisan Fair Trade</h4>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  By paying fair, sustainable wages directly to the weavers, we protect their households and keep ancient handloom traditions viable for future generations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-[var(--bg-card)] p-6 rounded-lg border border-[var(--border-glow)] shadow-2xl">
              <div className="p-3 bg-[var(--bg-card-inner)] text-gold-accent border border-[var(--border-glow)] rounded-sm shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-[var(--text-main)]">Sustainable Fashion</h4>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  Handloom is a zero-carbon footprint process. Buying a handloom saree is a choice for organic longevity, supporting planet-friendly craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
