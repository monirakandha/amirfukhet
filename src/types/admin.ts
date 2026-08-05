import { Property, BlogArticle, SuccessStory, GuidePageContent } from './index';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface AdminProfile extends AdminUser {
  password?: string;
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

export interface HeroSlide {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface HomepageContent {
  statsSection: {
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
    stat4Value: string; stat4Label: string;
  };
  advisorIntroSection: {
    pill: string;
    headline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  guideBannerSection: {
    pill: string;
    headline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  blogSection: {
    pill: string;
    headline: string;
  };
  categoriesSection: {
    pill: string;
    headline: string;
  };
  researchMetricsSection: {
    pill: string;
    headline: string;
    subheading: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
    stat4Value: string; stat4Label: string;
    buttonText: string;
    buttonLink: string;
  };
  meetAdvisorSection: {
    pill: string;
    headline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  featuredPropertiesSection: {
    pill: string;
    headline: string;
  };
  contactCtaSection: {
    pill: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface PageHeroContent {
  pill?: string;
  headline?: string;
  description?: string;
  bgImage?: string;
}

export interface AboutPageContent {
  heroPill?: string;
  heroHeadline?: string;
  heroDescription?: string;
  heroImage?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  storyHeadline?: string;
  storyDescription?: string;
  approachHeadline?: string;
  approachDescription?: string;
  calloutHeadline?: string;
  calloutSubheading?: string;
  calloutButtonText?: string;
  calloutButtonLink?: string;
  calloutImage?: string;
}

export interface WorkWithMePageContent {
  heroPill?: string;
  heroHeadline?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  advisorSectionTitle?: string;
  advisorSectionDescription?: string;
  advisorCard1Title?: string;
  advisorCard1Desc?: string;
  advisorCard2Title?: string;
  advisorCard2Desc?: string;
  advisorCard3Title?: string;
  advisorCard3Desc?: string;
  confidenceSectionPill?: string;
  confidenceSectionHeadline?: string;
  confidenceSectionImage?: string;
  confidenceItem1?: string;
  confidenceItem2?: string;
  confidenceItem3?: string;
  confidenceItem4?: string;
  confidenceItem5?: string;
  confidenceButtonText?: string;
  confidenceButtonLink?: string;
  processSectionPill?: string;
  processSectionHeadline?: string;
  processStep1Title?: string;
  processStep1Desc?: string;
  processStep2Title?: string;
  processStep2Desc?: string;
  processStep3Title?: string;
  processStep3Desc?: string;
  processStep4Title?: string;
  processStep4Desc?: string;
  ctaHeadline?: string;
  ctaDescription?: string;
  ctaButton1Text?: string;
  ctaButton1Link?: string;
  ctaButton2Text?: string;
  ctaButton2Link?: string;
}

export interface ContactPageContent {
  heroPill?: string;
  heroHeadline?: string;
  heroDescription?: string;
  fastestWaysHeadline?: string;
  whatsappCardTitle?: string;
  whatsappCardDesc?: string;
  emailCardTitle?: string;
  emailCardDesc?: string;
  formTitle?: string;
  formButtonText?: string;
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
  heroSlides?: HeroSlide[];
  homepageContent?: HomepageContent;
  navbarLinks?: { name: string; path: string; isVisible: boolean; order: number; }[];
  pagesContent?: {
    insightsHero?: PageHeroContent;
    listingsHero?: PageHeroContent;
    successStoriesHero?: PageHeroContent;
    aboutPage?: AboutPageContent;
    workWithMePage?: WorkWithMePageContent;
    contactPage?: ContactPageContent;
  };
  globalCTA?: {
    headline?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
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
  adminProfile: AdminProfile;
  properties: Property[];
  blogs: BlogArticle[];
  successStories: SuccessStory[];
  faqs: FAQItem[];
  categories: CategoryItem[];
  settings: SiteSettings;
  contactSubmissions: ContactSubmission[];
  newsletterSubmissions: NewsletterSubmission[];
  guideContent: GuidePageContent;
}
