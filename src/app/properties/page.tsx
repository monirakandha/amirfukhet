'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import HomeValuationModal from '@/components/HomeValuationModal';
import { Property, PropertyFilterParams } from '@/types';
import { fetchProperties } from '@/services/api';
import { Search, SlidersHorizontal, Building2, RotateCcw } from 'lucide-react';

function PropertyListContent() {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [minBeds, setMinBeds] = useState(searchParams.get('minBeds') || '0');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest' | 'sqft'>('newest');

  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params: PropertyFilterParams = {
        status: status !== 'all' ? status : undefined,
        propertyType: propertyType !== 'all' ? propertyType : undefined,
        search: search || undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minBeds: minBeds !== '0' ? Number(minBeds) : undefined,
        sortBy,
      };

      const data = await fetchProperties(params);
      setProperties(data);
      setLoading(false);
    }
    load();
  }, [status, propertyType, search, maxPrice, minBeds, sortBy]);

  const handleReset = () => {
    setStatus('all');
    setPropertyType('all');
    setSearch('');
    setMaxPrice('');
    setMinBeds('0');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header Banner */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Exclusive Listings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore Property Portfolio
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Browse our luxury villas, high-rise penthouses, single-family estates, and premium rentals.
          </p>
        </div>
      </section>

      {/* Main Catalog & Filter Layout */}
      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" /> Filters
                  </h3>
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* Keyword Search */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Search Location / Keyword</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="City, ZIP, address..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Listing Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Listing Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Villa">Luxury Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Max Price ($)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g. 5000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Min Bedrooms */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Min Bedrooms</label>
                  <select
                    value={minBeds}
                    onChange={(e) => setMinBeds(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="0">Any Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-9 space-y-6">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">
                  Showing <strong className="text-white">{properties.length}</strong> matching properties
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl py-2 px-3 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="sqft">Largest Sq Ft</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="h-96 rounded-2xl bg-slate-900 animate-pulse" />
                  ))}
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                  <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-xl font-bold text-white">No Properties Found</h3>
                  <p className="text-sm text-slate-400">
                    Try adjusting your filters or search keywords to locate active properties.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onQuickInquire={(p) => setSelectedViewingProperty(p)}
                    />
                  ))}
                </div>
              )}
            </div>
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
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white p-20 text-center">Loading properties...</div>}>
      <PropertyListContent />
    </Suspense>
  );
}
