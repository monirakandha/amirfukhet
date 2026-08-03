'use client';

import React from 'react';

interface SidebarCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function SidebarCTA({
  title = 'Get the PDF version',
  description = "A clean offline copy + Amir's market updates.",
  buttonText = 'Send me the guide',
  onSubmit,
}: SidebarCTAProps) {
  return (
    <div className="rounded-[32px] bg-[#1C2026] p-3 sm:p-4 shadow-xl w-full">
      <div className="rounded-[24px] bg-[#FFFFFF0D] border border-[#FFFFFF0D] p-6 w-full flex flex-col">
        <h4 className="font-bold text-white text-[20px] leading-tight mb-2 tracking-tight">
          {title}
        </h4>
        <p className="text-[14px] text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>
        <form 
          className="space-y-3"
          onSubmit={onSubmit || ((e) => { e.preventDefault(); alert('Subscribed!'); })}
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            className="w-full bg-transparent border border-[#44464A] rounded-full px-5 py-3 text-[14px] text-white placeholder-gray-400 focus:outline-none focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] transition-all" 
          />
          <button 
            type="submit" 
            className="w-full bg-[#5870F7] hover:bg-blue-600 text-white rounded-full py-3 px-5 text-[15px] font-medium transition-all flex items-center justify-center gap-2"
          >
            {buttonText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
