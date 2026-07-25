import { Property, BlogArticle, SuccessStory, InquiryPayload, HomeValuationPayload, PropertyFilterParams } from '@/types';
import { mockProperties, mockBlogs, mockSuccessStories } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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

  // Local filtering logic on mock data
  let result = [...mockProperties];

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

  const found = mockProperties.find((p) => p.id === identifier || p.slug === identifier);
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

  if (category && category !== 'All') {
    return mockBlogs.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  return mockBlogs;
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

  return mockBlogs.find((b) => b.slug === slug || b.id === slug) || null;
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

  return mockSuccessStories;
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

  // Simulated server delay response
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: 'Thank you! Your inquiry has been received. Our realtor team will contact you shortly.',
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

  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: 'Home valuation request submitted! A customized comparative market report will be sent to your email.',
  };
}
