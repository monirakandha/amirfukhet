import { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import {
  serverFetchProperties,
  serverFetchBlogs,
  serverFetchSuccessStories,
} from '@/lib/server-api';

export const metadata: Metadata = {
  title: 'AMIR KNOWS PHUKET | Phuket Property Investment Advisor',
  description:
    'Independent property investment advice for Phuket. Honest guidance on buying villas, condos, and investment properties in Thailand. Freehold, leasehold, rental yields, and area guides.',
  keywords:
    'Phuket property, buy property Phuket, Phuket real estate, property investment Thailand, Bang Tao villa, Kamala condo, leasehold freehold Thailand',
  openGraph: {
    title: 'AMIR KNOWS PHUKET | Property Investment Advisor',
    description:
      'Independent research, honest guidance on Phuket property investment. Rental yields, ownership structures, and area guides for foreign buyers.',
    type: 'website',
  },
};

export default async function HomePage() {
  const [properties, blogs, stories] = await Promise.all([
    serverFetchProperties(),
    serverFetchBlogs(),
    serverFetchSuccessStories(),
  ]);

  return <HomePageClient properties={properties} blogs={blogs} stories={stories} />;
}
