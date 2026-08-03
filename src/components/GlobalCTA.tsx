'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalCTA() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-16 pt-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-[32px] bg-[#1C2026] p-4 sm:p-5 shadow-2xl w-full border border-gray-100/5">
          <div className="rounded-[24px] border border-white/10 bg-[#2B2D33] p-10 sm:p-14 text-center flex flex-col items-center space-y-6">
            <h2
              className="font-heading-bricolage text-[28px] sm:text-[32px] font-semibold text-white leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Thinking about your own purchase?
            </h2>
            <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#9CA3AF] leading-[1.6] max-w-[420px] mx-auto">
              Message Amir to talk through your situation — honestly, no pressure.
            </p>
            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[15px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)]"
            >
              <span>Contact Amir on WhatsApp</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
