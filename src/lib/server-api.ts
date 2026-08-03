/**
 * Server-safe API helpers for Next.js Server Components.
 * Does NOT use localStorage or any browser API.
 * Falls back to static mockData when no backend is configured.
 */
import { Property, BlogArticle, SuccessStory } from '@/types';
import { mockProperties, mockBlogs, mockSuccessStories } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ── Helpers ─────────────────────────────────────────────────────────────────

function mergeStories(saved: SuccessStory[], mock: SuccessStory[]): SuccessStory[] {
  const updated = saved.map((s) => {
    const m = mock.find((x) => x.id === s.id || x.slug === s.slug);
    if (!m) return s;
    return {
      ...m,
      ...s,
      steps: s.steps && s.steps.length > 0 ? s.steps : m.steps,
      metrics: s.metrics && s.metrics.length > 0 ? s.metrics : m.metrics,
    };
  });
  const missing = mock.filter((m) => !saved.some((s) => s.id === m.id || s.slug === m.slug));
  return [...updated, ...missing];
}

// ── Properties ───────────────────────────────────────────────────────────────

export async function serverFetchProperties(): Promise<Property[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/properties`, {
        next: { revalidate: 60 },
      });
      if (res.ok) return res.json();
    } catch {
      // fall through to mock data
    }
  }
  return [...mockProperties];
}

// ── Blogs ─────────────────────────────────────────────────────────────────────

export async function serverFetchBlogs(category?: string, tag?: string): Promise<BlogArticle[]> {
  if (API_BASE_URL) {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (tag) params.append('tag', tag);
      const url = `${API_BASE_URL}/api/blogs${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) return res.json();
    } catch {
      // fall through
    }
  }
  let list = [...mockBlogs];
  if (category && category !== 'All') {
    list = list.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }
  if (tag) {
    list = list.filter((b) => b.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
  }
  return list;
}

export async function serverFetchBlogBySlug(slug: string): Promise<BlogArticle | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) return res.json();
    } catch {
      // fall through
    }
  }
  return mockBlogs.find((b) => b.slug === slug || b.id === slug) ?? null;
}

export async function serverFetchRelatedBlogs(currentSlug: string, category: string, limit: number = 3): Promise<BlogArticle[]> {
  const allBlogs = await serverFetchBlogs();
  return allBlogs
    .filter(b => b.slug !== currentSlug) // Exclude current
    .sort((a, b) => {
      // Prioritize same category
      const aSameCategory = a.category === category;
      const bSameCategory = b.category === category;
      if (aSameCategory && !bSameCategory) return -1;
      if (!aSameCategory && bSameCategory) return 1;
      return 0;
    })
    .slice(0, limit);
}

// ── Success Stories ───────────────────────────────────────────────────────────

export async function serverFetchSuccessStories(): Promise<SuccessStory[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/success-stories`, {
        next: { revalidate: 60 },
      });
      if (res.ok) return res.json();
    } catch {
      // fall through
    }
  }
  return mergeStories([...mockSuccessStories], mockSuccessStories);
}

export async function serverFetchSuccessStoryBySlug(slug: string): Promise<SuccessStory | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/success-stories/${slug}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) return res.json();
    } catch {
      // fall through
    }
  }
  return mockSuccessStories.find((s) => s.slug === slug || s.id === slug) ?? null;
}
