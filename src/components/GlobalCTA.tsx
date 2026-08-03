'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalCTA() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-16 pt-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Bottom Dark CTA Card matching Figma mockup */}
        <div className="w-full lg:w-[60%] ml-auto bg-[#1C2026] rounded-[28px] sm:rounded-[32px] p-2.5 sm:p-3 shadow-2xl">
          <div className="bg-[#2B2D33]/60 border border-white/10 rounded-[20px] py-12 sm:py-16 px-6 sm:px-12 text-center text-white space-y-6 sm:space-y-7 w-full">
            <h3
              className="text-[28px] sm:text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight font-heading-bricolage"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Ready to talk through your purchase?
            </h3>
            <p className="text-[15px] text-gray-300 max-w-md mx-auto leading-relaxed font-desc-mona">
              Message Amir directly. Honest, advisory, no pressure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#5870F7] hover:bg-blue-600 text-white font-medium text-[15px] rounded-full transition-all font-desc-mona"
              >
                Contact Amir on WhatsApp
              </a>

              <Link
                href="/guide"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 text-[#1C2026] font-medium text-[15px] rounded-full transition-all font-desc-mona"
              >
                Read the free guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
