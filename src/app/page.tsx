'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import HomeValuationModal from '@/components/HomeValuationModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property, BlogArticle, SuccessStory } from '@/types';
import { fetchProperties, fetchBlogs, fetchSuccessStories, submitNewsletter } from '@/services/api';
import { TrendingUp, BookOpen, Timer, MapPin, Scale, Building2, Newspaper } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function loadData() {
      const propData = await fetchProperties();
      const blogData = await fetchBlogs();
      const storyData = await fetchSuccessStories();
      setProperties(propData);
      setBlogs(blogData);
      setStories(storyData);
    }
    loadData();
  }, []);

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero Section with exact Figma Villa Background */}
      <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden flex flex-col justify-between">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Luxury Phuket Villa Pool View"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to ensure menu visibility at top if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
        </div>
      </section>

      {/* Stats Counter Section matching Figma mockup */}
      <section className="w-full bg-[#f6f8fb] py-14 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-1.5">
              <div
                className="font-heading-bricolage text-[44px] font-light text-[#5870F7] leading-none tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                32+
              </div>
              <p className="font-desc-mona text-[18px] font-normal text-[#6B7280] leading-none">
                In-depth investor articles
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5">
              <div
                className="font-heading-bricolage text-[44px] font-light text-[#5870F7] leading-none tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                07+
              </div>
              <p className="font-desc-mona text-[18px] font-normal text-[#6B7280] leading-none">
                Phuket areas covered in depth
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5">
              <div
                className="font-heading-bricolage text-[44px] font-light text-[#5870F7] leading-none tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                A–Z
              </div>
              <p className="font-desc-mona text-[18px] font-normal text-[#6B7280] leading-none">
                Buying process, fully explained
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1.5">
              <div
                className="font-heading-bricolage text-[44px] font-light text-[#5870F7] leading-none tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                24h
              </div>
              <p className="font-desc-mona text-[18px] font-normal text-[#6B7280] leading-none">
                Replies within 24h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Intro Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] pt-16 lg:pt-24 pb-0 relative overflow-hidden border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 py-8 lg:py-20 relative z-10">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E9F2] section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
                Property Investment Advisor · Phuket
              </div>

              {/* Headline matching exact 3-line breaks from image */}
              <h2
                className="font-heading-bricolage text-[40px] sm:text-[48px] lg:text-[56px] font-semibold text-[#020202] leading-[1.14] sm:leading-[64px] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                Invest in Phuket Property<br className="hidden sm:inline" /> with Trusted Advisors,<br className="hidden sm:inline" /> Guided by Expertise.
              </h2>

              {/* Sub-description */}
              <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-[660px] leading-[1.5]">
                Independent research, honest guidance, and the full picture from ownership structures to rental yields so international buyers invest in Thailand with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[16px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)]"
                >
                  Talk to Amir on WhatsApp
                </a>

                <Link
                  href="/blog"
                  className="group inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#F4F6F7] hover:bg-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white leading-none border border-[#DFE3EB] hover:border-[#5870F7] transition-all shadow-2xs"
                >
                  Read the free guide
                </Link>
              </div>
            </div>

            {/* Right Photo without drop shadow matching clean cutout in image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end self-end w-full relative z-0">
              <img
                src="/images/amir.png"
                alt="Amir - Property Investment Advisor"
                className="w-full h-auto max-w-[540px] sm:max-w-[640px] lg:max-w-[740px] xl:max-w-[840px] object-contain object-bottom scale-125 lg:scale-[1.4] xl:scale-[1.5] origin-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Foreigner Property Guide Banner Section matching Figma mockup */}
      <section className="relative w-full overflow-hidden text-center text-white bg-[#7cb5ec] flex items-center justify-center" style={{ height: '656px' }}>
        {/* Skyline Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/skyline-bg.png"
            alt="Phuket Skyline City View"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Subtle overlay for contrast */}
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Translucent Pill Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 font-desc-mona text-[16px] font-medium text-white leading-none shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white" />
            Start here · The complete reference
          </div>

          {/* Heading */}
          <h2
            className="font-heading-bricolage text-[44px] font-semibold text-white leading-none tracking-[-0.01em] text-center max-w-4xl mx-auto drop-shadow-sm"
            style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
          >
            The Complete Guide to Buying<br className="hidden sm:inline" /> Property in Phuket as a Foreigner
          </h2>

          {/* Description */}
          <p className="font-desc-mona text-[16px] font-normal text-white leading-[1.5] text-center max-w-[680px] mx-auto drop-shadow-xs">
            Ownership structures, the step-by-step buying process, taxes and transfer fees, financing, due diligence and the real risks – the single resource that answers almost every question before you ever send a message.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/blog"
              className="font-desc-mona text-[16px] font-medium text-white leading-none px-7 py-3.5 bg-[#5870F7] hover:bg-blue-600 rounded-full transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)] inline-flex items-center justify-center"
            >
              Read the guide
            </Link>

            <Link
              href="/blog"
              className="group font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white leading-none px-7 py-3.5 bg-[#F4F6F7] hover:bg-[#5870F7] rounded-full border border-[#DFE3EB] hover:border-[#5870F7] transition-all inline-flex items-center justify-center shadow-2xs"
            >
              Explore market insights
            </Link>
          </div>
        </div>
      </section>

      {/* Blog / Market Insights Section matching Figma mockup */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Latest insights
            </div>

            <h2
              className="section-heading font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Research the market before you commit
            </h2>
          </div>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogs.slice(0, 3).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-[24px] overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#5870F7]/30 transition-all duration-300 ease-out flex flex-col"
              >
                {/* Cover Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 rounded-t-[24px]">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                  {/* Category pill */}
                  <span className="absolute top-3 left-3 px-3 py-1.5 bg-white text-[#E53935] text-[11px] font-semibold rounded-xl border border-red-100 shadow-xs leading-none">
                    {blog.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  {/* Title */}
                  <h3
                    className="font-heading-bricolage text-[20px] font-semibold text-[#020202] leading-[1.25] tracking-[-0.01em] line-clamp-2 group-hover:text-[#5870F7] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-desc-mona text-[14px] font-normal text-[#6B7280] leading-[1.5] line-clamp-3 flex-1">
                    {blog.summary}
                  </p>

                  {/* Bottom meta row */}
                  <div className="border-t border-gray-100 pt-4 mt-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] font-medium">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      <span>Updated {blog.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] font-medium">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeWidth="1.8"/>
                        <circle cx="12" cy="12" r="3" strokeWidth="1.8"/>
                      </svg>
                      <span>{blog.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f4f6fa] hover:bg-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white border border-gray-200/80 hover:border-[#5870F7] transition-all shadow-2xs leading-none"
            >
              <span>View all insights</span>
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Topics Grid Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Latest insights
            </div>

            <h2
              className="section-heading font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Research the market before you commit
            </h2>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Column 1: Short (Market Insights) on top, Tall (Ownership & Legal) on bottom */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Card 1: Market Insights (Horizontal) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <TrendingUp className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Market Insights
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 group-hover:text-white/85 transition-colors">
                    Prices, trends, area analysis, demand
                  </p>
                </div>
              </Link>

              {/* Card 4: Ownership & Legal (Vertical) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-8 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Scale className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Ownership & Legal
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-2 group-hover:text-white/85 transition-colors">
                    Freehold, leasehold, company structures
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 2: Tall (Buyer Guides - Blue!) on top, Short (Rental & ROI) on bottom */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Card 2: Buyer Guides (Vertical) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-8 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Timer className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Buyer Guides
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-2 group-hover:text-white/85 transition-colors">
                    Process, taxes, financing, bank accounts
                  </p>
                </div>
              </Link>

              {/* Card 5: Rental & ROI (Horizontal) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <Building2 className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Rental & ROI
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 group-hover:text-white/85 transition-colors">
                    Yields, seasonality, rental strategy
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 3: Short (Area Guides) on top, Tall (News & Updates) on bottom */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Card 3: Area Guides (Horizontal) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <MapPin className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Area Guides
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 group-hover:text-white/85 transition-colors">
                    Bang Tao, Kamala, Surin, Layan, Rawai
                  </p>
                </div>
              </Link>

              {/* Card 6: News & Updates (Vertical) */}
              <Link
                href="/blog"
                className="group bg-white hover:bg-[#5870F7] rounded-[24px] p-6 sm:p-8 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-white flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Newspaper className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3
                    className="box-heading font-heading-bricolage text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    News & Updates
                  </h3>
                  <p className="box-description font-desc-mona text-[16px] sm:text-[18px] font-normal text-[#6B7280] leading-[1.4] mt-2 group-hover:text-white/85 transition-colors">
                    Launches, infrastructure, policy
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Depth Metrics Section matching exact Figma specs */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Market Insights
            </div>

            <h2
              className="section-heading font-heading-bricolage text-[36px] sm:text-[44px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em] max-w-4xl mx-auto"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Depth of research<br className="hidden sm:inline" /> you won't find on a portal
            </h2>

            <p className="section-subheading font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-[700px] mx-auto leading-[1.5] pt-2 text-center">
              Price trends by area, rental demand and seasonality, ownership law, and how global<br className="hidden md:inline" /> events move the Phuket market — tracked and explained, not hyped.
            </p>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-12">
            {/* Stat 1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div
                className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                +7.4%
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Avg. villa price growth, prime west coast (YoY)*
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div
                className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                6–8%
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Typical gross rental yield range*
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div
                className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                Nov–Mar
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Peak rental season, high-occupancy window*
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div
                className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                30yx3
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Standard leasehold term & renewals
              </p>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f4f6fa] hover:bg-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white border border-gray-200/80 hover:border-[#5870F7] transition-all shadow-2xs leading-none"
            >
              <span>Explore market insights</span>
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section matching exact Figma specs */}
      <section className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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

          {/* 3 Success Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stories.slice(0, 3).map((story) => (
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
        </div>
      </section>

      {/* Meet Your Advisor Section matching exact Figma specs */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Photo Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white rounded-3xl p-4 sm:p-5 w-full max-w-md border border-gray-100 shadow-2xs">
                <img
                  src="/images/amir-seated.png"
                  alt="Amir Ahmed Faisal - Property Investment Advisor"
                  className="w-full h-auto object-cover rounded-2xl shadow-xs"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
                Meet your advisor
              </div>

              {/* Headline */}
              <h2
                className="font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                I help foreigners buy in Phuket the right way — eyes open.
              </h2>

              {/* Description */}
              <p className="font-desc-mona text-[20px] font-normal text-[#6B7280] leading-[1.4] max-w-2xl">
                I'm Amir Ahmed Faisal, a property investment advisor based in Phuket. I'm not an agent chasing a commission — I'm the person who explains the structures, flags the risks, and stays in your corner from first question to handover. My job is to make sure your money goes into the right property, in the right area, under the right ownership.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/about"
                  className="font-desc-mona text-[16px] font-medium text-white leading-none px-7 py-3.5 bg-[#5870F7] hover:bg-blue-600 rounded-full transition-all shadow-md shadow-blue-500/20 inline-flex items-center justify-center"
                >
                  My story & approach
                </Link>

                <Link
                  href="/blog"
                  className="group font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white leading-none px-7 py-3.5 bg-[#DFE3EB] hover:bg-[#5870F7] rounded-full transition-all border border-transparent shadow-2xs inline-flex items-center justify-center gap-2"
                >
                  <span>Explore market insights</span>
                  <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section matching Figma mockup & user specs */}
      <section className="w-full bg-[#F9FAFC] py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              A few selected properties
            </div>

            <h2
              className="section-heading font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Hand-picked, not a portal
            </h2>
          </div>

          {/* 3 Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onQuickInquire={(prop) => setSelectedViewingProperty(prop)}
              />
            ))}
          </div>

          {/* Bottom Button */}
          <div className="text-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-normal text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
            >
              View listings
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact CTA Banner Section matching Figma mockup pixel-for-pixel */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden text-white bg-[#43a19b]">
        {/* Resort Coastline Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/resort-cta-bg.png"
            alt="Phuket Oceanfront Resort Coastline View"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Box Positioned on Left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            {/* Translucent Glassmorphism Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 font-desc-mona text-[16px] font-normal text-white leading-none shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white" />
              Ready when you are
            </div>

            {/* Heading - 2 lines pixel-perfect */}
            <h2
              className="font-heading-bricolage text-[44px] font-semibold text-white leading-[1.1] tracking-[-0.01em] drop-shadow-sm max-w-[420px]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif", fontSize: "44px", fontWeight: 600, lineHeight: "110%", letterSpacing: "-0.01em" }}
            >
              One message<br className="hidden sm:inline" /> is all it takes to start
            </h2>

            {/* Description */}
            <p className="font-desc-mona text-[18px] font-normal text-white/95 leading-[1.45] drop-shadow-xs max-w-[440px]">
              Have a question about an area, a structure, or a specific property? Message Amir directly. You'll get a straight, honest answer – not a sales pitch.
            </p>

            {/* CTA Buttons - Centered equal width stacked buttons matching Figma screenshot */}
            <div className="flex flex-col items-start gap-3.5 pt-2 w-full max-w-[400px]">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="font-desc-mona text-[16px] font-medium text-white leading-none w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#5870F7] hover:bg-blue-600 rounded-full transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35)] whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Chat on WhatsApp — replies within 24h</span>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* Insights Button - Blue hover effect */}
              <Link
                href="/blog"
                className="group font-desc-mona text-[16px] font-medium text-[#020202] hover:text-white leading-none w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-[#5870F7] rounded-full transition-all shadow-md whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Explore market insights</span>
                <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

        {/* ================= 12. FREE LEAD MAGNET SECTION ================= */}
        <section className="py-20 md:py-24 bg-[#1C2026] border-t border-gray-800/80 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="rounded-[32px] p-8 md:p-14 lg:p-16 border border-gray-700/60 relative overflow-hidden shadow-2xl"
              style={{
                background: "radial-gradient(103.54% 284.18% at 0% 0%, #151A21 0%, #101419 100%)",
                boxShadow: "0px 24px 64px -12px rgba(0, 0, 0, 0.55), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.12)"
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
                {/* Left Content (7 Cols) */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  {/* Pill Badge */}
                  <div 
                    className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-600/60 bg-[#242A33]/80 text-[#B3B3B3] text-[13px] font-semibold uppercase tracking-wider"
                  >
                    Free Lead Magnet · Instant Download
                  </div>

                  {/* Heading - EXACT FIGMA FONT & SIZE */}
                  <h2 
                    className="font-heading-bricolage text-[44px] font-semibold text-white leading-none tracking-[-0.01em] max-w-[480px]"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif", fontSize: "44px", fontWeight: 600, lineHeight: "100%", letterSpacing: "-0.01em" }}
                  >
                    Get the Phuket investor's guide — free
                  </h2>

                  {/* Description */}
                  <p className="font-desc-mona text-[16px] font-normal text-[#B3B3B3] leading-[1.5] max-w-[540px]">
                    Join the list and get Amir's market updates and the complete<br className="hidden sm:inline" /> buying guide delivered to your inbox. No spam, unsubscribe anytime.
                  </p>
                </div>

                {/* Right Form (5 Cols) */}
                <div className="lg:col-span-5">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const inputs = form.querySelectorAll('input');
                      const name = inputs[0]?.value || '';
                      const email = inputs[1]?.value || '';
                      const phone = inputs[2]?.value || '';
                      await submitNewsletter(`${name} (${email || phone})`, 'Home Page Lead Magnet');
                      alert('Thank you! You have been added to our subscribers list.');
                      form.reset();
                    }}
                    className="space-y-5 max-w-[460px] w-full lg:ml-auto"
                  >
                    {/* Name Input */}
                    <div>
                      <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+880"
                        className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="font-desc-mona text-[16px] font-medium text-white leading-none w-full py-4 px-6 rounded-full bg-[#5870F7] hover:bg-blue-600 transition-all flex items-center justify-center gap-2.5 mt-3 shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35)]"
                    >
                      Send me the free guide
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </form>
                </div>
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
