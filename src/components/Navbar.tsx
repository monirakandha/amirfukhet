'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Phone, Menu, X, Award, Home, FileText, Star, Mail } from 'lucide-react';

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
    { name: 'Home', path: '/', icon: Home },
    { name: 'Properties', path: '/properties', icon: Building2 },
    { name: 'Success Stories', path: '/success-stories', icon: Star },
    { name: 'Market Blog', path: '/blog', icon: FileText },
    { name: 'Contact Us', path: '/contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-slate-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                HAVEN<span className="text-amber-400 font-light">REALTY</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase block text-slate-400 -mt-1 font-medium">
                LUXURY REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15553829102"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-slate-900/50"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">+1 (555) 382-9102</span>
            </a>

            {onOpenValuationModal && (
              <button
                onClick={onOpenValuationModal}
                className="relative group overflow-hidden rounded-full p-[1px] font-semibold text-xs tracking-wide"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 rounded-full animate-gradient-x"></span>
                <span className="relative block px-4 py-2.5 rounded-full bg-slate-950 text-amber-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Free Home Valuation
                </span>
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
        <div className="md:hidden mt-3 px-4 pt-2 pb-6 bg-slate-950 border-b border-slate-800 shadow-2xl">
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
