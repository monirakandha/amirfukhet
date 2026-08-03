import { Metadata } from 'next';
import { serverFetchBlogBySlug, serverFetchRelatedBlogs } from '@/lib/server-api';
import BlogDetailClient from '@/components/BlogDetailClient';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { serverFetchBlogs } = await import('@/lib/server-api');
  const blogs = await serverFetchBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await serverFetchBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: 'Post Not Found | AMIR KNOWS PHUKET' };
  
  return {
    title: `${blog.title} | AMIR KNOWS PHUKET`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [blog.coverImage],
      type: 'article',
      publishedTime: blog.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const blog = await serverFetchBlogBySlug(resolvedParams.slug);
  
  // We don't call notFound() here anymore, because it might exist in local storage.
  
  const relatedBlogs = blog ? await serverFetchRelatedBlogs(blog.slug, blog.category, 3) : [];

  return <BlogDetailClient slug={resolvedParams.slug} serverBlog={blog || null} serverRelatedBlogs={relatedBlogs} />;
}
