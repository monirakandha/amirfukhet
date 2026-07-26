'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { submitInquiry } from '@/services/api';
import { CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
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

      {/* Contact Us Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        {/* Subtle geometric grid background pattern matching Figma mockup */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Contact Us Pill Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs mx-auto">
            Contact Us
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight max-w-4xl mx-auto">
            Get in touch with Amir
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed pt-1">
            A straight, honest reply — usually within 24 hours. No sales pitch.
          </p>
        </div>
      </section>

      {/* Content Section matching Figma mockup */}
      <section className="py-16 flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Fastest ways to reach me */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                Fastest ways to reach me
              </h2>

              <div className="space-y-4">
                {/* Contact Card 1: WhatsApp */}
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-300 transition-all shadow-2xs group block"
                >
                  <img
                    src="/images/amir.png"
                    alt="Amir Ahmed Faisal"
                    className="w-12 h-12 rounded-full object-cover border border-blue-200 shrink-0 bg-white"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-[#4c70ff] transition-colors">
                      WhatsApp
                    </h3>
                    <p className="text-xs text-gray-500">
                      Message or call directly
                    </p>
                  </div>
                </a>

                {/* Contact Card 2: Email */}
                <a
                  href="mailto:amir@amirknowsphuket.com"
                  className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-300 transition-all shadow-2xs group block"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 group-hover:text-[#4c70ff] transition-colors">
                      amir@amirknowsphuket.com
                    </h3>
                    <p className="text-xs text-gray-500">
                      Email Amir directly
                    </p>
                  </div>
                </a>
              </div>

              {/* Social Circle Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="Twitter / X"
                >
                  𝕏
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.2.3-.778.982-.954 1.181-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.613.136-.134.301-.351.452-.526.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.243-.589-.49-.509-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.914 1.229 3.115.15.201 2.124 3.243 5.145 4.548.718.311 1.28.497 1.718.636.721.23 1.377.197 1.896.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.201-.577-.351z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Send an inquiry Dark Card Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#1c2024] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-gray-800 space-y-6">
                <h3 className="text-2xl font-bold text-white">Send an inquiry</h3>

                {submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-xl font-bold text-white">Inquiry Sent!</h4>
                    <p className="text-xs text-gray-400">
                      Thank you for reaching out. Amir will review your inquiry and get back to you directly within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#272c33] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4c70ff] transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-[#272c33] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4c70ff] transition-colors"
                      />
                    </div>

                    {/* WhatsApp Input */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your whatsapp number"
                        className="w-full bg-[#272c33] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4c70ff] transition-colors"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What i can help you with?"
                        className="w-full bg-[#272c33] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4c70ff] transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? 'Sending Inquiry...' : 'Send inquiry'}
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>

                    {/* Footer note */}
                    <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                      Sends straight to Amir's inbox.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
