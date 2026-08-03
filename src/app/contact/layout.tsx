import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Amir | Phuket Property Advisor | AMIR KNOWS PHUKET',
  description:
    'Send Amir a message about buying property in Phuket. Honest answers on ownership structures, areas, due diligence, and investment strategy. Replies within 24 hours.',
  keywords:
    'contact property advisor Phuket, message Amir property, Phuket real estate inquiry, WhatsApp property advisor Thailand',
  openGraph: {
    title: 'Contact Amir | AMIR KNOWS PHUKET',
    description: 'Get in touch with Amir for independent property advice in Phuket. Replies within 24 hours.',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
