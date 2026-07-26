'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#181a1d] text-gray-400 pt-16 pb-8 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Amir Knows Phuket</h3>
            <p className="text-sm text-gray-400 leading-relaxed pr-2">
              Independent property investment advice for foreigners buying in Phuket and Thailand.
            </p>
            {/* Social icons: X, LinkedIn, WhatsApp */}
            <div className="flex items-center space-x-3 pt-2">
              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.2.3-.778.982-.954 1.181-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.613.136-.134.301-.351.452-.526.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.243-.589-.49-.509-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.914 1.229 3.115.15.201 2.124 3.243 5.145 4.548.718.311 1.28.497 1.718.636.721.23 1.377.197 1.896.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.201-.577-.351z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Insights */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Insights</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Market Insights</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Buyer Guides</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Area Guides</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Ownership & Legal</Link></li>
            </ul>
          </div>

          {/* Column 3: Site */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Site</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">The Guide</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Listings</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Work With Me</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="tel:+8801875189361" className="hover:text-white transition-colors">+880 1875 189 361</a></li>
              <li><a href="https://wa.me/8801875189361" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="mailto:amir@amirknowsphuket.com" className="hover:text-white transition-colors">amir@amirknowsphuket.com</a></li>
              <li className="pt-1"><span>Address: Enter Your Address</span></li>
            </ul>
          </div>
        </div>

        {/* Middle Banner: Giant Logo & Text Image Asset matching Figma */}
        <div className="pt-10 pb-12 border-t border-white/10 flex items-center justify-center text-center px-4">
          <img
            src="/images/footer-banner-asset.png"
            alt="Amir Knows Phuket - Phuket Property Investment"
            className="w-full max-w-4xl h-auto object-contain mx-auto select-none"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">Amir Ahmed Faisal</strong> · Phuket Real Estate Investment Insights &nbsp;|&nbsp; <Link href="#" className="hover:text-white transition-colors">Privacy</Link> · <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </p>
        </div>
      </div>
      {/* Bottom Blue Line Accent matching Figma Image 3 */}
      <div className="w-full h-1 bg-[#4c70ff] mt-6" />
    </footer>
  );
}
