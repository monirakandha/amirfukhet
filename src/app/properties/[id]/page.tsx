'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MortgageCalculator from '@/components/MortgageCalculator';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import HomeValuationModal from '@/components/HomeValuationModal';
import { Property } from '@/types';
import { fetchPropertyBySlugOrId, submitInquiry } from '@/services/api';
import {
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const idOrSlug = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  // Quick Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    async function load() {
      if (idOrSlug) {
        setLoading(true);
        const data = await fetchPropertyBySlugOrId(idOrSlug);
        setProperty(data);
        setLoading(false);
      }
    }
    load();
  }, [idOrSlug]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    setIsSubmitting(true);

    try {
      await submitInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        type: 'ask-question',
        message: inquiryMsg,
      });
      setInquirySent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading Property Details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <Building2 className="w-16 h-16 text-slate-700 mb-4" />
          <h1 className="text-2xl font-bold">Property Not Found</h1>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            The requested property listing does not exist or has been removed.
          </p>
          <Link href="/properties" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm">
            Back to All Properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Breadcrumb & Title Bar */}
      <section className="pt-28 pb-6 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/properties" className="hover:text-white">Properties</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-amber-400 truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {property.propertyType}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{property.title}</h1>
            </div>

            <div className="text-left md:text-right">
              <div className="text-3xl font-black text-amber-400 tracking-tight">{property.formattedPrice}</div>
              <span className="text-xs text-slate-400 font-medium capitalize">Status: {property.status.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Featured Photo */}
            <div className="lg:col-span-8 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Sidebar */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 h-[380px] sm:h-[480px] overflow-y-auto pr-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-28 lg:h-36 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-amber-400 scale-[0.98]' : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${property.title} preview ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Specs & Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Key Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <Bed className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{property.features.beds}</div>
                  <div className="text-xs text-slate-400">Bedrooms</div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <Bath className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{property.features.baths}</div>
                  <div className="text-xs text-slate-400">Bathrooms</div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <Square className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{property.features.sqft.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Square Feet</div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <Car className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{property.features.garage} Spaces</div>
                  <div className="text-xs text-slate-400">Garage</div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Property Description</h3>
                <div
                  className="text-slate-300 text-sm leading-relaxed whitespace-pre-line [&>p]:inline"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </div>

              {/* Amenities */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mortgage Calculator Widget */}
              <MortgageCalculator initialPrice={property.price} />
            </div>

            {/* Sidebar: Agent & Book Tour Form */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tour CTA Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-center">
                <h3 className="text-lg font-bold text-white">Interested in this estate?</h3>
                <p className="text-xs text-slate-400">
                  Schedule an in-person walkthrough or private virtual tour with Eleanor Vance.
                </p>
                <button
                  onClick={() => setIsViewingModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Private Viewing
                </button>
              </div>

              {/* Agent Bio Card & Inquiry */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-amber-400 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">{property.agent.name}</h4>
                    <p className="text-xs text-amber-400">{property.agent.title}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{property.agent.phone}</p>
                  </div>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Inquiry</h4>

                  {inquirySent ? (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center text-xs text-emerald-400 font-medium">
                      Inquiry received! The realtor will contact you shortly.
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="Your Email"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                      />
                      <textarea
                        rows={3}
                        value={inquiryMsg}
                        onChange={(e) => setInquiryMsg(e.target.value)}
                        placeholder={`Questions about ${property.title}...`}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider border border-slate-700 transition-colors"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message to Realtor'}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
      <ScheduleViewingModal
        property={property}
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
      />
    </div>
  );
}
