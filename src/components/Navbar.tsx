'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Award, Home, FileText, Star, Mail, MessageCircle, Linkedin, Building2 } from 'lucide-react';

interface NavbarProps {
  onOpenValuationModal?: () => void;
}

export default function Navbar({ onOpenValuationModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Insights', path: '/blog' },
    { name: 'The Guide', path: '/blog' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Listings', path: '/properties' },
    { name: 'About', path: '/contact' },
    { name: 'Work With Me', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-[0_2px_10px_rgba(37,99,235,0.6)]">
                <defs>
                  <linearGradient id="amirLogoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="40%" stopColor="#2563EB" />
                    <stop offset="80%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                {/* Stylized 'A' Arch / Sail */}
                <path
                  d="M 12 90 C 8 60, 22 24, 84 8 C 62 28, 64 56, 76 90 C 65 90, 52 90, 42 90 C 52 68, 59 48, 64 26 C 44 42, 28 66, 12 90 Z"
                  fill="url(#amirLogoGrad)"
                />
                {/* Crossbar */}
                <path
                  d="M 24 70 Q 48 64 68 76 Q 52 82 28 80 Z"
                  fill="url(#amirLogoGrad)"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-wider text-white uppercase leading-none">
                AMIR KNOWS
              </span>
              <span className="text-xs font-black tracking-[0.25em] text-blue-400 uppercase mt-0.5 leading-none">
                PHUKET
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={idx}
                  href={link.path}
                  className={`px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white border-b-2 border-blue-500'
                      : 'text-slate-200 hover:text-white hover:bg-white/5 rounded-lg'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons / Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/66000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/30 hover:border-blue-400 bg-white/10 hover:bg-blue-600/30 flex items-center justify-center text-white hover:text-blue-400 transition-all backdrop-blur-sm"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/30 hover:border-blue-400 bg-white/10 hover:bg-blue-600/30 flex items-center justify-center text-white hover:text-blue-400 transition-all backdrop-blur-sm"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            {onOpenValuationModal && (
              <button
                onClick={onOpenValuationModal}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20"
              >
                <Award className="w-4 h-4" />
                Valuation
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-6 bg-black border-b border-slate-800 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-800 mt-2 flex flex-col gap-3">
              <a
                href="tel:+15553829102"
                className="flex items-center justify-center gap-2 py-3 bg-slate-900 rounded-xl text-sm font-semibold text-slate-200 border border-slate-800"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call Agent: +1 (555) 382-9102
              </a>

              {onOpenValuationModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenValuationModal();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  Get Free Home Valuation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
