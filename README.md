# PrimeHaven Luxury Real Estate Platform (Frontend for Node.js Backend)

A high-end, responsive, and dynamic Real Estate / Realtor web platform built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript**.

Designed specifically for **Node.js Backend Developers** to easily plug in their REST API endpoints.

---

## 🌟 Key Features

1. **Property Listings (`/properties` & `/properties/[id]`)**
   - Interactive search & multi-parametric filtering (Location, Category, Price Range, Bedrooms, Buy/Rent status).
   - Property detail page with multi-photo gallery preview, specifications grid, amenities checklist, mortgage calculator, and private viewing booking modal.

2. **Market Blog & Insights (`/blog` & `/blog/[slug]`)**
   - Categorized real estate articles, reading time, author profiles, and search functionality.

3. **Client Success Stories (`/success-stories`)**
   - Sold case studies with price metrics, days-on-market, client video/quote testimonials, and closing highlights.

4. **Realtor & Lead Generation (`/contact` & Free Valuation Modal)**
   - Instant multi-step Free Home Valuation Request modal.
   - Private tour booking form with agent routing.

---

## 🛠️ Node.js Backend Integration Guide

This frontend features a centralized service layer at `src/services/api.ts` ready to connect with any Node.js backend (Express.js, NestJS, Fastify, etc.).

### Step 1: Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Set your Node.js API base URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **Note:** If `NEXT_PUBLIC_API_URL` is empty or unreachable, the frontend automatically falls back to rich mock data in `src/data/mockData.ts`.

### Step 2: Express / Node.js API Endpoints

Implement the following REST endpoints in your Node.js backend:

| Method | Endpoint | Description | Query / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Fetch property list with filters | `?status=&propertyType=&search=&minPrice=&maxPrice=&minBeds=&sortBy=` |
| `GET` | `/api/properties/:idOrSlug` | Fetch single property details | Path parameter `id` or `slug` |
| `GET` | `/api/blogs` | Fetch blog articles | `?category=` |
| `GET` | `/api/blogs/:slug` | Fetch single blog article | Path parameter `slug` |
| `GET` | `/api/success-stories` | Fetch client success stories | N/A |
| `POST` | `/api/inquiries` | Submit viewing tour / contact inquiry | `{ name, email, phone, type, propertyId, preferredDate, message }` |
| `POST` | `/api/valuations` | Submit free home valuation request | `{ address, propertyType, bedrooms, bathrooms, condition, ownerName, ownerEmail, ownerPhone }` |

### Step 3: TypeScript Models
All data interfaces are strongly typed in `src/types/index.ts`:
- `Property`
- `BlogArticle`
- `SuccessStory`
- `InquiryPayload`
- `HomeValuationPayload`

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the platform.

### Build Production Bundle
```bash
npm run build
```

---

## 📦 Project Structure

```
d:/fuketamir
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage with Hero, Featured & Lead Capture
│   │   ├── properties/
│   │   │   ├── page.tsx           # Property Catalog & Filters
│   │   │   └── [id]/page.tsx      # Property Detail & Gallery View
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog List
│   │   │   └── [slug]/page.tsx    # Single Article Reader
│   │   ├── success-stories/
│   │   │   └── page.tsx           # Client Case Studies & Testimonials
│   │   ├── contact/
│   │   │   └── page.tsx           # Contact & Valuation Form Page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive Navigation Bar
│   │   ├── Footer.tsx             # Footer with Node.js Developer Badge
│   │   ├── PropertyCard.tsx       # Property Card Component
│   │   ├── HeroSearch.tsx         # Hero Property Filter Search Bar
│   │   ├── MortgageCalculator.tsx # Interactive Mortgage Estimator Widget
│   │   ├── ScheduleViewingModal.tsx # Viewing Booking Modal
│   │   └── HomeValuationModal.tsx   # Free Market Valuation Modal
│   ├── services/
│   │   └── api.ts                 # Node.js REST API Service Layer
│   ├── types/
│   │   └── index.ts               # TypeScript Interfaces
│   └── data/
│       └── mockData.ts            # Realistic Mock Data Fallback
├── .env.example
├── README.md
└── package.json
```
