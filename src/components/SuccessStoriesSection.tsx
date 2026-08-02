'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SuccessStory } from '@/types';

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  limit?: number;
  showHeading?: boolean;
  showViewAllButton?: boolean;
  bgColor?: string;
  enableLoadMore?: boolean;
  loadMoreStep?: number;
}

export default function SuccessStoriesSection({
  stories,
  limit,
  showHeading = true,
  showViewAllButton = true,
  bgColor = 'bg-[#f4f6fa]',
  enableLoadMore = false,
  loadMoreStep = 6,
}: SuccessStoriesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(
    enableLoadMore ? loadMoreStep : (limit || stories.length)
  );

  const displayStories = stories.slice(0, visibleCount);
  const hasMore = enableLoadMore && visibleCount < stories.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + loadMoreStep);
  };

  return (
    <section className={`w-full ${bgColor} py-16 sm:py-24 border-b border-gray-200/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {showHeading && (
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Success stories
            </div>

            <h2
              className="font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Real deals, told in full
            </h2>

            <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-2xl mx-auto leading-[1.4] pt-1 text-center">
              Not one-line testimonials — the complete story of how each buyer went<br className="hidden sm:inline" /> from cautious researcher to confident owner.
            </p>
          </div>
        )}

        {/* Success Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayStories.map((story) => (
            <Link
              key={story.id}
              href={`/success-stories/${story.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/60 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2.5">
                  {/* Location & Property Type Badge */}
                  <div className="flex items-center gap-1.5 font-desc-mona text-[16px] font-medium text-[#6B7280] leading-none">
                    <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{story.location} · {story.propertyType}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-heading-bricolage text-[22px] font-medium text-[#020202] leading-[1.2] tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    {story.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4]">
                    {story.subtitle}
                  </p>
                </div>

                {/* Highlight Wavy Metric Link */}
                <div className="pt-2">
                  <span
                    className="font-heading-bricolage text-[18px] font-medium text-[#5870F7] leading-none underline decoration-wavy decoration-[#5870F7] underline-offset-4"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    {story.metricHighlight}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Button */}
        {showViewAllButton && (
          <div className="text-center">
            <Link
              href="/success-stories"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
            >
              <span>Read all success stories</span>
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
            >
              <span>Load more stories</span>
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
