'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { 
  Save, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Share2,
  LayoutTemplate
} from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { HeroSlide } from '@/types/admin';
import { Plus, Trash2 } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

export const SettingsManager: React.FC = () => {
  const { settings, updateSiteSettings, uploadLogo, uploadFavicon } = useAdmin();

  // Local Form States
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [tagline, setTagline] = useState(settings.tagline);
  const [footerDescription, setFooterDescription] = useState(settings.footerDescription);
  const [copyrightText, setCopyrightText] = useState(settings.copyrightText);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [officeAddress, setOfficeAddress] = useState(settings.officeAddress);

  // Button Links
  const [whatsappUrl, setWhatsappUrl] = useState(settings.buttonLinks.whatsappUrl);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.buttonLinks.whatsappNumber);
  const [freeGuideUrl, setFreeGuideUrl] = useState(settings.buttonLinks.freeGuideUrl);
  const [scheduleViewingUrl, setScheduleViewingUrl] = useState(settings.buttonLinks.scheduleViewingUrl);

  // Socials
  const [linkedin, setLinkedin] = useState(settings.socialLinks.linkedin);
  const [instagram, setInstagram] = useState(settings.socialLinks.instagram);
  const [youtube, setYoutube] = useState(settings.socialLinks.youtube);
  const [facebook, setFacebook] = useState(settings.socialLinks.facebook || '');
  const [twitter, setTwitter] = useState(settings.socialLinks.twitter || '');

  // Navbar Links
  const [navbarLinks, setNavbarLinks] = useState(settings.navbarLinks || []);

  // Homepage Images & Sliders
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(settings.heroSlides || []);
  const [guideBannerBg, setGuideBannerBg] = useState(settings.homepageImages?.guideBannerBg || '/images/skyline-bg.png');
  const [advisorImage, setAdvisorImage] = useState(settings.homepageImages?.advisorImage || '/images/amir-seated.png');
  const [meetAdvisorImage, setMeetAdvisorImage] = useState(settings.homepageImages?.meetAdvisorImage || '/images/amir-seated.png');
  const [readyBannerBg, setReadyBannerBg] = useState(settings.homepageImages?.readyBannerBg || '/images/resort-cta-bg.png');

  // Global CTA
  const [globalCtaHeadline, setGlobalCtaHeadline] = useState(settings.globalCTA?.headline || 'Ready to talk through your purchase?');
  const [globalCtaDescription, setGlobalCtaDescription] = useState(settings.globalCTA?.description || 'Message Amir directly. Honest, advisory, no pressure.');
  const [globalCtaPrimaryBtnText, setGlobalCtaPrimaryBtnText] = useState(settings.globalCTA?.primaryButtonText || 'Contact Amir on WhatsApp');
  const [globalCtaPrimaryBtnLink, setGlobalCtaPrimaryBtnLink] = useState(settings.globalCTA?.primaryButtonLink || 'https://wa.me/8801875189361');
  const [globalCtaSecondaryBtnText, setGlobalCtaSecondaryBtnText] = useState(settings.globalCTA?.secondaryButtonText || 'See how I work');
  const [globalCtaSecondaryBtnLink, setGlobalCtaSecondaryBtnLink] = useState(settings.globalCTA?.secondaryButtonLink || '/about');

  // Sidebar CTA
  const [sidebarCtaTitle, setSidebarCtaTitle] = useState(settings.sidebarCTA?.title || 'Get the PDF version');
  const [sidebarCtaDescription, setSidebarCtaDescription] = useState(settings.sidebarCTA?.description || 'Download this guide as a PDF with extra checklists to read later.');
  const [sidebarCtaButtonText, setSidebarCtaButtonText] = useState(settings.sidebarCTA?.buttonText || 'Download Free PDF');

  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadLogo(reader.result as string);
        showToast('New logo image uploaded and preview active!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadFavicon(reader.result as string);
        showToast('New favicon uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      siteTitle,
      tagline,
      footerDescription,
      copyrightText,
      contactEmail,
      contactPhone,
      officeAddress,
      buttonLinks: {
        whatsappUrl,
        whatsappNumber,
        freeGuideUrl,
        scheduleViewingUrl,
      },
      socialLinks: {
        linkedin,
        instagram,
        youtube,
        facebook,
        twitter,
      },
      homepageImages: {
        heroBg: heroSlides[0]?.image || '/images/hero-bg.jpg', // Fallback
        guideBannerBg,
        advisorImage,
        meetAdvisorImage,
        readyBannerBg,
      },
      heroSlides,
      navbarLinks,
      globalCTA: {
        headline: globalCtaHeadline,
        description: globalCtaDescription,
        primaryButtonText: globalCtaPrimaryBtnText,
        primaryButtonLink: globalCtaPrimaryBtnLink,
        secondaryButtonText: globalCtaSecondaryBtnText,
        secondaryButtonLink: globalCtaSecondaryBtnLink,
      },
      sidebarCTA: {
        title: sidebarCtaTitle,
        description: sidebarCtaDescription,
        buttonText: sidebarCtaButtonText,
      }
    });
    showToast('All site settings, branding, and button links saved successfully!');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 relative">
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
            Site & Link Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure header branding, footer descriptions, logo & favicon uploads, and interactive action buttons.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Save className="w-5 h-5" />
          <span>Save All Settings</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Branding & Uploads */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <ImageIcon className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Branding & Logo Uploads</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Logo Upload Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block font-heading-bricolage">Main Site Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="font-bold text-[#5870F7] text-xl">AP</span>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                    <Upload className="w-4 h-4 text-[#5870F7]" />
                    <span>Upload Logo Image</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  <p className="text-[11px] text-slate-500 font-medium">PNG, SVG, or JPG (max 2MB)</p>
                </div>
              </div>
            </div>

            {/* Favicon Upload Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase block font-heading-bricolage">Favicon / Browser Icon</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                  {settings.faviconUrl && settings.faviconUrl !== '/favicon.ico' ? (
                    <img src={settings.faviconUrl} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-2xl">🌐</span>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                    <Upload className="w-4 h-4 text-[#5870F7]" />
                    <span>Upload Favicon</span>
                    <input type="file" accept="image/*,.ico" onChange={handleFaviconUpload} className="hidden" />
                  </label>
                  <p className="text-[11px] text-slate-500 font-medium">ICO, PNG (32x32 recommended)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Site Title / Header Brand Name</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Hero Tagline / SEO Slogan</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Homepage Images */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <LayoutTemplate className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Homepage Images</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MediaPickerButton
              label="Guide Banner Background"
              value={guideBannerBg}
              onChange={setGuideBannerBg}
            />
            <MediaPickerButton
              label="Advisor Intro Image (Top)"
              value={advisorImage}
              onChange={setAdvisorImage}
            />
            <MediaPickerButton
              label="Meet Your Advisor Image (Bottom)"
              value={meetAdvisorImage}
              onChange={setMeetAdvisorImage}
            />
            <MediaPickerButton
              label="Ready When You Are Background"
              value={readyBannerBg}
              onChange={setReadyBannerBg}
            />
          </div>
        </div>


        {/* Section 3: Header & Footer Text */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <LinkIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">All Button's Links & Action URLs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Direct Chat URL</span>
              </label>
              <input
                type="text"
                value={whatsappUrl}
                onChange={(e) => setWhatsappUrl(e.target.value)}
                placeholder="https://wa.me/8801875189361"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
              <p className="text-[11px] text-slate-500 font-medium">Linked to all WhatsApp floating & header buttons</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Display Number</span>
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+880 1875 189361"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Free Guide Lead Magnet URL</span>
              </label>
              <input
                type="text"
                value={freeGuideUrl}
                onChange={(e) => setFreeGuideUrl(e.target.value)}
                placeholder="/guide"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>Schedule Viewing Button URL</span>
              </label>
              <input
                type="text"
                value={scheduleViewingUrl}
                onChange={(e) => setScheduleViewingUrl(e.target.value)}
                placeholder="/contact-us"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Header & Footer Text */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Header, Footer & Contact Info</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <Mail className="w-4 h-4 text-[#5870F7]" />
                <span>Primary Contact Email</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Office Direct Phone</span>
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 font-heading-bricolage">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Office Physical Address</span>
            </label>
            <input
              type="text"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Footer About Description</label>
            <div className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px]">
              <RichTextEditor
                value={footerDescription}
                onChange={(val) => setFooterDescription(val)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Copyright Text</label>
            <input
              type="text"
              value={copyrightText}
              onChange={(e) => setCopyrightText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
            />
          </div>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Share2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Social Media Profiles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">LinkedIn Profile URL</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/amir..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Instagram Profile URL</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">YouTube Channel URL</label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Facebook Page URL</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Twitter / X Profile URL</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://x.com/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Navbar Settings */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Globe className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Navbar Links</h2>
          </div>
          
          <div className="space-y-4">
            {navbarLinks.map((link, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Label</label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...navbarLinks];
                      newLinks[idx].name = e.target.value;
                      setNavbarLinks(newLinks);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Path</label>
                  <input
                    type="text"
                    value={link.path}
                    onChange={(e) => {
                      const newLinks = [...navbarLinks];
                      newLinks[idx].path = e.target.value;
                      setNavbarLinks(newLinks);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col items-center">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Visible</label>
                  <input
                    type="checkbox"
                    checked={link.isVisible}
                    onChange={(e) => {
                      const newLinks = [...navbarLinks];
                      newLinks[idx].isVisible = e.target.checked;
                      setNavbarLinks(newLinks);
                    }}
                    className="w-5 h-5 mt-2 rounded text-[#5870F7] focus:ring-[#5870F7]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sidebar CTA Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <LayoutTemplate className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Sidebar CTA (Blog)</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Title</label>
              <input
                type="text"
                value={sidebarCtaTitle}
                onChange={(e) => setSidebarCtaTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Description</label>
              <textarea
                value={sidebarCtaDescription}
                onChange={(e) => setSidebarCtaDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] min-h-[100px]"
              />
            </div>
            
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Button Text</label>
              <input
                type="text"
                value={sidebarCtaButtonText}
                onChange={(e) => setSidebarCtaButtonText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <LayoutTemplate className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Global Footer CTA</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Headline</label>
              <input
                type="text"
                value={globalCtaHeadline}
                onChange={(e) => setGlobalCtaHeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Description</label>
              <RichTextEditor
                value={globalCtaDescription}
                onChange={setGlobalCtaDescription}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Primary Button Text</label>
              <input
                type="text"
                value={globalCtaPrimaryBtnText}
                onChange={(e) => setGlobalCtaPrimaryBtnText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Primary Button Link</label>
              <input
                type="text"
                value={globalCtaPrimaryBtnLink}
                onChange={(e) => setGlobalCtaPrimaryBtnLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Secondary Button Text</label>
              <input
                type="text"
                value={globalCtaSecondaryBtnText}
                onChange={(e) => setGlobalCtaSecondaryBtnText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Secondary Button Link</label>
              <input
                type="text"
                value={globalCtaSecondaryBtnLink}
                onChange={(e) => setGlobalCtaSecondaryBtnLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
              />
            </div>
          </div>
        </div>

        {/* Sticky Footer Submit */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#5870F7] hover:bg-blue-600 text-white font-bold text-base shadow-md shadow-[#5870F7]/20 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save All Configuration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
