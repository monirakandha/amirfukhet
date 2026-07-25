'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { primaryAgent } from '@/data/mockData';
import { submitInquiry } from '@/services/api';
import { Phone, Mail, MapPin, Award, Send, CheckCircle2, Building2, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Realtor & Office
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Schedule a private consultation, inquire about a listing, or discuss selling your luxury residence.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information & Agent Card */}
            <div className="lg:col-span-5 space-y-8">
              {/* Primary Agent Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={primaryAgent.avatar}
                    alt={primaryAgent.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{primaryAgent.name}</h3>
                    <p className="text-xs text-amber-400 font-medium">{primaryAgent.title}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 text-sm border-t border-slate-800">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href={`tel:${primaryAgent.phone}`} className="hover:text-amber-400 transition-colors">
                      {primaryAgent.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href={`mailto:${primaryAgent.email}`} className="hover:text-amber-400 transition-colors">
                      {primaryAgent.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>450 Rodeo Drive, Suite 800, Beverly Hills, CA 90210</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Mon - Sat: 8:00 AM - 7:00 PM (PST)</span>
                  </div>
                </div>
              </div>

              {/* Free Valuation Promo Box */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Selling Your Property?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Request a free professional Comparative Market Analysis (CMA) report tailored to your neighborhood.
                </p>
                <button
                  onClick={() => setIsValuationOpen(true)}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10"
                >
                  Start Home Valuation
                </button>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10">
              <h3 className="text-2xl font-bold text-white mb-2">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6">Fill out the form below and our team will get back to you within 2 hours.</p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you <span className="text-amber-400 font-bold">{name}</span>. Eleanor Vance will review your message and contact you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Purpose</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="schedule-tour">Schedule Property Tour</option>
                        <option value="home-valuation">List / Sell Property</option>
                        <option value="ask-question">Investment Advice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your property requirements, target timeline, or questions..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Direct Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
