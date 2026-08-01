'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { submitInquiry } from '@/services/api';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'schedule-tour' | 'ask-question' | 'home-valuation' | 'general'>('general');
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
        type: inquiryType,
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
          {/* Work with Amir Pill Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
            Work with Amir
          </div>

          {/* Main Headline */}
          <h1 className="hero-heading max-w-4xl mx-auto">
            An advisor in your corner — from first question to keys in hand
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="hero-description max-w-2xl mx-auto pt-1">
            No commission-chasing. No pressure. Just clear, independent guidance so you buy the right property under the right structure.
          </p>

          {/* Primary Action CTA Button */}
          <div className="pt-2">
            <a
              href="#contact-form"
              className="hero-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full transition-all shadow-lg shadow-blue-600/25"
            >
              Book a free consultation
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
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

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Independent */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Independent
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                I'm paid to advise you well, not to push one developer's stock. You hear the downsides too.
              </p>
            </div>

            {/* Card 2: Due-diligence first */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Due-diligence first
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Title checks, developer track record, lease terms — the unglamorous work that protects your money.
              </p>
            </div>

            {/* Card 3: On the ground */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                On the ground
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Based in Phuket. I view the property, meet the people, and represent your interests locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everything you need to buy with confidence Section matching Figma mockup */}
      <section className="py-20 bg-[#f8fafc] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* What you get Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4c70ff]" />
                What you get
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Everything you need to buy with confidence
              </h2>

              {/* 5 Checklist Items */}
              <div className="space-y-4 pt-2">
                {/* Item 1 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>A clear read on your goals – lifestyle, yield, or both</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>A shortlist of properties that genuinely fit, with the trade-offs spelled out</span>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Due diligence on title, developer and ownership structure</span>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Guidance through negotiation, contracts and transfer</span>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Introductions to vetted lawyers, and rental management if you need it</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-blue-600/25"
                >
                  Ask Amir
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column Villa Image */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 h-[380px] sm:h-[460px] w-full">
                <img
                  src="/images/confidence-villa.png"
                  alt="Luxury Villa Pool - Buy with confidence"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A simple, no-pressure process Section matching Figma mockup */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4c70ff]" />
              How to get started
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              A simple, no-pressure process
            </h2>
          </div>

          {/* 4 Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Reach out
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  A message on WhatsApp or the form. Tell me what you're considering.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Free consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  We talk through goals, budget and areas. No obligation.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Research & shortlist
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  I do the legwork and bring you properties that actually fit.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                04
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Buy with confidence
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  Due diligence, negotiation and transfer – I'm with you throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's talk about your purchase CTA Section matching Figma mockup */}
      <section className="py-20 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1c2024] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto">
            <div className="border border-gray-700/60 rounded-[20px] sm:rounded-[24px] p-8 sm:p-12 text-center text-white space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Let's talk about your purchase
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                The first conversation is free, and there's no pressure to go further.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
                >
                  WhatsApp Amir
                </a>

                <a
                  href="#contact-form"
                  className="group px-6 py-3 bg-white hover:bg-[#5870F7] text-[#020202] hover:text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md"
                >
                  Book a consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Form Section */}
      <section id="contact-form" className="py-16 flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Advisor Card */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/amir.png"
                    alt="Amir Ahmed Faisal"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 shrink-0 bg-white"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Amir Ahmed Faisal</h3>
                    <p className="text-xs text-[#4c70ff] font-semibold">Independent Property Advisor · Phuket</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 text-sm border-t border-gray-200 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#4c70ff] shrink-0" />
                    <a href="tel:+8801875189361" className="hover:text-[#4c70ff] transition-colors">
                      +880 1875-189361
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#4c70ff] shrink-0" />
                    <a href="mailto:amir@fuketamir.com" className="hover:text-[#4c70ff] transition-colors">
                      amir@fuketamir.com
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#4c70ff] shrink-0 mt-1" />
                    <span>Bang Tao Beach, Cherngtalay, Phuket, Thailand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-6 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h3 className="text-2xl font-bold text-gray-900">Consultation Requested!</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      Thank you for reaching out. Amir will review your request and get back to you directly within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Schedule a Free Consultation</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Tell Amir about your target area, budget, or timeline.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#4c70ff] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#4c70ff] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 1875-189361"
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#4c70ff] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Topic</label>
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value as any)}
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#4c70ff] focus:outline-none"
                        >
                          <option value="general">Buying Advice / General</option>
                          <option value="schedule-tour">Schedule Property Viewing</option>
                          <option value="ask-question">Legal & Tax Structure</option>
                          <option value="home-valuation">Property Valuation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message / Details</label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell Amir what type of property, budget range, or questions you have..."
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#4c70ff] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Message to Amir'}
                      <Send className="w-4 h-4" />
                    </button>
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
