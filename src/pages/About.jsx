import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Shield, Heart, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-cream-100 min-h-screen pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="bg-charcoal-900 text-cream-50 py-20 sm:py-28 relative overflow-hidden grain-bg border-b border-gold-800/40">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/40 to-charcoal-900/10 z-10" />
        <div className="container-main relative z-20 text-center flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold">
            Our Story & Legacy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide font-light">
            About Us
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 font-light max-w-xl leading-relaxed mt-2">
            Celebrating the timeless art of handloom weaving, connecting master artisans to modern ethnic fashion patrons.
          </p>
          <div className="w-16 h-[1px] bg-gold-accent mt-4"></div>
        </div>
      </section>

      {/* 2. THE BRAND VISION SPLIT */}
      <section className="section-padding bg-cream-50">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Image */}
            <div className="lg:col-span-5 h-[500px] overflow-hidden bg-cream-200 border border-gold-300/40 rounded-sm shadow-md relative">
              <img
                src="https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
                alt="Weaving loom craftsmanship"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 border-[12px] border-gold-vintage/20 pointer-events-none" />
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Sparkles className="text-gold-accent" size={16} />
                <span className="text-[10px] uppercase tracking-widest text-gold-vintage font-bold">
                  Since 1978
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-800 tracking-wide font-light leading-tight">
                Crafted by Hand. <br />Cherished for Generations.
              </h2>
              
              <div className="w-12 h-[1px] bg-gold-vintage"></div>
              
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-muted font-light leading-relaxed">
                <p>
                  Golden Yellow Boutique began with a single vision: to bridge the gap between traditional weavers’ communities and the connoisseurs of luxury sarees. What started in the ancient weaving lanes of Kanchipuram has now expanded into a pan-Indian heritage showcase representing the pinnacle of loom crafts.
                </p>
                <p>
                  Every saree in our collection is curated directly from the handlooms of our master weaver partners. We avoid intermediaries, ensuring that the financial fruits of this monumental craft flow directly back to the weaving cooperatives and families who have sustained this heritage across four centuries.
                </p>
                <p>
                  From auspicious bridal reds crafted with real gold-dipped silver zari to breathable daily linen wraps printed with natural vegetable dyes, we celebrate the irregularities and stories woven into handloom weaves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE HANDLOOM TIMELINE / PROCESS */}
      <section className="section-padding bg-cream-100 border-y border-gold-200/20">
        <div className="container-main">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-vintage font-bold">
              Artisan Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-800 tracking-wide font-light">
              Anatomy of a Handloom Masterpiece
            </h2>
            <p className="text-xs text-muted font-light max-w-md mt-1">
              It takes up to 4 weavers and 30 days of meticulous manual work to craft a single Kanchipuram or Banarasi bridal saree.
            </p>
            <div className="w-12 h-[1px] bg-gold-vintage mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-cream-50 p-6 border border-gold-200/30 rounded-sm relative flex flex-col gap-4">
              <span className="font-serif text-4xl text-gold-vintage/45 font-light">01</span>
              <h4 className="font-serif text-lg font-medium text-charcoal-850">Thread Preparation</h4>
              <p className="text-[11px] text-muted font-light leading-relaxed">
                Raw mulberry silk fibers are spun and twisted to strengthen the yarn, then hand-dyed in boiling cauldrons with organic colors.
              </p>
            </div>

            <div className="bg-cream-50 p-6 border border-gold-200/30 rounded-sm relative flex flex-col gap-4">
              <span className="font-serif text-4xl text-gold-vintage/45 font-light">02</span>
              <h4 className="font-serif text-lg font-medium text-charcoal-850">Zari Selection</h4>
              <p className="text-[11px] text-muted font-light leading-relaxed">
                Fine silver silk cores are wrapped in pure silver wires, then dipped in liquid gold alloy to craft the signature heritage metallic luster.
              </p>
            </div>

            <div className="bg-cream-50 p-6 border border-gold-200/30 rounded-sm relative flex flex-col gap-4">
              <span className="font-serif text-4xl text-gold-vintage/45 font-light">03</span>
              <h4 className="font-serif text-lg font-medium text-charcoal-850">Design Card Punching</h4>
              <p className="text-[11px] text-muted font-light leading-relaxed">
                Elaborate temple borders or Mughal floral curves are meticulously graphed onto cards which direct the movement of individual loom needles.
              </p>
            </div>

            <div className="bg-cream-50 p-6 border border-gold-200/30 rounded-sm relative flex flex-col gap-4">
              <span className="font-serif text-4xl text-gold-vintage/45 font-light">04</span>
              <h4 className="font-serif text-lg font-medium text-charcoal-850">Double-loom Weaving</h4>
              <p className="text-[11px] text-muted font-light leading-relaxed">
                Artisans join the borders and body using the interlocking (Korvai) technique, operating pedal-driven handlooms in rhythmic harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND VALUES & ETHICAL STANDARDS */}
      <section className="section-padding bg-cream-50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-gold-light/20 text-gold-vintage border border-gold-300/40 rounded-sm shrink-0">
                <Award size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-charcoal-800">Certified Authenticity</h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  We are official Silk Mark certificate holders. Every item is verified by hand before dispatch to guarantee its materials match our declarations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-gold-light/20 text-gold-vintage border border-gold-300/40 rounded-sm shrink-0">
                <HeartHandshake size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-charcoal-800">Artisan Fair Trade</h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  By paying fair, sustainable wages directly to the weavers, we protect their households and keep ancient handloom traditions viable for future generations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-gold-light/20 text-gold-vintage border border-gold-300/40 rounded-sm shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-medium text-charcoal-800">Sustainable Fashion</h4>
                <p className="text-xs text-muted font-light leading-relaxed">
                  Handloom is a zero-carbon footprint process. Buying a handloom saree is a choice for organic longevity, supporting planet-friendly craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
