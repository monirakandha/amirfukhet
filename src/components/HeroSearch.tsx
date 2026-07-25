'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, DollarSign, SlidersHorizontal } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'for-sale' | 'for-rent'>('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (activeTab !== 'all') queryParams.set('status', activeTab);
    if (searchLocation) queryParams.set('search', searchLocation);
    if (propertyType !== 'all') queryParams.set('propertyType', propertyType);
    if (maxPrice) queryParams.set('maxPrice', maxPrice);

    router.push(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl shadow-slate-950/80">
      {/* Tabs: All / Buy / Rent */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          All Listings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('for-sale')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'for-sale'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          Buy Property
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('for-rent')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'for-rent'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          Rent Property
        </button>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Location / Keyword Input */}
        <div className="lg:col-span-5 relative">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 focus-within:border-amber-500 transition-colors">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="City, ZIP, neighborhood or address..."
              className="bg-transparent text-white text-sm focus:outline-none w-full placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="lg:col-span-3">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 focus-within:border-amber-500 transition-colors">
            <Building className="w-5 h-5 text-amber-400 shrink-0 mr-2" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none w-full cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Types</option>
              <option value="Villa" className="bg-slate-900 text-white">Luxury Villa</option>
              <option value="Penthouse" className="bg-slate-900 text-white">Penthouse</option>
              <option value="Single Family" className="bg-slate-900 text-white">Single Family</option>
              <option value="Townhouse" className="bg-slate-900 text-white">Townhouse</option>
            </select>
          </div>
        </div>

        {/* Max Price */}
        <div className="lg:col-span-2">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 focus-within:border-amber-500 transition-colors">
            <DollarSign className="w-5 h-5 text-amber-400 shrink-0 mr-1" />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="bg-transparent text-white text-sm focus:outline-none w-full placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 stroke-[3]" /> Search
          </button>
        </div>
      </form>
    </div>
  );
}
