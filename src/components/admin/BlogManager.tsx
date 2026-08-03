'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { BlogArticle } from '@/types';
import { Plus, Search, Edit, Trash2, Check, X, Star, FileText, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { RichTextEditor } from './RichTextEditor';

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
  const [template, setTemplate] = useState<'default' | 'centered'>('default');
  const [toast, setToast] = useState('');
  
  // Post Add-ons
  const [quoteText, setQuoteText] = useState('');
  const [showSubscribeBox, setShowSubscribeBox] = useState(false);
  const [postFaqs, setPostFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [contentSections, setContentSections] = useState<{ heading: string; content: string }[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const blogCategories = categories.filter((c) => c.type === 'blog');
  
  const categoryOptions = React.useMemo(() => {
    const defaults = ['Market Analysis', 'Legal & Ownership', 'Investment Guides', 'Luxury Living'];
    const fromCategories = blogCategories.map(c => c.name);
    const fromBlogs = blogs.map(b => b.category);
    return Array.from(new Set([...defaults, ...fromCategories, ...fromBlogs, ...customCategories])).filter(Boolean);
  }, [blogCategories, blogs, customCategories]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

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
    setTemplate('default');
    setQuoteText('');
    setShowSubscribeBox(false);
    setPostFaqs([]);
    setContentSections([]);
    setTags(['Phuket Property', 'Real Estate Investment']);
    setTagInput('');
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
    setTemplate(b.template || 'default');
    setQuoteText(b.quoteText || '');
    setShowSubscribeBox(b.showSubscribeBox || false);
    setPostFaqs(b.postFaqs || []);
    setContentSections(b.contentSections || []);
    setTags(b.tags || []);
    setTagInput('');
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
      tags: tags,
      featured,
      template,
      quoteText,
      showSubscribeBox,
      postFaqs,
      contentSections,
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

  if (isModalOpen) {
    return (
      <div className="p-6 sm:p-8 space-y-6 relative max-w-5xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-200 bg-slate-100 text-slate-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 font-heading-bricolage">
              {editingBlog ? 'Edit Blog Article' : 'Publish New Article'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    const newCat = window.prompt('Enter new category:');
                    if (newCat && newCat.trim()) {
                      const trimmed = newCat.trim();
                      setCustomCategories((prev) => [...prev, trimmed]);
                      setCategory(trimmed);
                    } else {
                      setCategory(category || categoryOptions[0]);
                    }
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                <option value="__add_new__" className="font-bold text-blue-600 bg-blue-50">+ Add New Category...</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Template Layout</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as 'default' | 'centered')}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
              >
                <option value="default">Default (Sidebar Layout)</option>
                <option value="centered">Centered (No Sidebar)</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Tags</label>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100">
                      {tag}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                        className="w-4 h-4 rounded-full hover:bg-blue-200 inline-flex items-center justify-center transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                        setTags([...tags, tagInput.trim()]);
                        setTagInput('');
                      }
                    }
                  }}
                  placeholder="Type a tag and press Enter"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MediaPickerButton
              label="Cover Image"
              required
              value={coverImage}
              onChange={setCoverImage}
            />
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
            <RichTextEditor
              value={summary}
              onChange={setSummary}
              placeholder="Short summary displayed on cards..."
              className="border border-slate-300 rounded-xl overflow-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Full Article Content (Markdown / Text)</label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write full deep-dive content here..."
              className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[400px] [&_.ql-editor]:min-h-[400px]"
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              💡 <strong className="text-slate-700">Tip:</strong> You can place the add-ons below anywhere in your content by typing <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">[quote]</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">[subscribe]</code>, or <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">[faq]</code>. If you don't use the shortcodes, they will automatically appear at the bottom of the article.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase font-heading-bricolage border-b border-slate-200 pb-3">Structured Content Sections</h3>
            <p className="text-sm text-gray-600">Instead of writing HTML in the editor above, you can add structured sections here. These will automatically generate a Table of Contents.</p>
            
            <div className="space-y-4">
              {contentSections.map((section, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) => {
                        const newSections = [...contentSections];
                        newSections[index].heading = e.target.value;
                        setContentSections(newSections);
                      }}
                      placeholder="Section Heading (e.g. Cost comparison)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 font-bold focus:outline-none focus:border-[#5870F7]"
                    />
                    <RichTextEditor
                      value={section.content}
                      onChange={(val) => {
                        const newSections = [...contentSections];
                        newSections[index].content = val;
                        setContentSections(newSections);
                      }}
                      placeholder="Section Content..."
                      className="border border-slate-200 rounded-lg overflow-hidden [&_.ql-container]:min-h-[150px]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSections = [...contentSections];
                      newSections.splice(index, 1);
                      setContentSections(newSections);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setContentSections([...contentSections, { heading: '', content: '' }])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Content Section
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase font-heading-bricolage border-b border-slate-200 pb-3">Post Add-ons (Optional)</h3>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showSubscribeBox"
                checked={showSubscribeBox}
                onChange={(e) => setShowSubscribeBox(e.target.checked)}
                className="w-5 h-5 rounded text-[#5870F7] bg-white border-slate-300 focus:ring-[#5870F7]"
              />
              <label htmlFor="showSubscribeBox" className="text-sm text-gray-800 font-medium cursor-pointer">
                Show Subscribe Banner
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Highlight Quote Text</label>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Enter a quote to highlight..."
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 min-h-[80px]"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Post FAQs</label>
              {postFaqs.map((faq, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const newFaqs = [...postFaqs];
                        newFaqs[index].question = e.target.value;
                        setPostFaqs(newFaqs);
                      }}
                      placeholder="Question"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => {
                        const newFaqs = [...postFaqs];
                        newFaqs[index].answer = e.target.value;
                        setPostFaqs(newFaqs);
                      }}
                      placeholder="Answer"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] min-h-[60px]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newFaqs = [...postFaqs];
                      newFaqs.splice(index, 1);
                      setPostFaqs(newFaqs);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPostFaqs([...postFaqs, { question: '', answer: '' }])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add FAQ Item
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featuredBlog"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded text-[#5870F7] bg-white border-slate-300 focus:ring-[#5870F7]"
            />
            <label htmlFor="featuredBlog" className="text-sm text-gray-800 font-medium cursor-pointer">
              Feature this article as the hero topic
            </label>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all"
            >
              {editingBlog ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    );
  }

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
                          <div 
                            className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium [&_p]:inline [&_br]:hidden"
                            dangerouslySetInnerHTML={{ __html: b.summary }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold whitespace-nowrap inline-block">
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

    </div>
  );
};
