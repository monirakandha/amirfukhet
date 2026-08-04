'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Save, User, Lock, Camera, Mail, Shield } from 'lucide-react';

export const ProfileManager = () => {
  const { adminProfile, updateAdminProfile } = useAdmin();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (adminProfile) {
      setName(adminProfile.name || '');
      setEmail(adminProfile.email || '');
      setAvatar(adminProfile.avatar || '');
    }
  }, [adminProfile]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!name || !email) {
      alert('Name and Email are required.');
      return;
    }

    const updates: any = { name, email, avatar };

    // Handle password change if any password field is filled
    if (currentPassword || newPassword || confirmPassword) {
      setPasswordError('');
      
      if (currentPassword !== adminProfile.password) {
        setPasswordError('Current password is incorrect.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError('New passwords do not match.');
        return;
      }
      if (newPassword.length < 6) {
        setPasswordError('New password must be at least 6 characters.');
        return;
      }
      updates.password = newPassword;
    }

    updateAdminProfile(updates);
    
    // Clear password fields on successful save
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading-bricolage">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your admin account details and password.</p>
        </div>
        <button
          onClick={handleSaveProfile}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all self-start ${
            isSaved
              ? 'bg-emerald-500 text-white'
              : 'bg-[#5870F7] hover:bg-blue-600 text-white shadow-sm shadow-[#5870F7]/20'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Avatar */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-md">
                {avatar ? (
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#5870F7]/10 text-[#5870F7]">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-[#5870F7] text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg shadow-[#5870F7]/30 border-2 border-white">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{name || 'Admin'}</h3>
              <div className="text-xs text-[#5870F7] font-medium mt-1 flex items-center justify-center gap-1 bg-blue-50 py-1 px-2 rounded-full w-max mx-auto">
                <Shield className="w-3 h-3" />
                {adminProfile?.role || 'Super Admin'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 font-heading-bricolage border-b border-slate-100 pb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Email Address (Login ID)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 font-heading-bricolage border-b border-slate-100 pb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none transition-all"
                  placeholder="Enter current password to change"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none transition-all"
                  />
                </div>
              </div>
              
              {passwordError && (
                <div className="text-sm text-red-600 font-medium p-3 bg-red-50 rounded-xl border border-red-100">
                  {passwordError}
                </div>
              )}
              <p className="text-xs text-slate-500">Leave password fields blank if you do not wish to change it.</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveProfile}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isSaved
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#5870F7] hover:bg-blue-600 text-white shadow-md shadow-[#5870F7]/20 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <Save className="w-5 h-5" />
              {isSaved ? 'Profile Saved!' : 'Save Profile Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
