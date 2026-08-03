import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SuccessStoriesPageClient from '@/components/SuccessStoriesPageClient';
import { serverFetchSuccessStories } from '@/lib/server-api';

export const metadata: Metadata = {
  title: 'Client Success Stories | Phuket Property Investment | AMIR KNOWS PHUKET',
  description:
    "Real case studies from foreign buyers who invested in Phuket villas and condos with Amir's independent advisory. Honest stories: budgets, challenges, outcomes, and yields.",

  keywords:
    'Phuket property success stories, foreign buyer Thailand, case study Phuket villa, condo investment testimonial, Phuket real estate results',
  openGraph: {
    title: 'Client Success Stories | AMIR KNOWS PHUKET',
    description: 'Full case studies from foreign buyers who invested in Phuket safely. Real budgets, challenges, and outcomes.',
    type: 'website',
  },
};

export default async function SuccessStoriesPage() {
  const stories = await serverFetchSuccessStories();

  return (
    // Suspense is required because SuccessStoriesPageClient uses useSearchParams
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#5870F7] animate-spin" />
        </div>
      }
    >
      <SuccessStoriesPageClient initialStories={stories} />
    </Suspense>
  );
}
