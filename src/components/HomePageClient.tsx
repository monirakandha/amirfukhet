'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import HomeValuationModal from '@/components/HomeValuationModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property, BlogArticle, SuccessStory } from '@/types';
import { submitNewsletter } from '@/services/api';
import { TrendingUp, Timer, MapPin, Scale, Building2, Newspaper } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

import AnimatedCounter from '@/components/AnimatedCounter';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import CaseStudyBlock from '@/components/CaseStudyBlock';

interface HomePageClientProps {
  properties: Property[];
  blogs: BlogArticle[];
  stories: SuccessStory[];
}

export default function HomePageClient({ properties, blogs, stories }: HomePageClientProps) {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<Property | null>(null);

  // Admin context provides runtime-editable images from localStorage (admin panel)
  // Falls back to defaults when accessed by search engines (server-rendered defaults below)
  const { settings } = useAdmin();
  const heroBg = settings.homepageImages?.heroBg || '/images/hero-bg.jpg';
  const guideBannerBg = settings.homepageImages?.guideBannerBg || '/images/skyline-bg.png';
  const advisorImage = settings.homepageImages?.advisorImage || '/images/amir-seated.png';
  const meetAdvisorImage = settings.homepageImages?.meetAdvisorImage || '/images/amir-seated.png';

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero Section with exact Figma Villa Background */}
      <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden flex flex-col justify-between">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
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
                <AnimatedCounter value="32+" />
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
                <AnimatedCounter value="07+" />
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
                <AnimatedCounter value="24h" />
              </div>
              <p className="font-desc-mona text-[18px] font-normal text-[#6B7280] leading-none">
                Replies within 24h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Intro Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] pt-8 lg:pt-10 pb-0 relative overflow-hidden border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center items-start space-y-6 pt-8 lg:pt-12 pb-8 lg:pb-12 relative z-10">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-[#E5E9F2] section-pill font-desc-mona text-[14px] sm:text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
                Property Investment Advisor - Phuket
              </div>

              {/* Headline */}
              <h2
                className="font-heading-bricolage text-[40px] sm:text-[48px] lg:text-[54px] font-semibold text-[#020202] leading-[1.1] sm:leading-[1.15] tracking-[-0.02em] max-w-[800px]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                Invest in Phuket Property<br />
                with Trusted Advisors, Guided by Expertise.
              </h2>

              {/* Sub-description */}
              <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-[700px] leading-[1.6]">
                Independent research, honest guidance, and the full picture from ownership<br />
                structures to rental yields so international buyers invest in Thailand with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-desc-mona text-[16px] font-medium text-white leading-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25)]"
                >
                  Talk to Amir on WhatsApp
                </a>

                <Link
                  href="/blog"
                  className="group inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-transparent hover:bg-[#F4F6F7] font-desc-mona text-[16px] font-medium text-[#020202] leading-none border border-[#DFE3EB] transition-all"
                >
                  Read the free guide
                </Link>
              </div>
            </div>

            {/* Right Photo */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-end relative z-0">
              <img
                src={advisorImage}
                alt="Amir - Property Investment Advisor"
                className="w-full max-w-[450px] sm:max-w-[520px] lg:w-[120%] lg:max-w-none object-contain object-bottom lg:-mr-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Foreigner Property Guide Banner Section matching Figma mockup */}
      <section className="relative w-full overflow-hidden text-center text-white bg-[#7cb5ec] flex items-center justify-center" style={{ height: '723px' }}>
        {/* Skyline Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={guideBannerBg}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {blogs.slice(0, 3).map((blog) => {
              const cleanSummary = (blog.summary || '')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .trim();

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group relative flex flex-col cursor-pointer"
                >
                  {/* DEFAULT STATE (Figma Layout: Tall Image + Title below) */}
                  <div className="flex flex-col w-full">
                    {/* Cover Image */}
                    <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border-2 border-white shadow-xs mb-4 sm:mb-5">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-heading-bricolage text-[20px] sm:text-[22px] font-medium text-[#020202] leading-[1.25] tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors duration-200 pr-4"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      {blog.title}
                    </h3>
                  </div>

                  {/* HOVER OVERLAY CARD (Revealed on hover, matching Figma) */}
                  <div className="absolute -top-2 -left-2 -right-2 bottom-auto min-h-[calc(100%+16px)] bg-white rounded-[24px] border border-gray-200/80 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-30 flex flex-col overflow-hidden pb-5">
                    <div className="relative w-full aspect-[4/5] bg-gray-100 shrink-0">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Fade to white at the bottom of the image */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm border border-white/50 font-desc-mona text-[14px] font-medium text-[#E05A4E] leading-none shadow-sm">
                        {blog.category}
                      </div>
                    </div>

                    <div className="px-5 pt-0 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Title */}
                        <h3
                          className="font-heading-bricolage text-[20px] sm:text-[22px] font-semibold text-[#020202] leading-[1.2] tracking-[-0.01em]"
                          style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                        >
                          {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.5] mt-2.5 line-clamp-3">
                          {cleanSummary}
                        </p>
                      </div>

                      {/* Footer: Date & Read Time */}
                      <div className="flex items-center justify-between mt-5 font-desc-mona text-[13.5px] font-medium text-[#6B7280]">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
                            <path d="M16 20l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Updated {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="7" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" fill="currentColor" />
                          </svg>
                          <span>{blog.readTimeMinutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
      <section
        className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 section-pill font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Latest insights
            </div>

            <h2
              className="section-heading font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Research the<br /> market before you commit
            </h2>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-7 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <TrendingUp className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    Market Insights
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 transition-colors">
                    Prices, trends, area analysis, demand
                  </p>
                </div>
              </Link>

              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-8 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Scale className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    Ownership &amp; Legal
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-2 transition-colors">
                    Freehold, leasehold, company structures
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-8 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Timer className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    Buyer Guides
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-2 transition-colors">
                    Process, taxes, financing, bank accounts
                  </p>
                </div>
              </Link>

              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-7 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <Building2 className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    Rental &amp; ROI
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 transition-colors">
                    Yields, seasonality, rental strategy
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-7 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                  <MapPin className="w-7 h-7 text-[#5870F7] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    Area Guides
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-1.5 transition-colors">
                    Bang Tao, Kamala, Surin, Layan, Rawai
                  </p>
                </div>
              </Link>

              <Link href="/blog" className="group bg-white rounded-[24px] p-6 sm:p-8 transition-all duration-300 border border-gray-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] group-hover:bg-[#E5ECFF] flex items-center justify-center transition-colors mb-6 shrink-0 shadow-2xs">
                    <Newspaper className="w-7 h-7 text-[#5870F7] transition-colors" />
                  </div>
                  <h3 className="box-heading font-heading-bricolage text-[22px] sm:text-[24px] font-medium text-[#020202] leading-tight tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                    News &amp; Updates
                  </h3>
                  <p className="box-description font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#6B7280] leading-[1.4] mt-2 transition-colors">
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
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                +7.4%
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Avg. villa price growth, prime west coast (YoY)*
              </p>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                6–8%
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Typical gross rental yield range*
              </p>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                Nov–Mar
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Peak rental season, high-occupancy window*
              </p>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="stat-metric-value font-heading-bricolage text-[32px] font-normal text-[#5870F7] leading-none tracking-[-0.01em] mb-2.5" style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}>
                30yx3
              </div>
              <p className="stat-metric-label font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.4] text-center max-w-[210px]">
                Standard leasehold term &amp; renewals
              </p>
            </div>
          </div>

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

      {/* Success Stories Section */}
      <SuccessStoriesSection stories={stories} limit={3} />

      {/* Meet Your Advisor Section matching exact Figma specs */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Photo Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-3 bg-white rounded-[24px] shadow-lg border border-gray-100">
                <div className="w-full overflow-hidden rounded-[16px]">
                  <img
                    src={meetAdvisorImage}
                    alt="Amir Ahmed Faisal - Property Investment Advisor"
                    className="w-full h-auto object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
                Meet your advisor
              </div>

              <h2
                className="font-heading-bricolage text-[44px] font-semibold text-[#020202] leading-[100%] tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
              >
                I help foreigners buy in Phuket the right way — eyes open.
              </h2>

              <p className="font-desc-mona text-[20px] font-normal text-[#6B7280] leading-[1.4] max-w-2xl">
                I'm Amir Ahmed Faisal, a property investment advisor based in Phuket. I'm not an agent chasing a commission — I'm the person who explains the structures, flags the risks, and stays in your corner from first question to handover. My job is to make sure your money goes into the right property, in the right area, under the right ownership.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/about"
                  className="font-desc-mona text-[16px] font-medium text-white leading-none px-7 py-3.5 bg-[#5870F7] hover:bg-blue-600 rounded-full transition-all shadow-md shadow-blue-500/20 inline-flex items-center justify-center"
                >
                  My story &amp; approach
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

      {/* Featured Properties Section */}
      <section className="w-full bg-[#F9FAFC] py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onQuickInquire={(prop) => setSelectedViewingProperty(prop)}
              />
            ))}
          </div>

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



      {/* WhatsApp Contact CTA Banner Section */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden text-white bg-[#43a19b]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/resort-cta-bg.png"
            alt="Phuket Oceanfront Resort Coastline View"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 font-desc-mona text-[16px] font-normal text-white leading-none shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white" />
              Ready when you are
            </div>

            <h2
              className="font-heading-bricolage text-[44px] font-semibold text-white leading-[1.1] tracking-[-0.01em] drop-shadow-sm max-w-[420px]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              One message<br className="hidden sm:inline" /> is all it takes to start
            </h2>

            <p className="font-desc-mona text-[18px] font-normal text-white/95 leading-[1.45] drop-shadow-xs max-w-[440px]">
              Have a question about an area, a structure, or a specific property? Message Amir directly. You'll get a straight, honest answer – not a sales pitch.
            </p>

            <div className="flex flex-col items-start gap-3.5 pt-2 w-full max-w-[400px]">
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

      {/* Free Lead Magnet Section */}
      <section className="py-20 md:py-24 bg-[#1C2026] border-t border-gray-800/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[32px] p-8 md:p-14 lg:p-16 border border-gray-700/60 relative overflow-hidden shadow-2xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/lead-magnet-bg.png')",
              boxShadow: "0px 24px 64px -12px rgba(0, 0, 0, 0.55), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.12)"
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-600/60 bg-[#242A33]/80 text-[#B3B3B3] text-[13px] font-semibold uppercase tracking-wider">
                  Free Lead Magnet · Instant Download
                </div>

                <h2
                  className="font-heading-bricolage text-[44px] font-semibold text-white leading-none tracking-[-0.01em] max-w-[480px]"
                  style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                >
                  Get the Phuket investor's guide — free
                </h2>

                <p className="font-desc-mona text-[16px] font-normal text-[#B3B3B3] leading-[1.5] max-w-[540px]">
                  Join the list and get Amir's market updates and the complete<br className="hidden sm:inline" /> buying guide delivered to your inbox. No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Right Form */}
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
                  <div>
                    <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">Name</label>
                    <input type="text" required placeholder="Enter your name" className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors" />
                  </div>
                  <div>
                    <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">Email</label>
                    <input type="email" required placeholder="Enter your email" className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors" />
                  </div>
                  <div>
                    <label className="font-desc-mona text-[16px] font-medium text-white block mb-2 leading-none">Phone Number</label>
                    <input type="tel" placeholder="+880" className="font-desc-mona text-[16px] font-medium text-white placeholder-[#B3B3B3] leading-none w-full bg-[#272c33] border border-gray-600/50 rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-[#5870F7] transition-colors" />
                  </div>
                  <button type="submit" className="font-desc-mona text-[16px] font-medium text-white leading-none w-full py-4 px-6 rounded-full bg-[#5870F7] hover:bg-blue-600 transition-all flex items-center justify-center gap-2.5 mt-3 shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35)]">
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

      <Footer hideCTA={true} />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
      <ScheduleViewingModal
        property={selectedViewingProperty}
        isOpen={!!selectedViewingProperty}
        onClose={() => setSelectedViewingProperty(null)}
      />
    </div>
  );
}
