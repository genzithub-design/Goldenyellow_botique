import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock, Award } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { collections } from '../../data';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100 border-t border-gold-800/40 relative grain-bg">
      {/* Decorative Golden Line */}
      <div className="h-1 w-full bg-gold-gradient"></div>

      <div className="container-main pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex flex-col group">
              <span className="font-serif text-2xl tracking-[0.15em] font-medium text-gold-accent transition-all duration-300">
                GOLDEN YELLOW
              </span>
              <span className="text-[8px] uppercase tracking-[0.35em] text-cream-300 font-semibold mt-0.5">
                B O U T I Q U E
              </span>
            </Link>
            <p className="text-xs text-cream-300/80 leading-relaxed font-light mt-2 max-w-sm">
              Preserving India's timeless weaving legacy since 1978. Every drape represents months of meticulous artistry, pure gold zari craftsmanship, and authentic handloom heritage.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-700/50 flex items-center justify-center text-cream-300 hover:text-gold-accent hover:border-gold-accent transition-all duration-300"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold-700/50 flex items-center justify-center text-cream-300 hover:text-gold-accent hover:border-gold-accent transition-all duration-300"
              >
                <FaFacebook size={16} />
              </a>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold-vintage font-bold border border-gold-700/40 px-3 py-1.5 rounded-sm">
                <Award size={12} className="text-gold-accent" /> 100% Silk Mark certified
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5 lg:pl-10">
            <h4 className="font-serif text-lg tracking-wider text-gold-light border-b border-gold-800/40 pb-2">
              Explore Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-cream-300/85">
              <li>
                <Link to="/collections" className="hover:text-gold-accent transition-colors duration-300">
                  All Collections
                </Link>
              </li>
              {collections.slice(0, 5).map((col) => (
                <li key={col.slug}>
                  <Link to={`/collections/${col.slug}`} className="hover:text-gold-accent transition-colors duration-300">
                    {col.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-5 lg:pl-5">
            <h4 className="font-serif text-lg tracking-wider text-gold-light border-b border-gold-800/40 pb-2">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-cream-300/85">
              <li>
                <Link to="/" className="hover:text-gold-accent transition-colors duration-300">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-accent transition-colors duration-300">
                  Our Showroom Boutiques
                </Link>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-gold-accent transition-colors duration-300">
                  Join weavers' circle
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-accent transition-colors duration-300">
                  Book a Video Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom Contacts */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif text-lg tracking-wider text-gold-light border-b border-gold-800/40 pb-2">
              Our Flagship Boutiques
            </h4>
            <div className="flex flex-col gap-4 text-xs text-cream-300/85 font-light">
              <div className="flex gap-3">
                <MapPin size={18} className="text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Kanchipuram Boutique</p>
                  <p className="text-[11px] text-cream-400">12, Temple Car Street, Kanchipuram, TN - 631501</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Phone size={16} className="text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Contact / Inquiries</p>
                  <p className="text-[11px] text-cream-400">+91 98765 43210 / +91 44 2722 4567</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock size={16} className="text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Boutique Timings</p>
                  <p className="text-[11px] text-cream-400">10:00 AM – 08:30 PM (All Days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Circle */}
        <div id="newsletter" className="border-t border-gold-800/40 mt-16 pt-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <h5 className="font-serif text-xl text-gold-light tracking-wide">
            Subscribe to the Weavers' Circle
          </h5>
          <p className="text-[11px] text-cream-300 max-w-md leading-relaxed font-light">
            Receive exclusive early previews of our newest handloom arrivals, boutique exhibition invites, and short stories about Indian weave crafts.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md mt-2 border border-gold-700/50 rounded-sm overflow-hidden bg-charcoal-800 focus-within:border-gold-accent transition-colors duration-300">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-4 py-2.5 text-xs text-cream-100 placeholder-cream-500 focus:outline-none font-sans"
              required
            />
            <button
              type="submit"
              className="bg-gold-accent hover:bg-gold-500 text-burgundy-950 px-6 py-2.5 text-[10px] tracking-wider uppercase font-bold transition-colors duration-300 font-sans"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-800/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wider text-cream-400 font-light">
          <p>© {new Date().getFullYear()} Golden Yellow Boutique. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-accent transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gold-accent transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-gold-accent transition-colors duration-300">Weaver Fair Trade Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
