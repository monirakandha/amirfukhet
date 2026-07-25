'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { Bed, Bath, Square, MapPin, Eye, Calendar, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onQuickInquire?: (property: Property) => void;
}

export default function PropertyCard({ property, onQuickInquire }: PropertyCardProps) {
  const statusColors = {
    'for-sale': 'bg-emerald-500/90 text-white border-emerald-400/40',
    'for-rent': 'bg-blue-500/90 text-white border-blue-400/40',
    pending: 'bg-amber-500/90 text-slate-950 border-amber-400/40',
    sold: 'bg-rose-500/90 text-white border-rose-400/40',
  };

  const statusText = {
    'for-sale': 'For Sale',
    'for-rent': 'For Rent',
    pending: 'Pending Contract',
    sold: 'Recently Sold',
  };

  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-950">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
              statusColors[property.status]
            }`}
          >
            {statusText[property.status]}
          </span>

          {property.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md shadow-amber-500/20">
              <Sparkles className="w-3 h-3 fill-slate-950" /> Featured
            </span>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-2xl font-black text-white tracking-tight drop-shadow-md">
            {property.formattedPrice}
          </div>
          <span className="text-xs text-amber-300 font-medium">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <Link href={`/properties/${property.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              {property.location.address}, {property.location.city}, {property.location.state}
            </span>
          </p>

          <p className="text-xs text-slate-400 line-clamp-2 mt-3 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Spec Icons */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs text-slate-300">
          <div className="flex flex-col items-center bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <Bed className="w-4 h-4 text-amber-400 mb-1" />
            <span className="font-bold text-white">{property.features.beds} Beds</span>
          </div>
          <div className="flex flex-col items-center bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <Bath className="w-4 h-4 text-amber-400 mb-1" />
            <span className="font-bold text-white">{property.features.baths} Baths</span>
          </div>
          <div className="flex flex-col items-center bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <Square className="w-4 h-4 text-amber-400 mb-1" />
            <span className="font-bold text-white">{property.features.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" /> View Details
          </Link>

          {onQuickInquire && (
            <button
              onClick={() => onQuickInquire(property)}
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/10"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
