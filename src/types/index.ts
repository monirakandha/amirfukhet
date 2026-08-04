export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
}

export interface PropertyFeatures {
  beds: number;
  baths: number;
  sqft: number;
  garage: number;
  yearBuilt: number;
}

export interface AgentInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  formattedPrice: string;
  originalPriceFormatted?: string;
  ownershipType?: 'Freehold' | 'Leasehold' | string;
  areaSqM?: number;
  locationName?: string;
  status: 'for-sale' | 'for-rent' | 'pending' | 'sold';
  propertyType: 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse' | 'Commercial' | 'Single Family' | 'Condo' | string;
  location: Location;
  features: PropertyFeatures;
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  agent: AgentInfo;
  createdAt: string;
}

export interface PropertyFilterParams {
  status?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'sqft';
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  featured?: boolean;
  template?: 'default' | 'centered';
  quoteText?: string;
  showSubscribeBox?: boolean;
  contentSections?: { heading: string; content: string }[];
  postFaqs?: { question: string; answer: string }[];
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyStep {
  stepNumber?: string;
  title: string;
  body: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  location: string;
  propertyType: string;
  metricHighlight: string;
  image: string;
  clientName?: string;
  clientRole?: string;
  soldPrice?: number;
  daysOnMarket?: number;
  story?: string;
  testimonial?: string;
  dateClosed?: string;
  highlights?: string[];
  // Dynamic case study steps
  steps?: CaseStudyStep[];
  // 3 metrics for the metrics bar
  metrics?: CaseStudyMetric[];
  // Mark this as the featured story shown on the homepage
  isFeatured?: boolean;
}

export interface InquiryPayload {
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone: string;
  type: 'schedule-tour' | 'ask-question' | 'home-valuation' | 'general';
  preferredDate?: string;
  message: string;
}

export interface HomeValuationPayload {
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  notes?: string;
}

export interface GuidePageContent {
  heroImage: string;
  section1: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
  };
  section2: {
    heading: string;
    description: string;
    freeholdCardTitle: string;
    freeholdCardDesc: string;
    leaseholdCardTitle: string;
    leaseholdCardDesc: string;
  };
  section3: {
    heading: string;
    steps: string[];
  };
  section4: {
    heading: string;
    content: string;
  };
  section5: {
    heading: string;
    content: string;
  };
  section6: {
    heading: string;
    content: string;
  };
  section7: {
    heading: string;
    content: string;
  };
  sectionFaq: {
    heading: string;
    description: string;
  };
}
