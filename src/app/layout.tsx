import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMIR KNOWS PHUKET | Premier Luxury Real Estate & Investments",
  description: "Exclusive luxury villas, waterfront penthouses, and high-value property in Phuket. Represented by Amir Knows Phuket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
