'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Code2, ArrowRight, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                <Building2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                HAVEN<span className="text-amber-400 font-light">REALTY</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Representing premier luxury estates, waterfront villas, and prime penthouses. Delivering exceptional market positioning, bespoke marketing strategies, and maximum return for buyers and sellers.
            </p>

            {/* Developer Node.js Badge */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-500/30 flex items-start gap-3 text-xs">
              <Code2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300 block mb-0.5">Node.js Backend Ready</span>
                <p className="text-slate-400">
                  Connect your Express/Node.js API by setting <code className="text-amber-200 bg-slate-950 px-1 py-0.5 rounded">NEXT_PUBLIC_API_URL</code> in <code className="text-amber-200 bg-slate-950 px-1 py-0.5 rounded">.env.local</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" /> Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" /> All Properties
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" /> Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" /> Market Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" /> Contact Realtor
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Property Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?type=Villa" className="hover:text-amber-400 transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Penthouse" className="hover:text-amber-400 transition-colors">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Single+Family" className="hover:text-amber-400 transition-colors">
                  Single Family Estates
                </Link>
              </li>
              <li>
                <Link href="/properties?status=for-rent" className="hover:text-amber-400 transition-colors">
                  Exclusive Rentals
                </Link>
              </li>
              <li>
                <Link href="/properties?status=sold" className="hover:text-amber-400 transition-colors">
                  Recently Sold Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Realtor Office
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>450 Rodeo Drive, Suite 800, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+15553829102" className="hover:text-white transition-colors">
                  +1 (555) 382-9102
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@havenrealty.com" className="hover:text-white transition-colors">
                  contact@havenrealty.com
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors" title="Official Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors" title="Social Channels">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors" title="Direct Chat">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PrimeHaven Real Estate Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Fair Housing Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
