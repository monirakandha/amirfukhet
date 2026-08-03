'use client';

import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Award, 
  HelpCircle, 
  FolderTree, 
  Settings, 
  Mail, 
  Users, 
  LogOut, 
  ExternalLink,
  ShieldAlert,
  RotateCcw,
  Image as ImageIcon,
  BookOpen,
  Monitor
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout, contactSubmissions, newsletterSubmissions, resetToDefaults } = useAdmin();

  const newInquiriesCount = contactSubmissions.filter(s => s.status === 'new').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties Manager', icon: Home },
    { id: 'blogs', label: 'Blog Posts Manager', icon: FileText },
    { id: 'stories', label: 'Success Stories', icon: Award },
    { id: 'guide', label: 'Guide Page Content', icon: BookOpen },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'faqs', label: 'FAQ Manager', icon: HelpCircle },
    { id: 'categories', label: 'Category Archives', icon: FolderTree },
    { id: 'hero', label: 'Hero Area Slider', icon: Monitor },
    { id: 'inquiries', label: 'Contact Inquiries', icon: Mail, badge: newInquiriesCount > 0 ? newInquiriesCount : undefined },
    { id: 'newsletters', label: 'Newsletter Leads', icon: Users, badge: newsletterSubmissions.length },
    { id: 'settings', label: 'Site & Link Settings', icon: Settings },
  ];

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore original default properties, articles, and settings?')) {
      resetToDefaults();
      alert('Default mock data and settings restored.');
    }
  };

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen shadow-sm">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5870F7] text-white flex items-center justify-center font-bold text-lg font-heading-bricolage shadow-md shadow-[#5870F7]/20">
            AP
          </div>
          <div>
            <div className="font-bold text-gray-900 tracking-tight leading-none text-base font-heading-bricolage">Amir Knows Phuket</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Super Admin Active
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 font-heading-bricolage">
          Content Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#5870F7] text-white shadow-md shadow-[#5870F7]/25 font-semibold'
                  : 'text-slate-600 hover:text-gray-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-[#5870F7] border border-blue-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6 pb-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 font-heading-bricolage">
            System & Tools
          </div>
          
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-gray-900 hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-slate-500" />
              <span>View Live Website</span>
            </div>
            <span className="text-xs text-slate-400">↗</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5" />
              <span>Reset Default Data</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Profile */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={user?.avatar || '/images/amir.png'}
              alt={user?.name || 'Admin'}
              className="w-10 h-10 rounded-full object-cover border border-slate-300 bg-white shrink-0"
            />
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate font-heading-bricolage">{user?.name || 'Admin User'}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email || 'admin@amirphuket.com'}</div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
