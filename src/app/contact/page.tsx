'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { submitInquiry } from '@/services/api';
import { CheckCircle2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function ContactPage() {
  const { settings } = useAdmin();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [isValuationOpen, setIsValuationOpen] = useState(false);

  const content = settings.pagesContent?.contactPage || {
    heroPill: 'Contact Us',
    heroHeadline: 'Get in touch with Amir',
    heroDescription: 'A straight, honest reply &ndash; usually within 24 hours. No sales pitch.'
  };

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
          <div className="section-pill shadow-2xs mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
            {content.heroPill || 'Contact Us'}
          </div>

          {/* Main Headline */}
          <h1 
            className="hero-heading max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content.heroHeadline || '' }}
          />

          {/* Subtitle / Paragraph */}
          <div 
            className="hero-description max-w-2xl mx-auto pt-1 prose prose-sm prose-gray"
            dangerouslySetInnerHTML={{ __html: content.heroDescription || '' }}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Fastest ways to reach me */}
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {content.fastestWaysHeadline || 'Fastest ways to reach me'}
              </h2>

              <div className="space-y-3">
                {/* WhatsApp Card */}
                <a href={settings.buttonLinks?.whatsappUrl || "https://wa.me/8801875189361"} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 flex items-center gap-5 transition-all group-hover:shadow-md">
                    <div className="w-[68px] h-[68px] shrink-0 rounded-full bg-[#F3F4F6] overflow-hidden flex items-center justify-center">
                      <img src={settings.adminProfile?.image || "/images/amir.png"} alt={settings.adminProfile?.name || "Amir"} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">{content.whatsappCardTitle || 'WhatsApp'}</h3>
                      <div className="text-[15px] text-gray-500 mt-0.5 prose prose-sm prose-gray" dangerouslySetInnerHTML={{ __html: content.whatsappCardDesc || 'Message or call directly' }} />
                    </div>
                  </div>
                </a>

                {/* Email Card */}
                <a href={`mailto:${settings.contactEmail || "amir@amirknowsphuket.com"}`} className="block group">
                  <div className="bg-white border border-[#E5E7EB] rounded-3xl p-5 flex items-center gap-5 transition-all group-hover:shadow-md">
                    <div className="w-[68px] h-[68px] shrink-0 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center">
                      <svg width="34" height="34" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.6364 203.039H73.4545V125.766L28 91.6753V189.403C28 196.948 34.1136 203.039 41.6364 203.039Z" fill="#4285F4"/>
                        <path d="M182.545 203.039H214.364C221.909 203.039 228 196.925 228 189.403V91.6753L182.545 125.766" fill="#34A853"/>
                        <path d="M182.545 66.6751V125.766L228 91.6751V73.4932C228 56.6296 208.75 47.016 195.273 57.1296" fill="#FBBC04"/>
                        <path d="M73.4545 125.766V66.6753L128 107.584L182.545 66.6753V125.766L128 166.675" fill="#EA4335"/>
                        <path d="M28 73.4932V91.6751L73.4545 125.766V66.6751L60.7273 57.1296C47.2273 47.016 28 56.6296 28 73.4932Z" fill="#C5221F"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">{content.emailCardTitle || settings.contactEmail || 'amir@amirknowsphuket.com'}</h3>
                      <div className="text-[15px] text-gray-500 mt-0.5 prose prose-sm prose-gray" dangerouslySetInnerHTML={{ __html: content.emailCardDesc || 'Email Amir directly' }} />
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="w-[56px] h-[56px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </a>
                <a href="#" className="w-[56px] h-[56px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors shadow-xs">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>
                <a href="#" className="w-[56px] h-[56px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors shadow-xs">
                  <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="rounded-[32px] bg-[#1C2026] p-3 sm:p-4 shadow-2xl relative w-full">
              <div className="rounded-[24px] bg-[#FFFFFF0D] border border-[#FFFFFF0D] p-6 sm:p-8 w-full flex flex-col relative">
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
                    <h3 className="text-[28px] font-semibold text-white mb-6">{content.formTitle || 'Send an inquiry'}</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[15px] font-normal text-white mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-transparent border border-[#44464A] rounded-[14px] px-5 py-3.5 text-[15px] text-white placeholder-[#A1A3A7] focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-normal text-white mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent border border-[#44464A] rounded-[14px] px-5 py-3.5 text-[15px] text-white placeholder-[#A1A3A7] focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-normal text-white mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your whatsapp number"
                        className="w-full bg-transparent border border-[#44464A] rounded-[14px] px-5 py-3.5 text-[15px] text-white placeholder-[#A1A3A7] focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-normal text-white mb-2">Message</label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What i can help you with?"
                        className="w-full bg-transparent border border-[#44464A] rounded-[14px] px-5 py-3.5 text-[15px] text-white placeholder-[#A1A3A7] focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-center space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#5870F7] hover:bg-blue-600 text-white font-medium text-[16px] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : (content.formButtonText || 'Send inquiry')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                    </button>
                    <p className="text-[14px] text-[#A1A3A7]">Sends straight to Amir&apos;s inbox.</p>
                  </div>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer hideCTA />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
