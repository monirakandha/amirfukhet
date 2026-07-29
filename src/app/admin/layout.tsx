import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal | AMIR KNOWS PHUKET',
  description: 'Backend content management system for Amir Knows Phuket.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-[#5870F7] selection:text-white">
      {children}
    </div>
  );
}
