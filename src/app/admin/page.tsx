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
import { Menu, X, ShieldCheck } from 'lucide-react';

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
      case 'faqs':
        return <FaqManager />;
      case 'categories':
        return <CategoryManager />;
      case 'settings':
        return <SettingsManager />;
      case 'inquiries':
        return <InquiriesManager />;
      case 'newsletters':
        return <NewsletterManager />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-gray-900">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5870F7] text-white flex items-center justify-center font-bold text-base font-heading-bricolage shadow-md shadow-[#5870F7]/20">
            AP
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-base font-heading-bricolage">Amir Phuket OS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-gray-900 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
      <main className="flex-1 min-w-0 overflow-y-auto max-h-screen focus:outline-none">
        {renderContent()}
      </main>
    </div>
  );
}
