'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import GlobalCTA from './GlobalCTA';

export default function Footer({ hideCTA = false }: { hideCTA?: boolean }) {
  const { settings } = useAdmin();

  return (
    <>
      {!hideCTA && <GlobalCTA />}
      <footer className="w-full bg-[#222629] text-gray-400 pt-20 pb-16 border-t border-white/10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 4-Column Grid matching Figma pixel-for-pixel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-20">
          {/* Column 1: Brand Info & Socials (4 Cols) */}
          <div className="md:col-span-4 lg:col-span-4 space-y-6">
            <h3 className="font-heading-bricolage text-white tracking-tight text-[24px] font-semibold leading-none">
              {settings?.siteTitle || 'Amir Knows Phuket'}
            </h3>
            <p className="font-desc-mona text-[#B3B3B3] leading-[1.55] pr-4 text-[16px] font-normal">
              {settings?.footerDescription || 'Independent property investment advice for foreigners buying in Phuket and Thailand.'}
            </p>
            {/* Social icons: X, LinkedIn, WhatsApp */}
            <div className="flex items-center space-x-3 pt-2">
              {/* X / Twitter */}
              <a
                href={settings?.socialLinks?.twitter || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[16px] border border-white/40 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[16px] border border-white/40 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={settings?.buttonLinks?.whatsappUrl || 'https://wa.me/8801875189361'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[16px] border border-white/40 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.2.3-.778.982-.954 1.181-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.613.136-.134.301-.351.452-.526.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.243-.589-.49-.509-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.914 1.229 3.115.15.201 2.124 3.243 5.145 4.548.718.311 1.28.497 1.718.636.721.23 1.377.197 1.896.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.201-.577-.351z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Insights (3 Cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Insights
            </h4>
            <ul className="space-y-4 font-desc-mona text-[16px] font-normal text-[#B3B3B3]">
              <li><span className="hover:text-white transition-colors cursor-default">Market Insights</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Buyer Guides</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Area Guides</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Ownership & Legal</span></li>
            </ul>
          </div>

          {/* Column 3: Site (2 Cols) */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Site
            </h4>
            <ul className="space-y-4 font-desc-mona text-[16px] font-normal text-[#B3B3B3]">
              <li><span className="hover:text-white transition-colors cursor-default">The Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Success Stories</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Listings</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">About</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Work With Me</span></li>
            </ul>
          </div>

          {/* Column 4: Contact (3 Cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-desc-mona text-[16px] font-normal text-[#B3B3B3]">
              <li><a href={`tel:${settings?.contactPhone || '+8801875189361'}`} className="hover:text-white transition-colors">{settings?.contactPhone || '+880 1875 189 361'}</a></li>
              <li><a href={settings?.buttonLinks?.whatsappUrl || 'https://wa.me/8801875189361'} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href={`mailto:${settings?.contactEmail || 'amir@amirknowsphuket.com'}`} className="hover:text-white transition-colors">{settings?.contactEmail || 'amir@amirknowsphuket.com'}</a></li>
              <li className="pt-1"><span>Address: {settings?.officeAddress || 'Laguna Phuket, Cherngtalay, Thailand'}</span></li>
            </ul>
          </div>
        </div>

        {/* Middle Banner: Giant Logo & Text Image Asset matching Figma */}
        <div className="pt-12 pb-16 border-t border-white/10 flex items-center justify-center text-center px-2 sm:px-4">
          <img
            src="/images/footer-banner-asset.png"
            alt="Amir Knows Phuket - Phuket Property Investment"
            className="w-full max-w-5xl lg:max-w-6xl h-auto object-contain mx-auto select-none"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 text-center font-desc-mona text-[16px] text-[#B3B3B3] font-normal leading-none">
          <p>
            {settings?.copyrightText || `© ${new Date().getFullYear()} Amir Ahmed Faisal · Phuket Real Estate Investment Insights`} &nbsp;|&nbsp; <Link href="#" className="hover:text-white transition-colors font-medium">Privacy</Link> · <Link href="#" className="hover:text-white transition-colors font-medium">Terms</Link> · <Link href="/admin" className="hover:text-[#5870F7] transition-colors font-semibold text-white">Admin Portal</Link>
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
