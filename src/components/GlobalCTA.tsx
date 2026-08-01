'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalCTA() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-16 pt-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Bottom Dark CTA Card matching Figma mockup */}
        <div className="bg-[#1c2024] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 shadow-2xl w-full">
          <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-[20px] py-12 sm:py-16 px-6 sm:px-12 text-center text-white space-y-6 sm:space-y-8 w-full">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to talk through your purchase?
            </h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              Message Amir directly. Honest, advisory, no pressure.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
              >
                Contact Amir on WhatsApp
              </a>

              <Link
                href="/guide"
                className="group px-6 py-3 bg-white hover:bg-[#5870F7] text-[#020202] hover:text-white font-semibold text-sm rounded-full transition-all shadow-md"
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
