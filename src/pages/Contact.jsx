import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Video, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredCollection: '',
    inquiryType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredCollection: '',
        inquiryType: 'general',
        message: ''
      });
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-cream-100 min-h-screen pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="bg-charcoal-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden grain-bg border-b border-gold-800/40">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/40 to-charcoal-900/10 z-10" />
        <div className="container-main relative z-20 text-center flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-accent font-bold">
            Connect with us
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide font-light">
            Our Showrooms & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 font-light max-w-xl leading-relaxed mt-2">
            Schedule a physical boutique visit, request a personal video consultation, or inquire about our collections.
          </p>
          <div className="w-16 h-[1px] bg-gold-accent mt-4"></div>
        </div>
      </section>

      {/* 2. SPLIT CONTACT CONTENT */}
      <section className="container-main pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* A. LEFT: BOUTIQUE SHOWROOM CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-gold-vintage font-bold">
                Visit Us
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-800 tracking-wide font-light leading-snug">
                Our Flagship Showrooms
              </h2>
              <div className="w-12 h-[1px] bg-gold-vintage mt-1"></div>
            </div>

            {/* Boutique 1 */}
            <div className="bg-cream-50 border border-gold-200/50 p-6 rounded-sm flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl font-medium text-charcoal-800 flex items-center gap-2 pb-2 border-b border-gold-200/20">
                <MapPin size={18} className="text-gold-accent" /> Kanchipuram Flagship
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-muted leading-relaxed font-light">
                <p>
                  <strong>Address:</strong> 12, Temple Car Street, Kanchipuram, Tamil Nadu - 631501
                </p>
                <p>
                  <strong>Phone:</strong> +91 44 2722 4567 / +91 98765 43210
                </p>
                <p>
                  <strong>Hours:</strong> 10:00 AM – 08:30 PM (All Days)
                </p>
              </div>
            </div>

            {/* Boutique 2 */}
            <div className="bg-cream-50 border border-gold-200/50 p-6 rounded-sm flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl font-medium text-charcoal-800 flex items-center gap-2 pb-2 border-b border-gold-200/20">
                <MapPin size={18} className="text-gold-accent" /> Chennai Boutique
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-muted leading-relaxed font-light">
                <p>
                  <strong>Address:</strong> 45, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu - 600006
                </p>
                <p>
                  <strong>Phone:</strong> +91 44 4958 1234
                </p>
                <p>
                  <strong>Hours:</strong> 10:30 AM – 09:00 PM (All Days)
                </p>
              </div>
            </div>

            {/* Boutique 3 */}
            <div className="bg-cream-50 border border-gold-200/50 p-6 rounded-sm flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl font-medium text-charcoal-800 flex items-center gap-2 pb-2 border-b border-gold-200/20">
                <MapPin size={18} className="text-gold-accent" /> Varanasi Heritage Suite
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-muted leading-relaxed font-light">
                <p>
                  <strong>Address:</strong> K-20/5, Chowk weavers lane, Varanasi, Uttar Pradesh - 221001
                </p>
                <p>
                  <strong>Phone:</strong> +91 542 245 8899
                </p>
                <p>
                  <strong>Hours:</strong> 11:00 AM – 08:00 PM (Closed on Tuesdays)
                </p>
              </div>
            </div>
          </div>

          {/* B. RIGHT: ELEGANT INQUIRY FORM */}
          <div className="lg:col-span-7 bg-cream-50 border border-gold-200/50 p-8 sm:p-12 rounded-sm shadow-md">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <CheckCircle2 size={48} className="text-emerald-700 animate-bounce" />
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-800 font-medium">Inquiry Submitted</h3>
                <p className="text-xs sm:text-sm text-muted font-light leading-relaxed max-w-sm">
                  Thank you for connecting with Golden Yellow Boutique. A brand curator will reach out to you shortly via phone or email to assist with your request.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-burgundy mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold-vintage font-bold flex items-center gap-1">
                    <Video size={12} className="text-gold-accent" /> Online Showroom Consultation
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-800 tracking-wide font-light">
                    Heritage Inquiry Form
                  </h2>
                  <p className="text-[11px] text-muted font-light leading-relaxed">
                    Looking for a specific weave? Fill out this inquiry form, and our stylists will host a high-definition video tour to showcase sarees in real-time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white border border-gold-200 focus:outline-none focus:border-gold-accent px-4 py-2.5 text-xs rounded-sm"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white border border-gold-200 focus:outline-none focus:border-gold-accent px-4 py-2.5 text-xs rounded-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-white border border-gold-200 focus:outline-none focus:border-gold-accent px-4 py-2.5 text-xs rounded-sm"
                      required
                    />
                  </div>

                  {/* Preferred collection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Preferred Collection</label>
                    <select
                      name="preferredCollection"
                      value={formData.preferredCollection}
                      onChange={handleChange}
                      className="bg-white border border-gold-200 focus:outline-none focus:border-gold-accent px-4 py-2.5 text-xs rounded-sm"
                    >
                      <option value="">Select Category</option>
                      <option value="kanchipuram">Kanchipuram Silk</option>
                      <option value="banarasi">Banarasi Silk</option>
                      <option value="cotton">Cotton Weaves</option>
                      <option value="linen">Linen</option>
                      <option value="organza">Organza / Tissue</option>
                      <option value="bridal">Bridal / Wedding</option>
                    </select>
                  </div>
                </div>

                {/* Inquiry type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Inquiry Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <label className="flex items-center gap-2 bg-white border border-gold-200 p-3 rounded-sm cursor-pointer hover:bg-cream-100/50 transition-colors">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="general"
                        checked={formData.inquiryType === 'general'}
                        onChange={handleChange}
                        className="accent-burgundy-850"
                      />
                      <span>General Query</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white border border-gold-200 p-3 rounded-sm cursor-pointer hover:bg-cream-100/50 transition-colors">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="video-call"
                        checked={formData.inquiryType === 'video-call'}
                        onChange={handleChange}
                        className="accent-burgundy-850"
                      />
                      <span>Video Shopping</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white border border-gold-200 p-3 rounded-sm cursor-pointer hover:bg-cream-100/50 transition-colors col-span-2 sm:col-span-1">
                      <input
                        type="radio"
                        name="inquiryType"
                        value="custom-order"
                        checked={formData.inquiryType === 'custom-order'}
                        onChange={handleChange}
                        className="accent-burgundy-850"
                      />
                      <span>Bespoke Blouse</span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-charcoal-700">Detailed Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe specific weaves, patterns, or colors you are looking for..."
                    className="bg-white border border-gold-200 focus:outline-none focus:border-gold-accent px-4 py-2.5 text-xs rounded-sm resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-burgundy py-4 text-xs tracking-widest font-semibold flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={12} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
