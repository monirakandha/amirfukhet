'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, BlogArticle, SuccessStory } from '@/types';
import { 
  AdminUser, 
  FAQItem, 
  CategoryItem, 
  SiteSettings, 
  ContactSubmission, 
  NewsletterSubmission, 
  AdminStoreState 
} from '@/types/admin';
import { mockProperties, mockBlogs, mockSuccessStories } from '@/data/mockData';

const STORE_KEY = 'amir_phuket_admin_store_v1';

const defaultSettings: SiteSettings = {
  siteTitle: 'AMIR KNOWS PHUKET',
  tagline: 'Invest in Phuket Property with Trusted Advisors, Guided by Expertise.',
  logoUrl: '',
  faviconUrl: '/favicon.ico',
  footerDescription: 'Independent research, honest guidance, and the full picture from ownership structures to rental yields so international buyers invest in Thailand with confidence.',
  copyrightText: '© 2026 Amir Knows Phuket. All rights reserved. Professional Property Investment Advice.',
  contactEmail: 'amir@amirphuket.com',
  contactPhone: '+66 81 234 5678',
  officeAddress: 'Laguna Phuket, Cherngtalay, Thalang District, Phuket 83110, Thailand',
  buttonLinks: {
    whatsappUrl: 'https://wa.me/8801875189361',
    whatsappNumber: '+880 1875 189361',
    freeGuideUrl: '/guide',
    scheduleViewingUrl: '/contact-us',
  },
  socialLinks: {
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
  },
  homepageImages: {
    heroBg: '/images/hero-bg.jpg',
    guideBannerBg: '/images/hero-bg.jpg',
    advisorImage: '/images/amir-seated.png',
    meetAdvisorImage: '/images/amir-seated.png',
    readyBannerBg: '/images/resort-cta-bg.png',
  },
  heroSlides: [
    {
      id: 'slide-1',
      image: '/images/hero-bg.jpg',
      subtitle: 'Welcome Property Investment Advisor Phuket',
      title: 'Invest in Phuket Property with Trusted Advisors, Not Salespeople.',
      description: 'Everything from ownership structures and the legal process to taxes, financing, due diligence and the real risks — the single resource every foreign buyer should read before sending a message.',
      primaryButtonText: 'Talk to Amir on WhatsApp',
      primaryButtonLink: 'https://wa.me/8801875189361',
      secondaryButtonText: 'Read the free guide',
      secondaryButtonLink: '/guide',
    }
  ],
};

const defaultFaqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can a foreigner own land in Thailand?',
    answer: 'Not freehold in their own name. Foreigners commonly secure villas and land through long leaseholds or properly structured arrangements – which is exactly where professional legal advice protects you.',
    category: 'legal',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'What is the foreign quota on condos?',
    answer: 'By Thai law, up to 49% of the total registrable floor area of a condominium building can be owned freehold by foreign nationals in their own personal name, providing complete and permanent title deed ownership.',
    category: 'legal',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'What taxes and fees apply when buying property in Phuket?',
    answer: 'Transfer fee is typically 2% (usually split 50/50 between buyer and seller). Specific Business Tax (SBT) of 3.3% or Stamp Duty of 0.5% applies depending on seller tenure. Withholding tax depends on appraisal value.',
    category: 'buying-process',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'Can foreigners get a mortgage in Thailand?',
    answer: 'While standard Thai domestic banks generally do not lend directly to non-resident foreigners without a local work permit, offshore financing options and developer financing arrangements exist for qualified buyers.',
    category: 'investment',
    order: 4,
  },
];

const defaultCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Luxury Villas', slug: 'luxury-villas', type: 'property', count: 12 },
  { id: 'cat-2', name: 'Beachfront Condominiums', slug: 'beachfront-condos', type: 'property', count: 8 },
  { id: 'cat-3', name: 'Penthouse Residences', slug: 'penthouses', type: 'property', count: 4 },
  { id: 'cat-4', name: 'Market Analysis', slug: 'market-analysis', type: 'blog', count: 6 },
  { id: 'cat-5', name: 'Legal & Ownership', slug: 'legal-ownership', type: 'blog', count: 5 },
  { id: 'cat-6', name: 'Investment Guides', slug: 'investment-guides', type: 'blog', count: 7 },
];

