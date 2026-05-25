import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SparkleBackground() {
  // Generate random configurations for particles
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage width
      y: Math.random() * 100, // percentage height
      size: Math.random() * 5 + 1.5, // 1.5px to 6.5px
      duration: Math.random() * 14 + 10, // 10s to 24s
      delay: Math.random() * -10, // Start animation offset immediately
      depth: Math.random() > 0.6 ? 2 : 1, // depth for parallax/blur feel
    }));
  }, []);

  // Mouse tracking with framer-motion springs for premium lag/inertia effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 120, mass: 1.2 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to screen size or keep pixels. Let's use pixels but subtract half width/height
      const { clientX, clientY } = e;
      mouseX.set(clientX - window.innerWidth / 2);
      mouseY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* 1. Base Premium Canvas Color */}
      <div className="absolute inset-0 bg-[#FCFAF6]" />

      {/* 2. Delicate Architectural Luxury Grid Pattern (Slightly more visible) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C5A059 1px, transparent 1px),
            linear-gradient(to bottom, #C5A059 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* 3. SVG Silk Thread Waves (Smooth Animated Curves representing saree weave - enhanced opacity) */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gold-gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF6EB" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Thread 1 */}
        <motion.path
          d="M-100,200 C300,50 600,450 1200,100 C1500,-50 1800,200 2000,150"
          fill="none"
          stroke="url(#gold-gradient-line)"
          strokeWidth="2"
          animate={{
            d: [
              "M-100,200 C300,50 600,450 1200,100 C1500,-50 1800,200 2000,150",
              "M-100,180 C280,80 580,410 1180,120 C1480,-30 1820,180 2000,170",
              "M-100,200 C300,50 600,450 1200,100 C1500,-50 1800,200 2000,150"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Thread 2 */}
        <motion.path
          d="M-50,600 C400,800 800,300 1300,700 C1600,900 1800,500 2100,600"
          fill="none"
          stroke="url(#gold-gradient-line)"
          strokeWidth="1.5"
          animate={{
            d: [
              "M-50,600 C400,800 800,300 1300,700 C1600,900 1800,500 2100,600",
              "M-50,620 C420,770 780,340 1320,680 C1580,930 1820,480 2100,580",
              "M-50,600 C400,800 800,300 1300,700 C1600,900 1800,500 2100,600"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>

      {/* 4. Interactive Mouse-Follower Glow Blob (Burgundy & Rose Blend - More vibrant) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#fdb2d4] via-[#fbc2eb] to-[#a6c1ee] blur-[130px] opacity-45"
        style={{
          x: trailX,
          y: trailY,
        }}
      />

      {/* 5. Static & Ambient Morphing Blobs (For structured visual design - Higher opacity) */}
      
      {/* Top Left - Peach-Rose Warm Glow */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#FDF2F4] via-[#fde2e4] to-[#ffccd5] blur-[110px] opacity-75"
        animate={{
          x: [0, 45, -20, 0],
          y: [0, 35, 45, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Right - Rich Champagne Gold Glow */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#FFFDF9] via-[#FAF6EB] to-[#FFEBB3] blur-[120px] opacity-65 border border-gold-accent/5"
        animate={{
          x: [0, -35, 15, 0],
          y: [0, -45, -25, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center Right - Royal Orchid Blush */}
      <motion.div
        className="absolute top-[35%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#fde8e8] to-[#ffd6e8] blur-[120px] opacity-55"
        animate={{
          x: [0, -25, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 6. Multi-Depth Floating Gold Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFFDF9] to-[#C5A059] opacity-40 ${
            p.depth === 2 ? 'blur-[1.5px] opacity-35' : 'shadow-[0_0_12px_rgba(212,175,55,0.85)]'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.sin(p.id) * 40, 0],
            opacity: [0, 0.8, 0],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 7. Subtle radial vignette overlay to focus center content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(250,247,242,0.1)_80%)]" />
    </div>
  );
}

