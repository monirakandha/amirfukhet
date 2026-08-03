'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalCTA() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-16 pt-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-[24px] bg-[#1E1F22] p-1 shadow-lg w-full border border-gray-100/5">
          <div className="rounded-[20px] border border-white/5 bg-[#252629] p-8 sm:p-12 text-center flex flex-col items-center space-y-5">
            <h2
              className="font-heading-bricolage text-[22px] sm:text-[26px] font-semibold text-white leading-tight tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Thinking about your own purchase?
            </h2>
            <p className="font-desc-mona text-[14px] sm:text-[15px] font-normal text-[#9CA3AF] leading-[1.5] max-w-[360px] mx-auto">
              Message Amir to talk through your situation — honestly, no pressure.
            </p>
            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[14px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)]"
            >
              <span>Contact Amir on WhatsApp</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
