'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property } from '@/types';

function PropertyListContent() {
  const [areaFilter, setAreaFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [tenureFilter, setTenureFilter] = useState('all');

  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<Property | null>(null);

  // Hand-picked properties matching exact Figma mockup
  const propertyList = [
    {
      id: 'prop-1',
      title: '2-Bed Pool Villa, Laguna-side',
      location: 'Thailand ,Bang Tao',
      beds: 2,
      baths: 2,
      sqm: 180,
      tenure: 'Leasehold',
      originalPrice: '฿18.5M',
      price: '฿18.5M',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'prop-2',
      title: 'Sea-View Condo, Millionaire’s Mile',
      location: 'Thailand ,Kamala',
      beds: 1,
      baths: 1,
      sqm: 72,
      tenure: 'Freehold',
      originalPrice: '฿18.5M',
      price: '฿12.9M',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'prop-3',
      title: '3-Bed Family Villa, quiet south',
      location: 'Thailand ,Rawai',
      beds: 3,
      baths: 3,
      sqm: 220,
      tenure: 'Leasehold',
      originalPrice: '฿18.5M',
      price: '฿9.8M',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'prop-4',
      title: 'Beachfront Modern Villa, Surin Bay',
      location: 'Thailand ,Surin',
      beds: 4,
      baths: 4,
      sqm: 340,
      tenure: 'Freehold',
      originalPrice: '฿45.0M',
      price: '฿38.5M',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'prop-5',
      title: 'Golf Course Estate Villa, Layan',
      location: 'Thailand ,Layan',
      beds: 5,
      baths: 5,
      sqm: 520,
      tenure: 'Freehold',
      originalPrice: '฿68.0M',
      price: '฿59.0M',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'prop-6',
      title: 'Luxury Sunset Penthouse, Bang Tao',
      location: 'Thailand ,Bang Tao',
      beds: 3,
      baths: 3,
      sqm: 240,
      tenure: 'Freehold',
      originalPrice: '฿28.0M',
      price: '฿24.5M',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const filteredProperties = propertyList.filter((item) => {
    if (areaFilter !== 'all' && !item.location.toLowerCase().includes(areaFilter.toLowerCase())) return false;
    if (tenureFilter !== 'all' && item.tenure !== tenureFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        {/* Geometric grid background pattern */}
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          {/* Selected Listings Pill Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
            Selected Listings
          </div>

          {/* Main Headline */}
          <h1 className="hero-heading max-w-4xl mx-auto">
            A few hand-picked properties
          </h1>

          {/* Subtitle / Description */}
          <p className="hero-description max-w-2xl mx-auto pt-1">
            Not a portal – a small, curated selection. Every property here is one Amir would be comfortable recommending.
          </p>
        </div>
      </section>

      {/* Main Catalog & Filter Section matching Figma mockup */}
      <section className="py-16 flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Filter Bar matching Figma layout */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug max-w-xs">
              Filters & search ship with portal expansion
            </h2>

            {/* 3 Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Select Areas */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800 block">
                  Select Areas
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="bg-[#f8fafc] border border-gray-200 rounded-full px-5 py-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-[#4c70ff] transition-all min-w-[160px]"
                >
                  <option value="all">All areas</option>
                  <option value="Bang Tao">Bang Tao</option>
                  <option value="Kamala">Kamala</option>
                  <option value="Rawai">Rawai</option>
                  <option value="Surin">Surin</option>
                  <option value="Layan">Layan</option>
                </select>
              </div>

              {/* Select Price */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800 block">
                  Select Price
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="bg-[#f8fafc] border border-gray-200 rounded-full px-5 py-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-[#4c70ff] transition-all min-w-[160px]"
                >
                  <option value="all">Any price</option>
                  <option value="under-10m">Under ฿10M</option>
                  <option value="10m-20m">฿10M - ฿20M</option>
                  <option value="20m-50m">฿20M - ฿50M</option>
                  <option value="50m-plus">฿50M+</option>
                </select>
              </div>

              {/* Freehold / Leasehold */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800 block">
                  Freehold / Leasehold
                </label>
                <select
                  value={tenureFilter}
                  onChange={(e) => setTenureFilter(e.target.value)}
                  className="bg-[#f8fafc] border border-gray-200 rounded-full px-5 py-2.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-[#4c70ff] transition-all min-w-[160px]"
                >
                  <option value="all">Select</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3-Column Property Grid matching Figma mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-3xl border border-gray-200/80 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <span className="text-rose-500 text-sm">📍</span>
                      {prop.location}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-snug group-hover:text-[#4c70ff] transition-colors">
                      {prop.title}
                    </h3>
                  </div>

                  {/* 4 Specs Divider Row */}
                  <div className="grid grid-cols-4 text-center border-t border-b border-gray-100 py-3 text-xs text-gray-500 font-medium my-2">
                    <div>
                      <div className="text-gray-400 mb-0.5">🛏️</div>
                      {prop.beds} bed
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">🛁</div>
                      {prop.baths} bath
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">📐</div>
                      {prop.sqm} m²
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">🏢</div>
                      {prop.tenure}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="line-through text-gray-400 text-xs font-normal">
                        {prop.originalPrice}
                      </span>
                      <span className="text-[#4c70ff] font-bold text-lg sm:text-xl">
                        {prop.price}
                      </span>
                    </div>

                    <Link
                      href={`/properties/${prop.id}`}
                      className="text-[#4c70ff] font-semibold text-xs flex items-center gap-1 hover:underline"
                    >
                      View Details
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
      <ScheduleViewingModal
        property={selectedViewingProperty}
        isOpen={!!selectedViewingProperty}
        onClose={() => setSelectedViewingProperty(null)}
      />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-gray-900 p-20 text-center">Loading properties...</div>}>
      <PropertyListContent />
    </Suspense>
  );
}