const defaultContactSubmissions: ContactSubmission[] = [
  {
    id: 'sub-1',
    name: 'Johnathan Sterling',
    email: 'j.sterling@sterlingcap.com',
    phone: '+44 7700 900077',
    type: 'schedule-tour',
    propertyTitle: 'Modern Sea-View Villa in Kamala',
    message: 'Looking for a 3-bedroom panoramic sea-view villa in Kamala or Surin under $1.8M. Ready to visit next week.',
    submittedAt: '2026-07-25 14:30',
    status: 'new',
  },
  {
    id: 'sub-2',
    name: 'Sarah Jenkins',
    email: 'sjenkins@globaltech.io',
    phone: '+65 9123 4567',
    type: 'home-valuation',
    propertyTitle: 'Laguna Beachfront Apartment',
    message: 'Interested in understanding rental yields and management fee structures for 2-bed units in Bang Tao area.',
    submittedAt: '2026-07-24 09:15',
    status: 'read',
  },
];

const defaultNewsletterSubmissions: NewsletterSubmission[] = [
  { id: 'nl-1', emailOrPhone: 'alex.investor@gmail.com', source: 'Free Lead Magnet - Home Page', subscribedAt: '2026-07-26 10:12', status: 'active' },
  { id: 'nl-2', emailOrPhone: 'marcus.v@yahoo.com', source: 'The Complete Phuket Guide Opt-in', subscribedAt: '2026-07-25 18:45', status: 'active' },
  { id: 'nl-3', emailOrPhone: '+6598765432', source: 'WhatsApp Direct Lead Magnet', subscribedAt: '2026-07-24 21:05', status: 'active' },
];

import { GuidePageContent } from '@/types';

const defaultGuideContent: GuidePageContent = {
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
  section1: {
    heading: 'Can foreigners actually own property in Thailand?',
    paragraph1: 'Yes – but how you own it matters more than anything else in this guide. Foreigners can freehold-own condominium units within the 49% foreign quota of a building, and can hold land and villas through long leaseholds or properly structured arrangements. Getting this right is the difference between a secure asset and an expensive lesson.',
    paragraph2: 'The published guide walks through each path in plain language, with worked examples and the questions to ask before you commit to either route.',
  },
  section2: {
    heading: 'Freehold vs leasehold',
    description: 'A comparison table, the protections that matter on a lease, and when each route makes sense.',
    freeholdCardTitle: 'Freehold',
    freeholdCardDesc: 'Outright ownership of a condo unit within the foreign quota. Simplest, most liquid, fully in your name.',
    leaseholdCardTitle: 'Leasehold',
    leaseholdCardDesc: 'Typically 30 years + renewals for villas/land. Protection is in the lease terms – this is where guidance pays for itself.',
  },
  section3: {
    heading: 'The step-by-step buying process',
    step1: 'Define budget, area and goal (lifestyle vs yield)',
    step2: 'Shortlist, view, and verify the developer / title',
    step3: 'Legal due diligence & reservation agreement',
    step4: 'Transfer of funds, contract & registration at Land Office',
  },
  section4: {
    heading: 'Taxes & transfer fees',
    content: 'Understanding Land Department registration fees (2%), withholding tax, specific business tax (3.3%), and stamp duty (0.5%), and how fees are split between buyer and seller in Phuket transactions.',
  },
  section5: {
    heading: 'Financing options',
    content: 'Financing solutions available for non-resident buyers in Thailand, developer payment plans during construction, and international offshore bank mortgage solutions.',
  },
  section6: {
    heading: 'Due diligence checklist',
    content: 'Title search verification at the Phuket Land Department, environmental impact assessment (EIA) verification, developer track record check, and building permit confirmation.',
  },
  section7: {
    heading: 'The real risks',
    content: 'Unpacking common legal traps, unverified developer promises, non-renewable lease clauses, and illegal Thai nominee company structures to avoid.',
  },
  sectionFaq: {
    heading: 'Frequently asked questions',
    description: 'Structured with FAQ schema – built to surface in Google snippets and AI search answers.',
  }
};

