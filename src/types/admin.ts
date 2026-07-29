import { Property, BlogArticle, SuccessStory } from './index';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'legal' | 'investment' | 'buying-process';
  order: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: 'blog' | 'property';
  count: number;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  footerDescription: string;
  copyrightText: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  buttonLinks: {
    whatsappUrl: string;
    whatsappNumber: string;
    freeGuideUrl: string;
    scheduleViewingUrl: string;
  };
  socialLinks: {
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
    twitter?: string;
  };
  homepageImages?: {
    heroBg: string;
    guideBannerBg: string;
    advisorImage: string;
    meetAdvisorImage?: string;
    readyBannerBg: string;
  };
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  propertyTitle?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface NewsletterSubmission {
  id: string;
  emailOrPhone: string;
  source: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface AdminStoreState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  properties: Property[];
  blogs: BlogArticle[];
  successStories: SuccessStory[];
  faqs: FAQItem[];
  categories: CategoryItem[];
  settings: SiteSettings;
  contactSubmissions: ContactSubmission[];
  newsletterSubmissions: NewsletterSubmission[];
}
