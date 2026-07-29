'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { CategoryItem } from '@/types/admin';
import { Plus, Trash2, Check, FolderTree, Tag, Home, FileText } from 'lucide-react';

export const CategoryManager: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useAdmin();
  const [name, setName] = useState('');
  const [type, setType] = useState<'blog' | 'property'>('blog');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type,
      count: 1,
    });
    setName('');
    showToast('Category created!');
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      deleteCategory(id);
      showToast('Category removed.');
    }
  };

  const blogCategories = categories.filter((c) => c.type === 'blog');
  const propCategories = categories.filter((c) => c.type === 'property');

  return (
    <div className="p-6 sm:p-8 space-y-8 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading-bricolage">
          Category Archive Manager
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Organize classification archives and filter labels for properties and blog articles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Category Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm self-start space-y-4">
          <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#5870F7]" />
            <span>Add New Category</span>
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Category Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Waterfront Penthouses"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Archive Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('blog')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    type === 'blog'
                      ? 'bg-[#5870F7]/10 border-[#5870F7] text-[#5870F7]'
                      : 'bg-slate-50 border-slate-300 text-slate-600 hover:text-gray-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blog Topic</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('property')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    type === 'property'
                      ? 'bg-[#5870F7]/10 border-[#5870F7] text-[#5870F7]'
                      : 'bg-slate-50 border-slate-300 text-slate-600 hover:text-gray-900 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Property Type</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Archive Category</span>
            </button>
          </form>
        </div>

        {/* Existing Categories Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Blog Categories */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <FileText className="w-5 h-5 text-[#5870F7]" />
              <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Blog & Article Archives</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {blogCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Tag className="w-4 h-4 text-[#5870F7] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">{cat.name}</div>
                      <div className="text-xs text-slate-500 font-mono">/{cat.slug}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                      {cat.count}
                    </span>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Categories */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Home className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Property Type Archives</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {propCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderTree className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">{cat.name}</div>
                      <div className="text-xs text-slate-500 font-mono">/{cat.slug}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                      {cat.count}
                    </span>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
