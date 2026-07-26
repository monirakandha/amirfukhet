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

  const navLinks = [
    { name: 'Insights', path: '/blog' },
    { name: 'The Guide', path: '/guide' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Listings', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Work With Me', path: '/contact' },
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
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow-xs">
                <defs>
                  <linearGradient id="figmaBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#4C70FF" />
                  </linearGradient>
                </defs>
                <path
                  d="M 12 90 C 8 60, 22 24, 84 8 C 62 28, 64 56, 76 90 C 65 90, 52 90, 42 90 C 52 68, 59 48, 64 26 C 44 42, 28 66, 12 90 Z"
                  fill="url(#figmaBlueGrad)"
                />
                <path
                  d="M 24 70 Q 48 64 68 76 Q 52 82 28 80 Z"
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
                    className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#4c70ff] font-semibold'
                        : 'text-gray-800 hover:text-[#4c70ff]'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4c70ff]" />}
                    {link.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white font-semibold border-b-2 border-[#4c70ff] pb-0.5'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Social Circle Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isLightNav
                  ? 'border border-blue-100 text-[#4c70ff] hover:bg-blue-50'
                  : 'border border-white/70 hover:border-white hover:bg-white/10 text-white'
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
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isLightNav
                  ? 'border border-blue-100 text-[#4c70ff] hover:bg-blue-50'
                  : 'border border-white/70 hover:border-white hover:bg-white/10 text-white'
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
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
              className="block text-base font-medium py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
