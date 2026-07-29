'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Upload, Trash2, Copy, Check, Image as ImageIcon,
  RefreshCw, X, Search, FolderOpen, AlertCircle, ExternalLink,
} from 'lucide-react';

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
}

interface MediaManagerProps {
  /** When used as a picker (from BlogManager etc.) — callback with selected URL */
  onSelect?: (url: string) => void;
  /** Whether rendered inside a modal picker (hides full page chrome) */
  pickerMode?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const MediaManager: React.FC<MediaManagerProps> = ({ onSelect, pickerMode = false }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [dragging, setDragging] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 3500);
  };

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      showToast('Failed to load media library', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const uploadFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress(40);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      setUploadProgress(80);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setUploadProgress(100);
      showToast(`"${file.name}" uploaded successfully!`);
      await loadFiles();
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm(`Delete "${filename}"? This cannot be undone.`)) return;
    setDeleting(filename);
    try {
      const res = await fetch(`/api/upload?file=${encodeURIComponent(filename)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showToast('File deleted.');
      if (selectedFile === filename) setSelectedFile(null);
      await loadFiles();
    } catch {
      showToast('Could not delete file', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const handleSelect = (url: string) => {
    if (pickerMode && onSelect) {
      onSelect(url);
    } else {
      setSelectedFile(selectedFile === url ? null : url);
    }
  };

  const filteredFiles = files.filter((f) =>
    f.filename.toLowerCase().includes(search.toLowerCase())
  );

  // ── Drop Zone ──
  const DropZone = () => (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
        dragging
          ? 'border-[#5870F7] bg-blue-50 scale-[1.01]'
          : 'border-gray-300 bg-gray-50 hover:border-[#5870F7] hover:bg-blue-50/40'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileInput}
      />
      {uploading ? (
        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#5870F7] animate-spin" />
            <span className="text-sm font-semibold text-[#5870F7]">Uploading…</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#5870F7] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center">
            <Upload className="w-7 h-7 text-[#5870F7]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">
              {dragging ? 'Drop to upload' : 'Drag & drop an image, or click to browse'}
            </p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, GIF · Max 10 MB</p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`${pickerMode ? '' : 'p-6 sm:p-8'} space-y-6 relative`}>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[999] px-5 py-3 rounded-2xl text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-bounce ${
            toastType === 'error' ? 'bg-red-500' : 'bg-emerald-500'
          }`}
        >
          {toastType === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      {!pickerMode && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-heading-bricolage">Media Library</h2>
            <p className="text-sm text-slate-500 mt-1">
              Upload and manage images for blogs, properties, and success stories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              {files.length} file{files.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={loadFiles}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Vercel notice */}
      {!pickerMode && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">Self-hosted / VPS:</span> Files are stored in{' '}
            <code className="bg-amber-100 px-1 rounded text-xs">/public/uploads/</code> on your server and
            served as static assets. On Vercel, uploads are ephemeral — use a VPS/cPanel Node.js host for
            persistent storage.
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <DropZone />

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files…"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] transition-colors"
        />
      </div>

      {/* Picker mode — confirm button */}
      {pickerMode && selectedFile && onSelect && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <span className="text-sm text-blue-800 font-medium truncate max-w-xs">{selectedFile}</span>
          <button
            onClick={() => onSelect(selectedFile)}
            className="px-4 py-1.5 rounded-lg bg-[#5870F7] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shrink-0 ml-3"
          >
            Use this image
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <FolderOpen className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">
              {search ? 'No files match your search' : 'No images uploaded yet'}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {search ? 'Try a different search term' : 'Upload your first image above'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => {
            const isSelected = selectedFile === file.url;
            const isCopied = copiedUrl === file.url;
            const isBeingDeleted = deleting === file.filename;
            return (
              <div
                key={file.filename}
                onClick={() => handleSelect(file.url)}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-[#5870F7] ring-4 ring-[#5870F7]/20 scale-[1.02]'
                    : 'border-gray-200 hover:border-[#5870F7]/50 hover:scale-[1.01]'
                } ${isBeingDeleted ? 'opacity-40 pointer-events-none' : ''}`}
              >
                {/* Thumbnail */}
                <img
                  src={file.url}
                  alt={file.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50' y='55' text-anchor='middle' font-size='12' fill='%2394a3b8'%3ENo preview%3C/text%3E%3C/svg%3E";
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 gap-1.5">
                  <p className="text-white text-[11px] font-semibold truncate leading-tight">
                    {file.filename}
                  </p>
                  <p className="text-white/70 text-[10px]">{formatBytes(file.size)}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {/* Copy URL */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(file.url); }}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-medium transition-colors backdrop-blur-sm"
                      title="Copy URL"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {isCopied ? 'Copied!' : 'Copy URL'}
                    </button>
                    {/* Open in new tab */}
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {/* Delete */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(file.filename); }}
                      className="p-1.5 rounded-lg bg-red-500/70 hover:bg-red-600 text-white transition-colors backdrop-blur-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Selected Check */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#5870F7] flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// MediaPickerButton — drop-in replacement for image URL inputs
// ──────────────────────────────────────────────
interface MediaPickerButtonProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export const MediaPickerButton: React.FC<MediaPickerButtonProps> = ({
  value,
  onChange,
  label = 'Cover Image',
  required = false,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSelect = (url: string) => {
    onChange(url);
    setPickerOpen(false);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">
          {label}
        </label>
      )}

      {/* Preview + controls */}
      <div className="flex gap-2">
        {/* Text input for manual URL entry */}
        <input
          type="text"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/my-image.jpg or https://..."
          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 min-w-0"
        />
        {/* Open media library button */}
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white text-sm font-semibold transition-colors shadow-sm"
          title="Open media library"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Library</span>
        </button>
      </div>

      {/* Thumbnail preview */}
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Media Library Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F0F4FF] flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-[#5870F7]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 font-heading-bricolage">Media Library</h3>
                  <p className="text-xs text-slate-500">Click an image to select it</p>
                </div>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">
              <MediaManager
                pickerMode
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
