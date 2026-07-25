'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { SuccessStory } from '@/types';
import { fetchSuccessStories } from '@/services/api';
import { Star, Award, TrendingUp, CheckCircle2, Quote, ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchSuccessStories();
      setStories(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Proven Results & Trust
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Client Success Stories & Sold Case Studies
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Real stories from buyers, sellers, and luxury investors who achieved record outcomes with our team.
          </p>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-12 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">$185M+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Total Sold Volume</div>
            </div>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">99.4%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">List Price Ratio</div>
            </div>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">14 Days</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Avg Days On Market</div>
            </div>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-2xl overflow-hidden border border-slate-800">
                <img src={story.image} alt={story.propertyTitle} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                  {story.location}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Quote className="w-6 h-6" />
                  <span className="text-xs font-bold uppercase tracking-wider">{story.clientRole} Case Study</span>
                </div>

                <h2 className="text-2xl font-bold text-white">{story.propertyTitle}</h2>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  {story.testimonial}
                </p>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {story.story}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {story.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{story.clientName}</h4>
                    <p className="text-xs text-slate-500">Closed in {story.dateClosed}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Final Closing Price</span>
                    <span className="text-xl font-black text-amber-400">${story.soldPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
