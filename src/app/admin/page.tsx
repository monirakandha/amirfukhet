'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { PropertiesManager } from '@/components/admin/PropertiesManager';
import { BlogManager } from '@/components/admin/BlogManager';
import { SuccessStoryManager } from '@/components/admin/SuccessStoryManager';
import { FaqManager } from '@/components/admin/FaqManager';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { InquiriesManager } from '@/components/admin/InquiriesManager';
import { NewsletterManager } from '@/components/admin/NewsletterManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { GuideManager } from '@/components/admin/GuideManager';
import { HeroSliderManager } from '@/components/admin/HeroSliderManager';
import { Menu, X, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AdminDashboardPage() {
  const { isAuthenticated } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'properties':
        return <PropertiesManager />;
      case 'blogs':
        return <BlogManager />;
      case 'stories':
        return <SuccessStoryManager />;
      case 'guide':
        return <GuideManager />;
      case 'faqs':
        return <FaqManager />;
      case 'categories':
        return <CategoryManager />;
      case 'hero':
        return <HeroSliderManager />;
      case 'settings':
        return <SettingsManager />;
      case 'inquiries':
        return <InquiriesManager />;
      case 'newsletters':
        return <NewsletterManager />;
      case 'media':
        return <div className="p-6 sm:p-8"><MediaManager /></div>;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-slate-50 text-gray-900">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5870F7] text-white flex items-center justify-center font-bold text-base font-heading-bricolage shadow-md shadow-[#5870F7]/20">
            AP
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-base font-heading-bricolage">Amir Phuket OS</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5870F7] text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit Website</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out shrink-0`}
      >
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto focus:outline-none">
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-3 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#5870F7]" />
            <span className="font-medium text-gray-700">Admin Panel</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400 text-xs">amirknowsphuket.com</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-md shadow-[#5870F7]/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </a>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
