import type { Metadata } from "next";
import { Bricolage_Grotesque, Mona_Sans } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});

const mona = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mona",
});

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
    <html lang="en" className={`h-full antialiased ${bricolage.variable} ${mona.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900" suppressHydrationWarning>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
