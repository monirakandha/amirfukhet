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
          <div className="md:col-span-4 lg:col-span-4 space-y-6 min-w-0">
            <h3 className="font-heading-bricolage text-white tracking-tight text-[24px] font-semibold leading-none">
              {settings?.siteTitle || 'Amir Knows Phuket'}
            </h3>
            {settings?.footerDescription ? (
              <div 
                className="font-desc-mona text-[#B3B3B3] leading-[1.55] pr-4 text-[16px] font-normal prose prose-invert prose-p:my-1 prose-p:first:mt-0 prose-p:last:mb-0 max-w-none break-words"
                dangerouslySetInnerHTML={{ __html: settings.footerDescription.replace(/&nbsp;/g, ' ') }}
              />
            ) : (
              <p className="font-desc-mona text-[#B3B3B3] leading-[1.55] pr-4 text-[16px] font-normal">
                Independent property investment advice for foreigners buying in Phuket and Thailand.
              </p>
            )}
            {/* Social icons: X, LinkedIn, WhatsApp */}
            <div className="flex items-center space-x-3 pt-2">
              {/* X / Twitter */}
              <a
                href={settings?.socialLinks?.twitter || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[42px] h-[42px] rounded-full border border-white hover:bg-white/10 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[42px] h-[42px] rounded-full border border-white hover:bg-white/10 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={settings?.buttonLinks?.whatsappUrl || 'https://wa.me/8801875189361'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[42px] h-[42px] rounded-full border border-white hover:bg-white/10 flex items-center justify-center text-white transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Insights (3 Cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4 min-w-0">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Insights
            </h4>
            <ul className="space-y-4 font-desc-mona text-[16px] font-normal text-[#B3B3B3]">
              <li><Link href="/blog?category=market-insights" className="hover:text-white transition-colors">Market Insights</Link></li>
              <li><Link href="/blog?category=buyer-guides" className="hover:text-white transition-colors">Buyer Guides</Link></li>
              <li><Link href="/blog?category=area-guides" className="hover:text-white transition-colors">Area Guides</Link></li>
              <li><Link href="/blog?category=ownership-legal" className="hover:text-white transition-colors">Ownership & Legal</Link></li>
            </ul>
          </div>

          {/* Column 3: Site (2 Cols) */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4 min-w-0">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Site
            </h4>
            <ul className="space-y-4 font-desc-mona text-[16px] font-normal text-[#B3B3B3]">
              <li><Link href="/guide" className="hover:text-white transition-colors">The Guide</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Listings</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/work-with-me" className="hover:text-white transition-colors">Work With Me</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact (3 Cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4 min-w-0">
            <h4 className="font-heading-bricolage text-white text-[24px] font-semibold leading-none mb-6">
              Work With Me
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
