'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { BlogArticle } from '@/types';
import { Plus, Search, Edit, Trash2, Check, X, Star, FileText, Calendar, Clock } from 'lucide-react';

export const BlogManager: React.FC = () => {
  const { blogs, addBlog, updateBlog, deleteBlog, categories } = useAdmin();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Market Analysis');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('/images/blog-luxury-villas.png');
  const [readTime, setReadTime] = useState('5');
  const [featured, setFeatured] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const blogCategories = categories.filter((c) => c.type === 'blog');

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle('');
    setSlug('');
    setCategory('Market Analysis');
    setSummary('In-depth overview of the latest real estate trends and yield opportunities in Phuket.');
    setContent('Phuket property continues to attract high-net-worth individuals from across the globe. By structuring leases correctly and focusing on prime coastal corridors like Kamala and Bang Tao, investors achieve exceptional returns.');
    setCoverImage('/images/blog-luxury-villas.png');
    setReadTime('6');
    setFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (b: BlogArticle) => {
    setEditingBlog(b);
    setTitle(b.title);
    setSlug(b.slug);
    setCategory(b.category);
    setSummary(b.summary);
    setContent(b.content);
    setCoverImage(b.coverImage || '/images/blog-luxury-villas.png');
    setReadTime(b.readTimeMinutes.toString());
    setFeatured(b.featured || false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      summary,
      content,
      coverImage: coverImage || '/images/blog-luxury-villas.png',
      readTimeMinutes: parseInt(readTime) || 5,
      tags: ['Phuket Property', category, 'Real Estate Investment'],
      featured,
      author: {
        name: 'Amir Ahmad Faisal',
        role: 'Property Investment Advisor',
        avatar: '/images/amir.png',
      },
    };

    if (editingBlog) {
      updateBlog(editingBlog.id, payload);
      showToast('Article updated successfully!');
    } else {
      addBlog(payload);
      showToast('New article published successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      deleteBlog(id);
      showToast('Article deleted.');
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                          b.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || b.category.toLowerCase() === selectedCat.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading-bricolage">
            Blog Posts Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Write, edit, and publish market insights, legal guides, and property news.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Article</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog articles..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#5870F7]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600 uppercase font-heading-bricolage">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] font-medium"
          >
            <option value="all">All Categories</option>
            {blogCategories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
            <option value="Market Analysis">Market Analysis</option>
            <option value="Legal & Ownership">Legal & Ownership</option>
            <option value="Investment Guides">Investment Guides</option>
          </select>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold font-heading-bricolage">
                <th className="py-4 px-6">Article</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Published Date</th>
                <th className="py-4 px-6">Read Time</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={b.coverImage || '/images/blog-luxury-villas.png'}
                          alt={b.title}
                          className="w-16 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate max-w-xs flex items-center gap-1.5">
                            <span>{b.title}</span>
                            {b.featured && (
                              <span title="Featured Article" className="text-amber-500">
                                <Star className="w-3.5 h-3.5 fill-amber-500 inline" />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">{b.summary}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.publishedAt}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.readTimeMinutes} min read</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(b)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-heading-bricolage">
                {editingBlog ? 'Edit Blog Article' : 'Publish New Article'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Article Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Why Phuket Luxury Villas Are Outperforming"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
                  >
                    <option value="Market Analysis">Market Analysis</option>
                    <option value="Legal & Ownership">Legal & Ownership</option>
                    <option value="Investment Guides">Investment Guides</option>
                    <option value="Luxury Living">Luxury Living</option>
                    {blogCategories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Cover Image URL</label>
                  <input
                    type="text"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/images/blog-luxury-villas.png"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Estimated Read Time (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Summary Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Short summary displayed on cards..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Full Article Content (Markdown / Text)</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write full deep-dive content here..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredBlog"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#5870F7] bg-white border-slate-300 focus:ring-[#5870F7]"
                />
                <label htmlFor="featuredBlog" className="text-sm text-gray-800 font-medium cursor-pointer">
                  Feature this article as the hero topic
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
