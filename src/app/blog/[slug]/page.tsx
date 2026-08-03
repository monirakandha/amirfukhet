import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { serverFetchBlogBySlug, serverFetchBlogs } from '@/lib/server-api';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

interface BlogDetailPageProps {
  params: { slug: string };
}

// ── Static params for SSG ─────────────────────────────────────────────────────
// Pre-generates a static HTML file for every blog slug at build time.
export async function generateStaticParams() {
  const blogs = await serverFetchBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = await serverFetchBlogBySlug(params.slug);
  if (!blog) {
    return { title: 'Article Not Found | AMIR KNOWS PHUKET' };
  }

  const cleanDescription = (blog.summary || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .slice(0, 160);

  return {
    title: `${blog.title} | AMIR KNOWS PHUKET`,
    description: cleanDescription,
    keywords: blog.tags?.join(', '),
    openGraph: {
      title: blog.title,
      description: cleanDescription,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author.name],
      images: blog.coverImage ? [{ url: blog.coverImage, alt: blog.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: cleanDescription,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

// ── Page Component (Server Component) ────────────────────────────────────────
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await serverFetchBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Article Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Market Blog
          </Link>

          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full inline-block">
            {blog.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-8 h-8 rounded-full border border-amber-400"
              />
              <div>
                <span className="font-bold text-white block">{blog.author.name}</span>
                <span className="text-[11px] text-slate-400">{blog.author.role}</span>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {blog.publishedAt}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {blog.readTimeMinutes} min read
            </div>
          </div>
        </div>
      </section>

      {/* Hero Cover Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-96 w-full">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-12 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400 shrink-0" />
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back Link */}
          <div className="pt-8 border-t border-slate-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
