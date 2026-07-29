'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Property } from '@/types';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Check, 
  X, 
  Star, 
  Home, 
  DollarSign, 
  Layers, 
  Bed, 
  Bath, 
  Maximize, 
  Image as ImageIcon,
  ArrowLeft 
} from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { RichTextEditor } from './RichTextEditor';

export const PropertiesManager: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState<Property | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('1500000');
  const [formattedPrice, setFormattedPrice] = useState('$1,500,000');
  const [propertyType, setPropertyType] = useState('Villa');
  const [ownershipType, setOwnershipType] = useState('Freehold');
  const [status, setStatus] = useState<Property['status']>('for-sale');
  const [beds, setBeds] = useState('4');
  const [baths, setBaths] = useState('4');
  const [sqft, setSqft] = useState('5200');
  const [areaSqM, setAreaSqM] = useState('480');
  const [address, setAddress] = useState('Millionaires Mile, Kamala');
  const [city, setCity] = useState('Phuket');
  const [description, setDescription] = useState('An exceptional luxury villa with panoramic ocean views.');
  const [images, setImages] = useState('/images/villa-hero.png, /images/villa-hero.png');
  const [imageList, setImageList] = useState<string[]>(['/images/villa-hero.png']);
  const [featured, setFeatured] = useState(false);

  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAddModal = () => {
    setEditingProp(null);
    setTitle('');
    setSlug('');
    setPrice('1500000');
    setFormattedPrice('$1,500,000');
    setPropertyType('Villa');
    setOwnershipType('Freehold');
    setStatus('for-sale');
    setBeds('4');
    setBaths('4');
    setSqft('5000');
    setAreaSqM('460');
    setAddress('Kamala Beach, Phuket');
    setCity('Phuket');
    setDescription('Stunning contemporary villa designed for luxury living.');
    setImages('/images/villa-hero.png');
    setImageList(['/images/villa-hero.png']);
    setFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProp(prop);
    setTitle(prop.title);
    setSlug(prop.slug);
    setPrice(prop.price.toString());
    setFormattedPrice(prop.formattedPrice);
    setPropertyType(prop.propertyType);
    setOwnershipType(prop.ownershipType || 'Freehold');
    setStatus(prop.status);
    setBeds(prop.features.beds.toString());
    setBaths(prop.features.baths.toString());
    setSqft(prop.features.sqft.toString());
    setAreaSqM((prop.areaSqM || 450).toString());
    setAddress(prop.location.address);
    setCity(prop.location.city);
    setDescription(prop.description);
    setImages(prop.images.join(', '));
    setImageList(prop.images.length > 0 ? prop.images : ['/images/villa-hero.png']);
    setFeatured(prop.featured || false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedImages = imageList.filter(Boolean).length > 0
      ? imageList.filter(Boolean)
      : images.split(',').map((s) => s.trim()).filter(Boolean);
    const numPrice = parseFloat(price) || 0;

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      price: numPrice,
      formattedPrice: formattedPrice || `$${numPrice.toLocaleString()}`,
      ownershipType,
      areaSqM: parseFloat(areaSqM) || 0,
      status,
      propertyType,
      location: {
        address,
        city,
        state: 'Phuket',
        zip: '83110',
      },
      features: {
        beds: parseInt(beds) || 1,
        baths: parseInt(baths) || 1,
        sqft: parseInt(sqft) || 1000,
        garage: 2,
        yearBuilt: 2025,
      },
      images: parsedImages.length > 0 ? parsedImages : ['/images/villa-hero.png'],
      description,
      amenities: ['Private Infinity Pool', 'Ocean View', '24/7 Security', 'Smart Home System'],
      featured,
      agent: {
        name: 'Amir Ahmed Faisal',
        title: 'Property Investment Advisor',
        phone: '+880 1875 189361',
        email: 'amir@amirphuket.com',
        avatar: '/images/amir.png',
      },
    };

    if (editingProp) {
      updateProperty(editingProp.id, payload);
      showToast('Property updated successfully!');
    } else {
      addProperty(payload);
      showToast('New property created successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProperty(id);
      showToast('Property deleted.');
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.location.address.toLowerCase().includes(search.toLowerCase()) ||
                          p.location.city.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || p.propertyType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
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
              {editingProp ? 'Edit Property Details' : 'Add New Luxury Property'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Property Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Oceanfront Sunset Villa"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Slug (URL Path)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="oceanfront-sunset-villa"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Price (USD number)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2500000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Formatted Display Price</label>
              <input
                type="text"
                required
                value={formattedPrice}
                onChange={(e) => setFormattedPrice(e.target.value)}
                placeholder="$2,500,000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
              >
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Ownership Structure</label>
              <select
                value={ownershipType}
                onChange={(e) => setOwnershipType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
              >
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Foreign Quota Freehold">Foreign Quota Freehold</option>
                <option value="Thai Company Ownership">Thai Company Ownership</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 font-medium"
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="pending">Under Offer / Pending</option>
                <option value="sold">Sold / Closed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">City / District</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Phuket / Kamala"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Bedrooms</label>
              <input
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Bathrooms</label>
              <input
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Area (m²)</label>
              <input
                type="number"
                value={areaSqM}
                onChange={(e) => setAreaSqM(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Street Address / Location</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Millionaires Mile, Kamala Beach"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20"
            />
          </div>

          {/* Multi-Image Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Property Images</label>
              <button
                type="button"
                onClick={() => setImageList((prev) => [...prev, ''])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#5870F7] text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Add Image
              </button>
            </div>
            <div className="space-y-3">
              {imageList.map((img, idx) => (
                <div key={idx} className="relative">
                  <MediaPickerButton
                    label={idx === 0 ? 'Hero / Cover Image' : `Additional Image ${idx + 1}`}
                    required={idx === 0}
                    value={img}
                    onChange={(url) => {
                      const next = [...imageList];
                      next[idx] = url;
                      setImageList(next);
                    }}
                  />
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => setImageList((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-0 right-0 text-[11px] text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Description</label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[250px] [&_.ql-editor]:min-h-[250px]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded text-[#5870F7] bg-white border-slate-300 focus:ring-[#5870F7]"
            />
            <label htmlFor="featured" className="text-sm text-gray-800 font-medium cursor-pointer">
              Feature this property on the homepage showcase
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
              {editingProp ? 'Save Changes' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 relative">
      {/* Toast Notification */}
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
            Properties Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Create, edit, and manage all luxury villas and penthouses displayed in the property catalog.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Property</span>
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
            placeholder="Search by title, location..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#5870F7]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600 uppercase font-heading-bricolage">Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] font-medium"
          >
            <option value="all">All Types</option>
            <option value="villa">Villas</option>
            <option value="apartment">Apartments</option>
            <option value="penthouse">Penthouses</option>
            <option value="condo">Condominiums</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold font-heading-bricolage">
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Type & Ownership</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Specs</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                    No properties match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={prop.images[0] || '/images/villa-hero.png'}
                          alt={prop.title}
                          className="w-16 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate max-w-xs flex items-center gap-1.5">
                            <span>{prop.title}</span>
                            {prop.featured && (
                              <span title="Featured on Homepage" className="text-amber-500">
                                <Star className="w-3.5 h-3.5 fill-amber-500 inline" />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                            <MapPin className="w-3 h-3 text-[#5870F7]" />
                            <span>{prop.location.address}, {prop.location.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{prop.propertyType}</div>
                      <div className="text-xs text-slate-500 font-medium">{prop.ownershipType || 'Freehold'}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-emerald-600 font-mono text-base">{prop.formattedPrice}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-slate-700 flex items-center gap-3 font-medium">
                        <span>🛏️ {prop.features.beds}</span>
                        <span>🚿 {prop.features.baths}</span>
                        <span>📐 {prop.areaSqM || 450}m²</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${
                        prop.status === 'for-sale' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        prop.status === 'sold' ? 'bg-slate-200 text-slate-700' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {prop.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prop)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Edit Property"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id, prop.title)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Property"
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
