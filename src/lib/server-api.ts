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
      stepBudget: s.stepBudget || m.stepBudget,
      stepChallenge: s.stepChallenge || m.stepChallenge,
      stepApproach: s.stepApproach || m.stepApproach,
      stepResearch: s.stepResearch || m.stepResearch,
      stepOutcome: s.stepOutcome || m.stepOutcome,
      stepKeyTakeaways: s.stepKeyTakeaways || m.stepKeyTakeaways,
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

export async function serverFetchBlogs(category?: string): Promise<BlogArticle[]> {
  if (API_BASE_URL) {
    try {
      const url = category
        ? `${API_BASE_URL}/api/blogs?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/api/blogs`;
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
