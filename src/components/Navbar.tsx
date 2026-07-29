'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenValuationModal?: () => void;
}

export default function Navbar({ onOpenValuationModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; path: string }[] = [
    // Disabled page links for now
    // { name: 'Insights', path: '/blog' },
    // { name: 'The Guide', path: '/guide' },
    // { name: 'Success Stories', path: '/success-stories' },
    // { name: 'Listings', path: '/properties' },
    // { name: 'About', path: '/about' },
    // { name: 'Work With Me', path: '/contact' },
  ];

  // Colors based on home vs inner page & scroll state
  const isDarkNav = isHomePage && isScrolled;
  const isTransparentNav = isHomePage && !isScrolled;
  const isLightNav = !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkNav
          ? 'bg-black border-b border-white/10 py-3.5 shadow-2xl'
          : isTransparentNav
          ? 'bg-transparent py-5'
          : 'bg-white border-b border-gray-100 py-4 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-sm group-hover:scale-105 transition-transform">
                <defs>
                  <linearGradient id="figmaBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#5870F7" />
                  </linearGradient>
                </defs>
                {/* Unified stylized A architectural emblem */}
                <path
                  d="M 12 92 C 16 60, 34 22, 82 4 L 90 92 L 74 92 L 66 42 C 54 54, 40 68, 32 92 Z M 26 72 L 66 72 L 68 84 L 22 84 Z"
                  fill="url(#figmaBlueGrad)"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-sm font-extrabold tracking-wider uppercase leading-none ${isLightNav ? 'text-gray-900' : 'text-white'}`}>
                AMIR KNOWS
              </span>
              <span className={`text-xs font-extrabold tracking-[0.18em] uppercase mt-0.5 leading-none ${isLightNav ? 'text-gray-900' : 'text-white'}`}>
                PHUKET
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link, idx) => {
              const isActive =
                pathname === link.path ||
                (link.path === '/guide' && (pathname === '/guide' || pathname === '/the-guide'));

              if (isLightNav) {
                return (
                  <Link
                    key={idx}
                    href={link.path}
                    className={`font-desc-mona text-[16px] font-normal leading-none tracking-normal transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#5870F7]'
                        : 'text-[#020202] hover:text-[#5870F7]'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />}
                    {link.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`font-desc-mona text-[16px] font-normal leading-none tracking-normal transition-colors text-center ${
                    isActive
                      ? 'text-white border-b-2 border-white pb-1'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Social Circle Buttons matching exact squircle glass buttons from screenshot */}
          <div className="hidden md:flex items-center space-x-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-[16px] flex items-center justify-center transition-all shadow-xs ${
                isLightNav
                  ? 'border border-[#5870F7]/30 bg-[#5870F7]/10 text-[#5870F7] hover:bg-[#5870F7]/20'
                  : 'border border-white/40 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md'
              }`}
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.2.3-.778.982-.954 1.181-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.613.136-.134.301-.351.452-.526.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.243-.589-.49-.509-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.914 1.229 3.115.15.201 2.124 3.243 5.145 4.548.718.311 1.28.497 1.718.636.721.23 1.377.197 1.896.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.201-.577-.351z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-[16px] flex items-center justify-center transition-all shadow-xs ${
                isLightNav
                  ? 'border border-[#5870F7]/30 bg-[#5870F7]/10 text-[#5870F7] hover:bg-[#5870F7]/20'
                  : 'border border-white/40 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md'
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus:outline-none ${isLightNav ? 'text-gray-900' : 'text-white'}`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 py-5 space-y-3 shadow-2xl ${
            isLightNav
              ? 'bg-white border-gray-100 text-gray-900'
              : 'bg-black/95 border-white/10 text-white'
          }`}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-desc-mona text-[16px] font-normal leading-none py-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
