'use client';

import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { 
  Home, 
  FileText, 
  Award, 
  Mail, 
  Users, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Settings,
  ExternalLink
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveTab }) => {
  const { properties, blogs, successStories, contactSubmissions, newsletterSubmissions, user } = useAdmin();

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Home, color: 'from-blue-500 to-indigo-600', tab: 'properties' },
    { label: 'Blog Articles', value: blogs.length, icon: FileText, color: 'from-purple-500 to-pink-600', tab: 'blogs' },
    { label: 'Success Stories', value: successStories.length, icon: Award, color: 'from-amber-500 to-orange-600', tab: 'stories' },
    { label: 'Contact Inquiries', value: contactSubmissions.length, icon: Mail, color: 'from-emerald-500 to-teal-600', tab: 'inquiries' },
    { label: 'Newsletter Leads', value: newsletterSubmissions.length, icon: Users, color: 'from-cyan-500 to-blue-600', tab: 'newsletters' },
  ];

  const recentInquiries = contactSubmissions.slice(0, 4);

  return (
    <div className="space-y-8 p-6 sm:p-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading-bricolage">
            Welcome back, {user?.name || 'Amir Ahmad Faisal'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Here is what is happening across your luxury real estate investment platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('properties')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white text-sm font-semibold shadow-md shadow-[#5870F7]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Property</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-gray-900 text-sm font-semibold border border-slate-300 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(stat.tab)}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#5870F7]/40 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden shadow-xs"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#5870F7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-gray-900 tracking-tight font-heading-bricolage">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Inquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#5870F7]" />
              <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Recent Client Inquiries</h2>
            </div>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="text-xs font-bold text-[#5870F7] hover:text-blue-700 transition-colors"
            >
              View All Inquiries →
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-medium">
              No recent inquiries submitted yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm truncate">{inquiry.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inquiry.status === 'new' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        inquiry.status === 'read' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate font-medium">
                      <span className="text-gray-800 font-semibold">{inquiry.type.replace('-', ' ').toUpperCase()}</span>
                      {inquiry.propertyTitle && ` • ${inquiry.propertyTitle}`}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 italic">"{inquiry.message}"</p>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center shrink-0 text-right">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {inquiry.submittedAt}
                    </span>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-bold text-[#5870F7] hover:underline mt-1"
                    >
                      Open Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & System Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setActiveTab('settings')}
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-[#5870F7]/30 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-[#5870F7]" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Update Button Links</div>
                    <div className="text-xs text-slate-500 font-medium">Edit WhatsApp, LinkedIn & CTA URLs</div>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-[#5870F7] transition-colors font-bold">→</span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Manage Categories</div>
                    <div className="text-xs text-slate-500 font-medium">Organize blog tags & villa types</div>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-purple-600 transition-colors font-bold">→</span>
              </button>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Preview Live Website</div>
                    <div className="text-xs text-slate-500 font-medium">Check latest changes on frontend</div>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-emerald-600 transition-colors font-bold">↗</span>
              </a>
            </div>
          </div>

          {/* System Status Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#5870F7]" />
              <span>Storage Synced Active</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              All admin changes (properties, blogs, FAQs, settings, and form submissions) are instantly persisted in real-time browser storage for live preview and seamless publishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
