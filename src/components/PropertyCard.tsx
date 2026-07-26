'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onQuickInquire?: (property: Property) => void;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const locationLabel = property.locationName || `Thailand ,${property.location.city}`;
  const areaLabel = property.areaSqM ? `${property.areaSqM} m²` : `${property.features.sqft} sqft`;
  const ownershipLabel = property.ownershipType || 'Freehold';

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Top Image */}
      <div className="relative h-60 sm:h-64 w-full bg-gray-100 overflow-hidden rounded-t-2xl">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 px-6">
            <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="truncate">{locationLabel}</span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="text-lg font-bold text-gray-900 leading-snug hover:text-[#4c70ff] transition-colors mt-1.5 px-6 line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* 4 Feature Columns Row */}
          <div className="border-y border-gray-100 py-3.5 my-4 mx-6 grid grid-cols-4 gap-1 text-center items-center">
            {/* Beds */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M5 10v7M19 10v7M3 18h18" />
              </svg>
              <span className="text-[11px] font-medium text-gray-500">{property.features.beds} bed</span>
            </div>

            {/* Baths */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12h16M7 12V8a3 3 0 016 0v4" />
              </svg>
              <span className="text-[11px] font-medium text-gray-500">{property.features.baths} bath</span>
            </div>

            {/* Area */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
              </svg>
              <span className="text-[11px] font-medium text-gray-500">{areaLabel}</span>
            </div>

            {/* Ownership */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
              </svg>
              <span className="text-[11px] font-medium text-gray-500">{ownershipLabel}</span>
            </div>
          </div>
        </div>

        {/* Bottom Price & View Details Bar */}
        <div className="flex items-center justify-between px-6 pb-5">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            {property.originalPriceFormatted && property.originalPriceFormatted !== property.formattedPrice && (
              <span className="text-xs text-gray-400 line-through">
                {property.originalPriceFormatted}
              </span>
            )}
            <span className="text-xl font-extrabold text-gray-900">
              {property.formattedPrice}
            </span>
          </div>

          {/* View Details Link */}
          <Link
            href={`/properties/${property.slug}`}
            className="text-[#4c70ff] hover:text-blue-700 text-xs font-bold inline-flex items-center gap-1 transition-colors"
          >
            View Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
