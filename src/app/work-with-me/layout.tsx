import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Work With Amir | Book a Consultation | AMIR KNOWS PHUKET',
  description:
    'Ready to buy property in Phuket? Book a free consultation with Amir — independent advice on areas, ownership structures, and due diligence. No sales pitch.',
  keywords:
    'consult property advisor Phuket, book Phuket property consultation, work with real estate advisor Thailand, independent buyer agent Phuket',
  openGraph: {
    title: 'Work With Amir | AMIR KNOWS PHUKET',
    description: 'Get independent advice before buying property in Phuket. Book a free consultation with Amir.',
    type: 'website',
  },
};

export default function WorkWithMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
