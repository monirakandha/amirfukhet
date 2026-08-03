import { Property, BlogArticle, SuccessStory, InquiryPayload, HomeValuationPayload, PropertyFilterParams } from '@/types';
import { mockProperties, mockBlogs, mockSuccessStories } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Helper to get live data from Admin Store (if saved in localStorage)
 */
function getLocalAdminStore(): any {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amir_phuket_admin_store_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

/**
 * Service Layer for Node.js REST API integration.
 * Will automatically attempt to fetch from Node.js backend if NEXT_PUBLIC_API_URL is configured.
 * Gracefully falls back to rich mock data when offline or during frontend development.
 */

export async function fetchProperties(params?: PropertyFilterParams): Promise<Property[]> {
  if (API_BASE_URL) {
    try {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const res = await fetch(`${API_BASE_URL}/api/properties?${queryString}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Node.js backend API unreachable, using local mock data:', error);
    }
  }

  // Local filtering logic on mock / admin data
  const store = getLocalAdminStore();
  let result = store?.properties ? [...store.properties] : [...mockProperties];

  if (params) {
    if (params.status && params.status !== 'all') {
      result = result.filter((p) => p.status === params.status);
    }
    if (params.propertyType && params.propertyType !== 'all') {
      result = result.filter((p) => p.propertyType.toLowerCase() === params.propertyType?.toLowerCase());
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.address.toLowerCase().includes(searchLower) ||
          p.location.city.toLowerCase().includes(searchLower)
      );
    }
    if (params.minPrice) {
      result = result.filter((p) => p.price >= (params.minPrice || 0));
    }
    if (params.maxPrice) {
      result = result.filter((p) => p.price <= (params.maxPrice || Infinity));
    }
    if (params.minBeds) {
      result = result.filter((p) => p.features.beds >= (params.minBeds || 0));
    }
    if (params.sortBy) {
      if (params.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (params.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (params.sortBy === 'sqft') {
        result.sort((a, b) => b.features.sqft - a.features.sqft);
      }
    }
  }

  return result;
}

export async function fetchPropertyBySlugOrId(identifier: string): Promise<Property | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/properties/${identifier}`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error, using mock data:', error);
    }
  }

  const store = getLocalAdminStore();
  const list: Property[] = store?.properties || mockProperties;
  const found = list.find((p) => p.id === identifier || p.slug === identifier);
  return found || null;
}

export async function fetchBlogs(category?: string): Promise<BlogArticle[]> {
  if (API_BASE_URL) {
    try {
      const url = category
        ? `${API_BASE_URL}/api/blogs?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/api/blogs`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error, using mock data:', error);
    }
  }

  const store = getLocalAdminStore();
  const list: BlogArticle[] = store?.blogs || mockBlogs;

  if (category && category !== 'All') {
    return list.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  return list;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogArticle | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error, using mock data:', error);
    }
  }

  const store = getLocalAdminStore();
  const list: BlogArticle[] = store?.blogs || mockBlogs;
  return list.find((b) => b.slug === slug || b.id === slug) || null;
}

export function mergeSuccessStories(savedStories: SuccessStory[], mockStories: SuccessStory[]): SuccessStory[] {
  const updatedStories = (savedStories || []).map((savedStory) => {
    const mockStory = mockStories.find(m => m.id === savedStory.id || m.slug === savedStory.slug);
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

  const missingStories = mockStories.filter(
    mockStory => !(savedStories || []).some((s) => s.id === mockStory.id || s.slug === mockStory.slug)
  );

  return [...updatedStories, ...missingStories];
}

export async function fetchSuccessStories(): Promise<SuccessStory[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/success-stories`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error, using mock data:', error);
    }
  }

  const store = getLocalAdminStore();
  const rawList = store?.successStories || mockSuccessStories;
  return mergeSuccessStories(rawList, mockSuccessStories);
}

export async function fetchSuccessStoryBySlug(slug: string): Promise<SuccessStory | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/success-stories/${slug}`, { cache: 'no-store' });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error, using mock data:', error);
    }
  }

  const store = getLocalAdminStore();
  const rawList = store?.successStories || mockSuccessStories;
  const mergedList = mergeSuccessStories(rawList, mockSuccessStories);
  return mergedList.find((s) => s.slug === slug || s.id === slug) || null;
}



export async function submitInquiry(data: InquiryPayload): Promise<{ success: boolean; message: string }> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error during inquiry submission:', error);
    }
  }

  // Save directly to admin store in localStorage so Admin Portal sees it immediately!
  try {
    if (typeof window !== 'undefined') {
      const STORE_KEY = 'amir_phuket_admin_store_v1';
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const newSub = {
          id: `sub-${Date.now()}`,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          type: data.type || 'schedule-tour',
          propertyTitle: data.propertyTitle || '',
          message: data.message || `Preferred Date: ${data.preferredDate || 'Flexible'}`,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'new',
        };
        parsed.contactSubmissions = [newSub, ...(parsed.contactSubmissions || [])];
        localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {
    console.error('Could not save inquiry to admin store:', e);
  }

  // Simulated server delay response
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: 'Thank you! Your inquiry has been received and logged in our admin portal. Our team will contact you shortly.',
  };
}

export async function submitHomeValuation(data: HomeValuationPayload): Promise<{ success: boolean; message: string }> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/valuations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.warn('Backend API error during valuation submission:', error);
    }
  }

  // Save directly to admin store in localStorage
  try {
    if (typeof window !== 'undefined') {
      const STORE_KEY = 'amir_phuket_admin_store_v1';
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const newSub = {
          id: `sub-${Date.now()}`,
          name: data.ownerName || 'Valuation Client',
          email: data.ownerEmail || '',
          phone: data.ownerPhone || '',
          type: 'home-valuation',
          propertyTitle: `${data.propertyType} (${data.bedrooms} Bed, ${data.bathrooms} Bath)`,
          message: `Address: ${data.address}. Condition: ${data.condition}. Notes: ${data.notes || 'No additional notes provided.'}`,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'new',
        };
        parsed.contactSubmissions = [newSub, ...(parsed.contactSubmissions || [])];
        localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {
    console.error('Could not save valuation to admin store:', e);
  }

  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: 'Home valuation request submitted! A customized comparative market report has been logged.',
  };
}

export async function submitNewsletter(emailOrPhone: string, source: string): Promise<{ success: boolean; message: string }> {
  try {
    if (typeof window !== 'undefined') {
      const STORE_KEY = 'amir_phuket_admin_store_v1';
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const newNl = {
          id: `nl-${Date.now()}`,
          emailOrPhone,
          source,
          subscribedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'active',
        };
        parsed.newsletterSubmissions = [newNl, ...(parsed.newsletterSubmissions || [])];
        localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {
    console.error('Could not save newsletter to admin store:', e);
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: true,
    message: 'Thank you for subscribing! Your request has been recorded.',
  };
}

