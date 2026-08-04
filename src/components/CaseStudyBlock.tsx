'use client';

import React from 'react';
import { SuccessStory } from '@/types';

interface CaseStudyBlockProps {
  story: SuccessStory;
  isFeaturedLabel?: boolean;
}

export default function CaseStudyBlock({ story, isFeaturedLabel = false }: CaseStudyBlockProps) {
  const steps = story.steps && story.steps.length > 0 ? story.steps : [];

  const metrics = story.metrics && story.metrics.length > 0 ? story.metrics : [];

  if (steps.length === 0 && metrics.length === 0) return null;

  return (
    <section className="w-full bg-[#fcfcfd] py-16 sm:py-24 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Pill badge */}
        <div className="mb-5 flex">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] font-desc-mona text-[13px] font-medium text-[#5870F7] leading-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
            {isFeaturedLabel ? 'Featured case study' : 'Case study'}
          </div>
        </div>

        {/* Title */}
        <h2
          className="font-heading-bricolage text-[32px] sm:text-[40px] font-semibold text-[#111827] leading-[1.1] tracking-[-0.02em] mb-8"
          style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
        >
          {story.title}
        </h2>

        {/* Hero Image */}
        {story.image && (
          <div className="w-full rounded-2xl overflow-hidden mb-12 shadow-sm">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        )}

        {/* Steps */}
        {steps.length > 0 && (
          <div className="space-y-8 mb-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 sm:gap-5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#EEF1FF] border border-[#D6E0FF] flex items-center justify-center font-desc-mona text-[13px] font-semibold text-[#5870F7] leading-none mt-0.5">
                  {step.stepNumber || (idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <h3
                    className="font-heading-bricolage text-[17px] font-semibold text-[#111827] leading-tight tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <div 
                    className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.6] prose prose-sm max-w-none prose-p:my-1 prose-p:first:mt-0 prose-p:last:mb-0"
                    dangerouslySetInnerHTML={{ __html: step.body }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metrics Bar */}
        {metrics.length > 0 && (
          <div className={`rounded-xl border border-[#D4DEFF] bg-[#EEF1FF] p-6 grid grid-cols-${metrics.length} divide-x divide-[#D4DEFF] mb-12`}>
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-center justify-center text-center px-4">
                <div
                  className="font-heading-bricolage text-[26px] sm:text-[30px] font-semibold text-[#5870F7] leading-none tracking-[-0.02em] mb-1.5"
                  style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                >
                  {m.value}
                </div>
                <p className="font-desc-mona text-[12px] font-medium text-[#4B5563] leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        )}



        {/* CTA Block (Framed dark style) */}
        <div className="rounded-[24px] bg-[#2A2B2E] p-1.5 shadow-xl max-w-4xl mx-auto">
          <div className="rounded-[20px] border border-white/10 bg-[#313338] p-8 sm:p-12 text-center flex flex-col items-center space-y-4">
            <h3
              className="font-heading-bricolage text-[22px] sm:text-[26px] font-semibold text-white leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Thinking about your own purchase?
            </h3>
            <p className="font-desc-mona text-[14px] sm:text-[15px] font-normal text-[#A1A1AA] leading-[1.5] max-w-[360px] mx-auto mb-2">
              Message Amir to talk through your situation — honestly, no pressure.
            </p>
            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[14px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)]"
            >
              Contact Amir on WhatsApp
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
