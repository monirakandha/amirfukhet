'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { SuccessStory } from '@/types';
import { fetchSuccessStoryBySlug } from '@/services/api';
import { ArrowLeft, Loader2, FileText } from 'lucide-react';

export default function SuccessStoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  useEffect(() => {
    async function load() {
      if (slug) {
        setLoading(true);
        const data = await fetchSuccessStoryBySlug(slug);
        setStory(data);
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#5870F7] animate-spin" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
        <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center pt-32">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-semibold font-heading-bricolage text-[#020202]">Case Study Not Found</h1>
          <Link href="/success-stories" className="mt-6 px-6 py-3 bg-[#5870F7] text-white hover:bg-blue-600 font-desc-mona font-semibold rounded-full text-sm transition-colors">
            Return to Success Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const steps = [
    { num: '01', title: 'Define budget, area and goal (lifestyle vs yield)', body: story.stepBudget },
    { num: '02', title: 'The challenge', body: story.stepChallenge },
    { num: '03', title: "Amir's approach", body: story.stepApproach },
    { num: '04', title: 'Research & guidance', body: story.stepResearch },
    { num: '05', title: 'The outcome', body: story.stepOutcome },
  ].filter((s) => s.body);

  const metrics = story.metrics && story.metrics.length > 0 ? story.metrics : [];
  const gridColsClass = metrics.length === 3
    ? 'md:grid-cols-3'
    : metrics.length === 2
    ? 'md:grid-cols-2'
    : 'md:grid-cols-1';

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Main Container */}
      <main className="flex-grow pt-32 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-[#5870F7] hover:text-blue-600 font-desc-mona text-[15px] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Success Stories</span>
            </Link>
          </div>

          {/* Pill Badge */}
          <div className="mb-6 flex">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFE3EB] font-desc-mona text-[13px] font-medium text-[#5870F7] leading-none shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
              {story.isFeatured ? 'Featured case study' : 'Case study'}
            </div>
          </div>

          {/* Headline */}
          <h1
            className="font-heading-bricolage text-[36px] sm:text-[46px] font-semibold text-[#020202] leading-[1.15] tracking-[-0.015em] mb-10"
            style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
          >
            {story.title}
          </h1>

          {/* Hero Image */}
          {story.image && (
            <div className="w-full rounded-[24px] overflow-hidden mb-12 shadow-xs border border-gray-100">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-72 sm:h-[420px] object-cover"
              />
            </div>
          )}

          {/* Steps (01 - 05) */}
          {steps.length > 0 && (
            <div className="space-y-10 mb-12">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  {/* Step Number Circle */}
                  <div className="shrink-0 w-8 h-8 rounded-full border border-[#D6E0FF] bg-[#EEF1FF] flex items-center justify-center font-desc-mona text-[13px] font-bold text-[#5870F7] leading-none mt-1">
                    {step.num}
                  </div>
                  {/* Step Content */}
                  <div className="space-y-2 flex-1">
                    <h3
                      className="font-heading-bricolage text-[18px] sm:text-[20px] font-semibold text-[#111827] leading-tight tracking-[-0.01em]"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback Case Study Content (If no steps exist) */}
          {steps.length === 0 && story.story && (
            <div className="space-y-4 mb-12">
              <h2
                className="font-heading-bricolage text-[20px] sm:text-[24px] font-semibold text-[#020202] leading-tight tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                The Case Study
              </h2>
              <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6]">
                {story.story}
              </p>
            </div>
          )}

          {/* Metrics Bar */}
          {metrics.length > 0 && (
            <div className="rounded-2xl border border-[#D4DEFF] bg-[#EEF1FF] p-6 sm:p-8 mb-12 shadow-2xs">
              <div className={`grid grid-cols-1 ${gridColsClass} gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4DEFF]`}>
                {metrics.map((m) => (
                  <div key={m.label} className="flex flex-col items-center justify-center text-center px-4 py-2 md:py-0">
                    <div
                      className="font-heading-bricolage text-[28px] sm:text-[34px] font-semibold text-[#5870F7] leading-none tracking-[-0.02em] mb-2"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      {m.value}
                    </div>
                    <p className="font-desc-mona text-[13px] sm:text-[14px] font-medium text-[#4B5563] leading-tight">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways (07) */}
          {story.stepKeyTakeaways && (
            <div className="flex gap-5 items-start mb-12 pt-4">
              <div className="shrink-0 w-8 h-8 rounded-full border border-[#D6E0FF] bg-[#EEF1FF] flex items-center justify-center font-desc-mona text-[13px] font-bold text-[#5870F7] leading-none mt-1">
                07
              </div>
              <div className="space-y-2 flex-1">
                <h3
                  className="font-heading-bricolage text-[18px] sm:text-[20px] font-semibold text-[#111827] leading-tight tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                >
                  Key takeaways
                </h3>
                <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6]">
                  {story.stepKeyTakeaways}
                </p>
              </div>
            </div>
          )}

          {/* Testimonial Quote */}
          {story.testimonial && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100/80 italic font-desc-mona text-[15px] sm:text-[16px] text-gray-700 relative mb-12 shadow-3xs">
              <span className="text-4xl text-[#5870F7] font-serif absolute top-3 left-4 select-none opacity-20">“</span>
              <p className="pl-6 relative z-10 font-normal leading-relaxed">{story.testimonial}</p>
              {(story.clientName || story.clientRole) && (
                <div className="mt-4 pl-6 not-italic flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
                  <span className="font-semibold text-[13px] sm:text-[14px] text-gray-900">{story.clientName}</span>
                  {story.clientRole && (
                    <span className="text-[13px] sm:text-[14px] text-gray-500">· {story.clientRole}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CTA Block (Premium dark WhatsApp style) */}
          <div className="rounded-[24px] bg-[#1E1F22] p-1 shadow-lg max-w-2xl mx-auto border border-gray-100/5">
            <div className="rounded-[20px] border border-white/5 bg-[#252629] p-8 sm:p-12 text-center flex flex-col items-center space-y-5">
              <h3
                className="font-heading-bricolage text-[22px] sm:text-[26px] font-semibold text-white leading-tight tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                Thinking about your own purchase?
              </h3>
              <p className="font-desc-mona text-[14px] sm:text-[15px] font-normal text-[#9CA3AF] leading-[1.5] max-w-[360px] mx-auto">
                Message Amir to talk through your situation — honestly, no pressure.
              </p>
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[14px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Contact Amir on WhatsApp</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
