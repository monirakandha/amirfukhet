'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { submitInquiry } from '@/services/api';
import { CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [isValuationOpen, setIsValuationOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitInquiry({
        name,
        email,
        phone,
        type: 'general',
        message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Work With Me Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        {/* Geometric grid background pattern */}
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Contact Pill Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-[14px] font-medium text-[#5870F7] shadow-xs mx-auto">
            Contact Us
          </div>

          {/* Main Headline */}
          <h1 className="hero-heading max-w-4xl mx-auto">
            Get in touch with Amir
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="hero-description max-w-2xl mx-auto pt-1">
            A straight, honest reply &ndash; usually within 24 hours. No sales pitch.
          </p>
        </div>
      </section>

      {/* Why work with an advisor, not a portal Section matching Figma mockup */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Why work with an advisor, not a portal
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              A listing site shows you what's for sale. An advisor tells you what's worth buying — and what to avoid.
            </p>
          </div>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Fastest ways to reach me */}
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Fastest ways to reach me
              </h2>

              <div className="space-y-4">
                {/* WhatsApp Card */}
                <a href="https://wa.me/8801875189361" target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="bg-[#f8fafc] border border-gray-100 rounded-3xl p-6 flex items-center gap-5 transition-all group-hover:border-blue-200 group-hover:shadow-md">
                    <img src="/images/amir.png" alt="Amir" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">WhatsApp</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Message or call directly</p>
                    </div>
                  </div>
                </a>

                {/* Email Card */}
                <a href="mailto:amir@amirknowsphuket.com" className="block group">
                  <div className="bg-[#f8fafc] border border-gray-100 rounded-3xl p-6 flex items-center gap-5 transition-all group-hover:border-blue-200 group-hover:shadow-md">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <svg width="26" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.611 11.0022C43.5135 10.5186 43.149 10.0215 42.6617 9.64571L24 1V19.3879L43.611 11.0022Z" fill="#EA4335"/>
                        <path d="M24 1L5.33831 9.64571C4.85098 10.0215 4.48654 10.5186 4.38902 11.0022L24 19.3879V1Z" fill="#C5221F"/>
                        <path d="M43.611 11.0022V36.9978C43.611 38.656 42.267 40 40.6087 40H35V19.3879L43.611 11.0022Z" fill="#FABB05"/>
                        <path d="M4.38902 11.0022V36.9978C4.38902 38.656 5.733 40 7.39129 40H13V19.3879L4.38902 11.0022Z" fill="#4285F4"/>
                        <path d="M35 40H13V19.3879L24 24.3217L35 19.3879V40Z" fill="#34A853"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">amir@amirknowsphuket.com</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Email Amir directly</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#5870F7] hover:bg-[#5870F7] hover:text-white transition-colors shadow-xs">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#5870F7] hover:bg-[#5870F7] hover:text-white transition-colors shadow-xs">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#5870F7] hover:bg-[#5870F7] hover:text-white transition-colors shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#1c2024] rounded-[32px] p-8 sm:p-10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-white">Inquiry Sent!</h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    Thank you for reaching out. Amir will review your request and get back to you directly within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl sm:text-[28px] font-bold text-white mb-8">Send an inquiry</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#272b30] border border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-[#272b30] border border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-300 mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your whatsapp number"
                        className="w-full bg-[#272b30] border border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What i can help you with?"
                        className="w-full bg-[#272b30] border border-gray-700/50 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-center space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-[15px] transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send inquiry'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                    </button>
                    <p className="text-[13px] text-gray-400 font-medium">Sends straight to Amir&apos;s inbox.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer hideCTA />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
