'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalCTA() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-16 pt-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] bg-[#1C2026] p-4 sm:p-6 shadow-2xl w-full">
          <div className="rounded-[24px] bg-[#2B2D33] p-10 sm:p-14 w-full flex flex-col items-center">
            
            <div className="text-center space-y-3 mb-10">
              <h2
                className="font-heading-bricolage text-[26px] sm:text-[32px] font-semibold text-white leading-tight tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                Ready to talk through your purchase?
              </h2>
              <p className="font-desc-mona text-[14px] sm:text-[15px] font-medium text-[#9CA3AF] leading-[1.6]">
                Message Amir directly. Honest, advisory, no pressure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-medium text-[15px] text-white transition-all shadow-sm w-full sm:w-auto"
              >
                Contact Amir on WhatsApp
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 font-medium text-[15px] text-gray-900 transition-all shadow-sm w-full sm:w-auto"
              >
                See how I work
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
