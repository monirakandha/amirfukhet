import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'The Complete Guide to Buying Property in Phuket | AMIR KNOWS PHUKET',
  description:
    'The definitive guide for foreign buyers: freehold vs leasehold, the step-by-step buying process, taxes and transfer fees, financing options, and due diligence — all in one place.',
  keywords:
    'buy property Phuket guide, foreigner buy Thailand property, freehold vs leasehold Phuket, Thailand property tax, due diligence Phuket real estate',
  openGraph: {
    title: 'Complete Guide to Buying Property in Phuket as a Foreigner',
    description: 'Everything a foreign buyer needs to know about ownership structures, the buying process, taxes, and due diligence in Phuket.',
    type: 'article',
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
