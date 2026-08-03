import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Amir | Independent Phuket Property Advisor | AMIR KNOWS PHUKET',
  description:
    'Amir Ahmed Faisal is an independent property investment advisor based in Phuket. No commissions, no conflicts — just honest guidance for foreign buyers navigating the Thai real estate market.',
  keywords:
    'Amir property advisor Phuket, independent real estate advisor Thailand, buy property Phuket expert, expat property guide Thailand',
  openGraph: {
    title: 'About Amir | Independent Phuket Property Advisor',
    description: 'Independent advisor, not an agent. Honest guidance on buying property in Phuket as a foreigner.',
    type: 'profile',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
