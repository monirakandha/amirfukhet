'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import HomeValuationModal from '@/components/HomeValuationModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property, BlogArticle, SuccessStory } from '@/types';
import { fetchProperties, fetchBlogs, fetchSuccessStories } from '@/services/api';
import { TrendingUp, BookOpen, MapPin, Scale, Building2, Newspaper } from 'lucide-react';

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
              <div className="text-4xl sm:text-5xl font-normal text-[#4c70ff] tracking-tight">
                32+
              </div>
              <p className="text-sm text-gray-500 font-normal">
                In-depth investor articles
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-normal text-[#4c70ff] tracking-tight">
                07+
              </div>
              <p className="text-sm text-gray-500 font-normal">
                Phuket areas covered in depth
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-normal text-[#4c70ff] tracking-tight">
                A–Z
              </div>
              <p className="text-sm text-gray-500 font-normal">
                Buying process, fully explained
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-normal text-[#4c70ff] tracking-tight">
                24h
              </div>
              <p className="text-sm text-gray-500 font-normal">
                Replies within 24h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Intro Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] pt-16 pb-12 lg:pt-20 lg:pb-0 relative overflow-hidden border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 pb-8 lg:pb-20">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#4c70ff] text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
                Property Investment Advisor · Phuket
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-900 leading-[1.18] tracking-tight">
                Invest in Phuket Property with Trusted Advisors, Guided by Expertise.
              </h2>

              {/* Sub-description */}
              <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
                Independent research, honest guidance, and the full picture from ownership structures to rental yields so international buyers invest in Thailand with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
                >
                  Talk to Amir on WhatsApp
                </a>

                <Link
                  href="/blog"
                  className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm rounded-full border border-gray-200 transition-colors"
                >
                  Read the free guide
                </Link>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end self-end">
              <img
                src="/images/amir.png"
                alt="Amir - Property Investment Advisor"
                className="w-auto max-h-[460px] lg:max-h-[520px] object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Foreigner Property Guide Banner Section matching Figma mockup */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden text-center text-white bg-[#7cb5ec]">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-xs text-white font-medium shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Start here · The complete reference
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto drop-shadow-sm">
            The Complete Guide to Buying Property in Phuket as a Foreigner
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-xs">
            Ownership structures, the step-by-step buying process, taxes and transfer fees, financing, due diligence and the real risks – the single resource that answers almost every question before you ever send a message.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/blog"
              className="px-7 py-3.5 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-all shadow-lg shadow-blue-600/30"
            >
              Read the guide
            </Link>

            <Link
              href="/blog"
              className="px-7 py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm rounded-full transition-all shadow-lg"
            >
              Explore market insights
            </Link>
          </div>
        </div>
      </section>

      {/* Category Topics Grid Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#4c70ff] text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
              Latest insights
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Research the market before you commit
            </h2>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Market Insights */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <TrendingUp className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Market Insights
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Prices, trends, area analysis, demand
                </p>
              </div>
            </Link>

            {/* Card 2: Buyer Guides (Demonstrates active hover state) */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <BookOpen className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Buyer Guides
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Process, taxes, financing, bank accounts
                </p>
              </div>
            </Link>

            {/* Card 3: Area Guides */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <MapPin className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Area Guides
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Bang Tao, Kamala, Surin, Layan, Rawai
                </p>
              </div>
            </Link>

            {/* Card 4: Ownership & Legal */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <Scale className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Ownership & Legal
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Freehold, leasehold, company structures
                </p>
              </div>
            </Link>

            {/* Card 5: Rental & ROI */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <Building2 className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Rental & ROI
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Yields, seasonality, rental strategy
                </p>
              </div>
            </Link>

            {/* Card 6: News & Updates */}
            <Link
              href="/blog"
              className="group bg-white hover:bg-[#4c70ff] rounded-2xl p-7 transition-all duration-300 shadow-xs border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] group-hover:bg-white flex items-center justify-center transition-colors mb-5">
                  <Newspaper className="w-6 h-6 text-[#4c70ff] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  News & Updates
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-white/85 transition-colors mt-2 leading-relaxed">
                  Launches, infrastructure, policy
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Depth Metrics Section matching Figma mockup */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f6fa] border border-blue-100 text-[#4c70ff] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
              Market Insights
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight max-w-3xl mx-auto leading-tight">
              Depth of research you won't find on a portal
            </h2>

            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed pt-1">
              Price trends by area, rental demand and seasonality, ownership law, and how global events move the Phuket market – tracked and explained, not hyped.
            </p>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-12">
            {/* Stat 1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-normal text-[#4c70ff] tracking-tight mb-2">
                +7.4%
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[210px]">
                Avg. villa price growth, prime west coast (YoY)*
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-normal text-[#4c70ff] tracking-tight mb-2">
                6–8%
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[210px]">
                Typical gross rental yield range*
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-normal text-[#4c70ff] tracking-tight mb-2">
                Nov–Mar
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[210px]">
                Peak rental season, high-occupancy window*
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-normal text-[#4c70ff] tracking-tight mb-2">
                30yx3
              </div>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[210px]">
                Standard leasehold term & renewals
              </p>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f4f6fa] hover:bg-gray-100 text-gray-900 text-sm font-semibold border border-gray-200/80 transition-colors shadow-2xs"
            >
              Explore market insights
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section matching Figma mockup */}
      <section className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-[#4c70ff] text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
              Success stories
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Real deals, told in full
            </h2>

            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed pt-1">
              Not one-line testimonials – the complete story of how each buyer went from cautious researcher to confident owner.
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
                  <div className="space-y-2">
                    {/* Location & Property Type Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{story.location} · {story.propertyType}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#4c70ff] transition-colors">
                      {story.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Highlight Wavy Metric Link */}
                  <div className="pt-2">
                    <span className="text-[#4c70ff] text-xs sm:text-sm font-semibold underline decoration-wavy decoration-[#4c70ff] underline-offset-4">
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 text-sm font-semibold border border-gray-200 transition-colors shadow-2xs"
            >
              Read all success stories
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Your Advisor Section matching Figma mockup */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Photo Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#f4f6fa] rounded-3xl p-4 sm:p-5 w-full max-w-md border border-gray-100 shadow-2xs">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f6fa] border border-blue-100 text-[#4c70ff] text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
                Meet your advisor
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.18] tracking-tight">
                I help foreigners buy in Phuket the right way — eyes open.
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
                I'm Amir Ahmed Faisal, a property investment advisor based in Phuket. I'm not an agent chasing a commission – I'm the person who explains the structures, flags the risks, and stays in your corner from first question to handover. My job is to make sure your money goes into the right property, in the right area, under the right ownership.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/about"
                  className="px-7 py-3.5 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
                >
                  My story & approach
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f4f6fa] hover:bg-gray-100 text-gray-900 font-semibold text-sm rounded-full border border-gray-200/80 transition-colors shadow-2xs"
                >
                  Explore market insights
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Market Insights Section matching Figma mockup */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f6fa] border border-blue-100 text-[#4c70ff] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
              Latest insights
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Research the market before you commit
            </h2>
          </div>

          {/* 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogs.slice(0, 3).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col space-y-4"
              >
                {/* Image */}
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-xs">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                {/* Article Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[#4c70ff] transition-colors pr-2">
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4f6fa] hover:bg-gray-100 text-gray-900 text-sm font-semibold border border-gray-200/80 transition-colors shadow-2xs"
            >
              View all insights
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section matching Figma mockup */}
      <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f6fa] border border-blue-100 text-[#4c70ff] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#4c70ff]" />
              A few selected properties
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 text-sm font-semibold border border-gray-200 transition-colors shadow-2xs"
            >
              View listings
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 font-desc-mona text-[16px] font-medium text-white leading-none shadow-xs">
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

            {/* CTA Buttons - Vertically stacked matching Figma screenshot */}
            <div className="flex flex-col items-start gap-3.5 pt-2 w-full max-w-[440px]">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801875189361"
                target="_blank"
                rel="noopener noreferrer"
                className="font-desc-mona text-[16px] font-medium text-white leading-none inline-flex items-center justify-between sm:justify-start gap-3 px-6 py-3.5 bg-[#5870F7] hover:bg-blue-600 rounded-full transition-all shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.35)] whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Chat on WhatsApp — replies within 24h</span>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* Insights Button */}
              <Link
                href="/blog"
                className="font-desc-mona text-[16px] font-medium text-[#020202] leading-none inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#f8fafc] hover:bg-white rounded-full transition-all shadow-md whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Explore market insights</span>
                <svg className="w-4 h-4 text-[#020202] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Lead Magnet Section matching Figma mockup pixel-for-pixel */}
      <section className="w-full bg-[#f4f6fa] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-[#1c2025] bg-cover bg-center bg-no-repeat rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-2xl border border-gray-800 relative overflow-hidden"
            style={{ backgroundImage: "url('/images/lead-magnet-bg.png')" }}
          >

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Text (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Translucent Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 font-desc-mona text-[16px] font-medium text-white shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Free lead magnet
                </div>

                {/* Headline */}
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! The guide will be sent to your email shortly.');
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

                  {/* Footer note */}
                  <p className="font-desc-mona text-[14px] sm:text-[15px] font-medium text-[#B3B3B3] text-center mt-4 leading-none whitespace-nowrap">
                    Connects to Mailchimp / Brevo · 500+ investors on the list
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
      <ScheduleViewingModal
        property={selectedViewingProperty}
        isOpen={!!selectedViewingProperty}
        onClose={() => setSelectedViewingProperty(null)}
      />
    </div>
  );
}