interface AdminContextType extends AdminStoreState {
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  // Properties
  addProperty: (prop: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, updated: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  // Blogs
  addBlog: (blog: Omit<BlogArticle, 'id' | 'publishedAt'>) => void;
  updateBlog: (id: string, updated: Partial<BlogArticle>) => void;
  deleteBlog: (id: string) => void;
  // Success Stories
  addStory: (story: Omit<SuccessStory, 'id'>) => void;
  updateStory: (id: string, updated: Partial<SuccessStory>) => void;
  deleteStory: (id: string) => void;
  // FAQs
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  updateFaq: (id: string, updated: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;
  // Categories
  addCategory: (cat: Omit<CategoryItem, 'id'>) => void;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;
  // Settings
  updateSiteSettings: (updated: Partial<SiteSettings>) => void;
  uploadLogo: (base64Url: string) => void;
  uploadFavicon: (base64Url: string) => void;
  // Inquiries & Newsletters
  addContactSubmission: (sub: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  markContactStatus: (id: string, status: ContactSubmission['status']) => void;
  deleteContactSubmission: (id: string) => void;
  addNewsletterSubmission: (emailOrPhone: string, source: string) => void;
  deleteNewsletterSubmission: (id: string) => void;
  // Guide Content
  updateGuideContent: (updated: Partial<GuidePageContent>) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AdminStoreState>({
    isAuthenticated: false,
    user: null,
    properties: mockProperties,
    blogs: mockBlogs,
    successStories: mockSuccessStories,
    faqs: defaultFaqs,
    categories: defaultCategories,
    settings: defaultSettings,
    contactSubmissions: defaultContactSubmissions,
    newsletterSubmissions: defaultNewsletterSubmissions,
    guideContent: defaultGuideContent,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Merge mockSuccessStories properties into parsed success stories if they match by id/slug
        const savedStories = parsed.successStories || [];
        const updatedStories = savedStories.map((savedStory: SuccessStory) => {
          const mockStory = mockSuccessStories.find(m => m.id === savedStory.id || m.slug === savedStory.slug);
          if (mockStory) {
            return {
              ...mockStory,
              ...savedStory,
              steps: savedStory.steps && savedStory.steps.length > 0 ? savedStory.steps : mockStory.steps,
              metrics: savedStory.metrics && savedStory.metrics.length > 0 ? savedStory.metrics : mockStory.metrics,
            };
          }
          return savedStory;
        });
        
        const missingStories = mockSuccessStories.filter(
          mockStory => !savedStories.some((s: SuccessStory) => s.id === mockStory.id || s.slug === mockStory.slug)
        );
        
        const mergedStories = [...updatedStories, ...missingStories];

        // Merge mockBlogs properties into parsed blogs to handle new fields (quote, subscribe, faqs)
        const savedBlogs = parsed.blogs || [];
        const updatedBlogs = savedBlogs.map((savedBlog: BlogArticle) => {
          const mockBlog = mockBlogs.find(m => m.id === savedBlog.id || m.slug === savedBlog.slug);
          if (mockBlog) {
            return {
              ...mockBlog,
              ...savedBlog,
              // For new add-on fields, fallback to mockData if not present in saved state
              quoteText: savedBlog.quoteText !== undefined ? savedBlog.quoteText : mockBlog.quoteText,
              showSubscribeBox: savedBlog.showSubscribeBox !== undefined ? savedBlog.showSubscribeBox : mockBlog.showSubscribeBox,
              postFaqs: savedBlog.postFaqs !== undefined ? savedBlog.postFaqs : mockBlog.postFaqs,
              // Force overwrite content for 'freehold-vs-leasehold-in-phuket' to reset to the shortcode version
              // because react-quill strips out the complex HTML and corrupts the saved content.
              content: savedBlog.slug === 'freehold-vs-leasehold-in-phuket' ? mockBlog.content : (savedBlog.content || mockBlog.content),
            };
          }
          return savedBlog;
        });
        
        const missingBlogs = mockBlogs.filter(
          mockBlog => !savedBlogs.some((s: BlogArticle) => s.id === mockBlog.id || s.slug === mockBlog.slug)
        );
        
        const mergedBlogs = [...updatedBlogs, ...missingBlogs];

        setState((prev) => ({
          ...prev,
          ...parsed,
          successStories: mergedStories,
          blogs: mergedBlogs,
          guideContent: parsed.guideContent || defaultGuideContent,
          // Make sure auth stays active if token is present
          isAuthenticated: parsed.isAuthenticated || false,
        }));
      }
    } catch (e) {
      console.error('Failed to load admin store from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever state changes after initial load
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save admin store to localStorage', e);
      }
    }
  }, [state, isLoaded]);

  const login = (email: string, pass: string): boolean => {
    // Default admin login credentials
    if ((email === 'admin@amirphuket.com' || email === 'admin@amirphuket.org' || email === 'admin') && pass === 'admin123') {
      const adminUser: AdminUser = {
        email: 'admin@amirphuket.com',
        name: 'Amir Ahmed Faisal',
        role: 'Super Admin',
        avatar: '/images/amir.png',
      };
      setState((prev) => ({ ...prev, isAuthenticated: true, user: adminUser }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setState((prev) => ({ ...prev, isAuthenticated: false, user: null }));
  };

  // Property CRUD
  const addProperty = (prop: Omit<Property, 'id' | 'createdAt'>) => {
    const newProp: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setState((prev) => ({ ...prev, properties: [newProp, ...prev.properties] }));
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProperty = (id: string) => {
    setState((prev) => ({ ...prev, properties: prev.properties.filter((p) => p.id !== id) }));
  };

  // Blog CRUD
  const addBlog = (blog: Omit<BlogArticle, 'id' | 'publishedAt'>) => {
    const newBlog: BlogArticle = {
      ...blog,
      id: `blog-${Date.now()}`,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setState((prev) => ({ ...prev, blogs: [newBlog, ...prev.blogs] }));
  };

  const updateBlog = (id: string, updated: Partial<BlogArticle>) => {
    setState((prev) => ({
      ...prev,
      blogs: prev.blogs.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  };

  const deleteBlog = (id: string) => {
    setState((prev) => ({ ...prev, blogs: prev.blogs.filter((b) => b.id !== id) }));
  };

  // Success Story CRUD
  const addStory = (story: Omit<SuccessStory, 'id'>) => {
    const newStory: SuccessStory = {
      ...story,
      id: `story-${Date.now()}`,
    };
    setState((prev) => ({ ...prev, successStories: [newStory, ...prev.successStories] }));
  };

  const updateStory = (id: string, updated: Partial<SuccessStory>) => {
    setState((prev) => ({
      ...prev,
      successStories: prev.successStories.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteStory = (id: string) => {
    setState((prev) => ({ ...prev, successStories: prev.successStories.filter((s) => s.id !== id) }));
  };

  // FAQ CRUD
  const addFaq = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
    };
    setState((prev) => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
  };

  const updateFaq = (id: string, updated: Partial<FAQItem>) => {
    setState((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const deleteFaq = (id: string) => {
    setState((prev) => ({ ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }));
  };

  // Category CRUD
  const addCategory = (cat: Omit<CategoryItem, 'id'>) => {
    const newCat: CategoryItem = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setState((prev) => ({ ...prev, categories: [...prev.categories, newCat] }));
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setState((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
  };

  const deleteCategory = (id: string) => {
    setState((prev) => ({ ...prev, categories: prev.categories.filter((c) => c.id !== id) }));
  };

  // Settings
  const updateSiteSettings = (updated: Partial<SiteSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updated },
    }));
  };

  const uploadLogo = (base64Url: string) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, logoUrl: base64Url },
    }));
  };

  const uploadFavicon = (base64Url: string) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, faviconUrl: base64Url },
    }));
  };

  // Inquiries & Newsletters
  const addContactSubmission = (sub: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: ContactSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };
    setState((prev) => ({ ...prev, contactSubmissions: [newSub, ...prev.contactSubmissions] }));
  };

  const markContactStatus = (id: string, status: ContactSubmission['status']) => {
    setState((prev) => ({
      ...prev,
      contactSubmissions: prev.contactSubmissions.map((s) => (s.id === id ? { ...s, status } : s)),
    }));
  };

  const deleteContactSubmission = (id: string) => {
    setState((prev) => ({ ...prev, contactSubmissions: prev.contactSubmissions.filter((s) => s.id !== id) }));
  };

  const addNewsletterSubmission = (emailOrPhone: string, source: string) => {
    const newNl: NewsletterSubmission = {
      id: `nl-${Date.now()}`,
      emailOrPhone,
      source,
      subscribedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'active',
    };
    setState((prev) => ({ ...prev, newsletterSubmissions: [newNl, ...prev.newsletterSubmissions] }));
  };

  const deleteNewsletterSubmission = (id: string) => {
    setState((prev) => ({
      ...prev,
      newsletterSubmissions: prev.newsletterSubmissions.filter((n) => n.id !== id),
    }));
  };

  const updateGuideContent = (updated: Partial<GuidePageContent>) => {
    setState((prev) => ({
      ...prev,
      guideContent: { ...prev.guideContent, ...updated },
    }));
  };

  const resetToDefaults = () => {
    const defaultState: AdminStoreState = {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      properties: mockProperties,
      blogs: mockBlogs,
      successStories: mockSuccessStories,
      faqs: defaultFaqs,
      categories: defaultCategories,
      settings: defaultSettings,
      contactSubmissions: defaultContactSubmissions,
      newsletterSubmissions: defaultNewsletterSubmissions,
    };
    setState(defaultState);
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultState));
  };

  return (
    <AdminContext.Provider
      value={{
        ...state,
        login,
        logout,
        addProperty,
        updateProperty,
        deleteProperty,
        addBlog,
        updateBlog,
        deleteBlog,
        addStory,
        updateStory,
        deleteStory,
        addFaq,
        updateFaq,
        deleteFaq,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSiteSettings,
        uploadLogo,
        uploadFavicon,
        addContactSubmission,
        markContactStatus,
        deleteContactSubmission,
        addNewsletterSubmission,
        deleteNewsletterSubmission,
        updateGuideContent,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
