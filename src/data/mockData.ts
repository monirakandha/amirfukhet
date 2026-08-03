import { Property, BlogArticle, SuccessStory, AgentInfo } from '@/types';

export const primaryAgent: AgentInfo = {
  name: 'Eleanor Vance',
  title: 'Principal Realtor & Luxury Specialist',
  phone: '+1 (555) 382-9102',
  email: 'eleanor.vance@primehavenrealty.com',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
};

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: '2-Bed Pool Villa, Laguna-side',
    slug: '2-bed-pool-villa-laguna-side',
    price: 18500000,
    formattedPrice: '฿18.5M',
    originalPriceFormatted: '฿18.5M',
    ownershipType: 'Leasehold',
    areaSqM: 180,
    locationName: 'Thailand ,Bang Tao',
    status: 'for-sale',
    propertyType: 'Villa',
    location: {
      address: 'Laguna Phuket Road',
      city: 'Bang Tao',
      state: 'Phuket',
      zip: '83110',
    },
    features: {
      beds: 2,
      baths: 2,
      sqft: 1937,
      garage: 1,
      yearBuilt: 2024,
    },
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Tranquil 2-bedroom luxury pool villa located on the Laguna side of Bang Tao, featuring private pool, high ceilings, fully equipped Western kitchen, and full estate security.',
    amenities: ['Private Pool', 'Laguna Access', 'Gated Security', 'Garden Terrace'],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'prop-2',
    title: "Sea-View Condo, Millionaire's Mile",
    slug: 'sea-view-condo-millionaires-mile',
    price: 12900000,
    formattedPrice: '฿12.9M',
    originalPriceFormatted: '฿18.5M',
    ownershipType: 'Freehold',
    areaSqM: 72,
    locationName: 'Thailand ,Kamala',
    status: 'for-sale',
    propertyType: 'Condo',
    location: {
      address: 'Millionaires Mile Coast Road',
      city: 'Kamala',
      state: 'Phuket',
      zip: '83120',
    },
    features: {
      beds: 1,
      baths: 1,
      sqft: 775,
      garage: 1,
      yearBuilt: 2024,
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Stunning Foreign Freehold sea-view apartment positioned on Kamala’s coveted Millionaire’s Mile. Floor-to-ceiling glass, sunset balcony, and resort pool access.',
    amenities: ['Foreign Freehold', 'Panoramic Sea View', 'Sunset Terrace', 'Resort Pool'],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-18T14:30:00Z',
  },
  {
    id: 'prop-3',
    title: '3-Bed Family Villa, quiet south',
    slug: '3-bed-family-villa-quiet-south',
    price: 9800000,
    formattedPrice: '฿9.8M',
    originalPriceFormatted: '฿18.5M',
    ownershipType: 'Leasehold',
    areaSqM: 220,
    locationName: 'Thailand ,Rawai',
    status: 'for-sale',
    propertyType: 'Villa',
    location: {
      address: 'Wiset Road',
      city: 'Rawai',
      state: 'Phuket',
      zip: '83130',
    },
    features: {
      beds: 3,
      baths: 3,
      sqft: 2368,
      garage: 2,
      yearBuilt: 2023,
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Spacious 3-bedroom tropical family home in quiet south Rawai. Covered outdoor dining lounge, swimming pool, mature tropical garden, and covered double car port.',
    amenities: ['Private Garden', 'Swimming Pool', 'Double Carport', 'Quiet Neighborhood'],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-15T09:15:00Z',
  },
  {
    id: 'prop-4',
    title: 'The Glass Pavilion Beachfront Residence',
    slug: 'glass-pavilion-beachfront',
    price: 12000,
    formattedPrice: '$12,000 / mo',
    status: 'for-rent',
    propertyType: 'Villa',
    location: {
      address: '210 Shoreline Drive',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
    },
    features: {
      beds: 3,
      baths: 3,
      sqft: 3100,
      garage: 2,
      yearBuilt: 2022,
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Direct beachfront living at its finest. Wake up to ocean breezes and Pacific sunset views. Fully furnished luxury rental with high-speed fiber internet and private beach path access.',
    amenities: [
      'Direct Beach Access',
      'Furnished Luxury',
      'Oceanfront Deck',
      'Security System',
      'Outdoor Shower',
    ],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-18T11:45:00Z',
  },
  {
    id: 'prop-5',
    title: 'Highland Modern Townhouse',
    slug: 'highland-modern-townhouse',
    price: 1450000,
    formattedPrice: '$1,450,000',
    status: 'pending',
    propertyType: 'Townhouse',
    location: {
      address: '512 Pinecrest Avenue',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
    features: {
      beds: 3,
      baths: 3.5,
      sqft: 2800,
      garage: 2,
      yearBuilt: 2023,
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Sleek urban townhouse boasting high ceilings, custom quartz island kitchen, roof deck with mountain views, and built-in climate control.',
    amenities: ['Rooftop Deck', 'Quartz Countertops', 'Custom Closet', 'EV Ready Garage'],
    featured: false,
    agent: primaryAgent,
    createdAt: '2026-06-25T16:00:00Z',
  },
  {
    id: 'prop-6',
    title: 'Pine Valley Luxury Manor',
    slug: 'pine-valley-luxury-manor',
    price: 5200000,
    formattedPrice: '$5,200,000',
    status: 'sold',
    propertyType: 'Villa',
    location: {
      address: '900 Aspen Heights Trail',
      city: 'Aspen',
      state: 'CO',
      zip: '81611',
    },
    features: {
      beds: 6,
      baths: 7,
      sqft: 7200,
      garage: 3,
      yearBuilt: 2022,
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Exquisite mountain resort home featuring timber architecture, heated driveway, ski-in/ski-out access, and custom wine tasting lounge.',
    amenities: ['Ski-in / Ski-out', 'Heated Driveway', 'Wine Tasting Room', 'Indoor Pool'],
    featured: false,
    agent: primaryAgent,
    createdAt: '2026-05-12T08:00:00Z',
  },
];

export const mockBlogs: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'Freehold vs Leasehold in Phuket: which is right for you?',
    slug: 'freehold-vs-leasehold-in-phuket',
    category: 'Ownership & Legal',
    template: 'centered',
    summary:
      'Understanding the legal differences, renewal terms, tax implications, and ownership security between freehold and leasehold properties in Thailand.',
    quoteText: "Freehold gives you the title. Leasehold gives you the terms. Both can be the right answer — it depends entirely on the property and your goal.",
    showSubscribeBox: true,
    postFaqs: [
      { question: "Can a foreigner own land in Thailand?", answer: "Not freehold in their own name. Foreigners commonly secure villas and land through long leaseholds or property structured arrangements – which is exactly where advice protects you." },
      { question: "What is the foreign quota on condos?", answer: "Condominiums can be owned freehold by foreigners up to 49% of the building's total floor area." },
      { question: "What taxes and fees apply when buying?", answer: "Taxes depend on whether you buy freehold or leasehold, and usually range from 1.1% to 6.3% of the property value." },
      { question: "Can foreigners get a mortgage in Thailand?", answer: "It is very difficult for foreigners to get local mortgages. Most foreign buyers use cash or offshore financing." }
    ],
    content: `
      <p>Yes &ndash; but how you own it matters more than anything else. In this guide. Foreigners can freehold-own condominium units within the 49% foreign quota of a building, and can hold land and villas through long leaseholds or property structured arrangements. Getting this right is the difference between a secure asset and an expensive lesson.</p>
      
      <p>Body copy is placeholder for layout. The published guide walks through each path in plain language, with worked examples and the questions to ask before you commit to either route.</p>

      <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200" alt="Beautiful Phuket Villa Pool" class="w-full rounded-2xl my-8 object-cover shadow-sm aspect-[16/9]" />

      <p>It's the first real decision every foreign buyer faces in Phuket &ndash; and the one most likely to be rushed. Here's how to choose with a clear head.</p>

      <p>Body copy is lighter placeholder for this template demonstration. The published article uses proper H2/H3 structure, generous spacing, inline images with alt text, and pull quotes &ndash; all editable by Amir in the CMS.</p>

      <p>[quote]</p>

      <p>[subscribe]</p>

      <p class="text-[15px] text-gray-600 mb-8 -mt-2">Structured with FAQ schema &mdash; built to surface in Google snippets and AI search answers.</p>

      <p>[faq]</p>
    `,
    contentSections: [
      {
        heading: "What freehold ownership really means",
        content: "<p>Placeholder paragraph. Proper headings make the article scannable and feed Google's outline understanding.</p>"
      },
      {
        heading: "When leasehold is the smarter choice",
        content: "<p>Placeholder body paragraph to show long-form reading rhythm and comfortable line length.</p>"
      },
      {
        heading: "Cost comparison",
        content: "<p>A quick breakdown of transfer fees and taxes associated with freehold vs leasehold.</p>"
      },
      {
        heading: "Protections on a lease",
        content: "<p>How to structure your lease agreements for maximum security over a 30-year term.</p>"
      }
    ],
    coverImage:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Amir Ahmed Faisal',
      role: 'Investment Advisor',
      avatar: '/images/amir.png',
    },
    publishedAt: '2026-07-20',
    readTimeMinutes: 5,
    tags: ['Freehold', 'Leasehold', 'Phuket Legal', 'Foreign Buying'],
    featured: true,
  },
  {
    id: 'blog-2',
    title: 'Bang Tao area guide: who actually buys here, and why',
    slug: 'bang-tao-area-guide',
    category: 'Area Guides',
    summary:
      'An in-depth breakdown of Bang Tao beach, Laguna resort community, beach clubs, and why investors choose this high-yield region.',
    content: `
      <p>Bang Tao has evolved into one of Phuket’s premier investment hotspots combining luxury lifestyle amenities with high rental demand.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Amir Ahmed Faisal',
      role: 'Investment Advisor',
      avatar: '/images/amir.png',
    },
    publishedAt: '2026-07-15',
    readTimeMinutes: 6,
    tags: ['Bang Tao', 'Laguna', 'Location Guide'],
    featured: true,
  },
  {
    id: 'blog-3',
    title: 'Rental yields in Phuket: what 6–8% really looks like',
    slug: 'rental-yields-in-phuket-6-8-percent',
    category: 'Rental Yields',
    summary:
      'Unpacking net vs gross yields, seasonal occupancy rates, management fees, and realistic ROI expectations for Phuket property investors.',
    content: `
      <p>Many developments advertise guaranteed 6-8% yields. We analyze what that means in practice after management costs and taxes.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Amir Ahmed Faisal',
      role: 'Investment Advisor',
      avatar: '/images/amir.png',
    },
    publishedAt: '2026-07-10',
    readTimeMinutes: 4,
    tags: ['ROI', 'Rental Yields', 'Investment'],
    featured: true,
  },
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    title: "A Canadian couple's first Phuket villa",
    slug: 'canadian-couples-first-phuket-villa',
    subtitle: 'Nervous first-time foreign buyers who needed the structure explained in plain English.',
    location: 'Bang Tao',
    propertyType: 'Villa',
    metricHighlight: '6.9% gross yield, fully managed',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000',
    clientName: 'Mark & Sarah',
    clientRole: 'Home Buyer',
    story: 'Navigated land department registration and established clean leasehold terms with 30+30+30 extension clauses.',
    testimonial: 'Amir explained every risk clearly and saved us from a poorly drafted contract.',
    isFeatured: true,
    steps: [
      { stepNumber: '01', title: 'Define budget, area and goal', body: "A retired couple from Vancouver, first-time foreign buyers, looking for a holiday home that could also generate rental income when they weren't using it." },
      { stepNumber: '02', title: 'The challenge', body: "They were nervous about buying in a country they'd visited only twice, and confused by conflicting advice on leasehold versus company ownership." },
      { stepNumber: '03', title: "Amir's approach", body: "I started with a plain-English session on ownership structures, then narrowed the search to Bang Tao for its rental demand and resale liquidity." },
      { stepNumber: '04', title: 'Research & guidance', body: "Title verification, developer track-record checks, and a lease reviewed line-by-line with a vetted lawyer before any deposit changed hands." },
      { stepNumber: '05', title: 'The outcome', body: "A two-bedroom pool villa on a secure leasehold, bought below the original asking price, with a rental management plan in place from day one." },
      { stepNumber: '07', title: 'Key takeaways', body: "The right area and a properly reviewed lease matter more than chasing the lowest price. Independent due diligence paid for itself many times over." },
    ],
    metrics: [
      { value: '6.9%', label: 'Gross rental yield' },
      { value: '฿8%', label: 'Below asking price' },
      { value: '100%', label: 'Managed, hands-off' },
    ],
  },
  {
    id: 'story-2',
    title: 'Avoiding a leasehold trap in Kamala',
    slug: 'avoiding-a-leasehold-trap-in-kamala',
    subtitle: 'A buyer about to sign a lease with no renewal protection. We renegotiated the terms.',
    location: 'Kamala',
    propertyType: 'Condo',
    metricHighlight: '$2.1M risk avoided',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    clientName: 'David K.',
    clientRole: 'Investor',
    story: 'Renegotiated leasehold agreement to add developer corporate guarantee and clear succession rights.',
    testimonial: 'Without Amir’s legal review, I would have signed a non-renewable 30-year lease.',
  },
  {
    id: 'story-3',
    title: 'A UK investor building a 3-unit portfolio',
    slug: 'uk-investor-building-3-unit-portfolio',
    subtitle: 'Wanted cash-flow over trophy assets. We targeted the right price band and tenant pool.',
    location: 'Rawai',
    propertyType: 'Portfolio',
    metricHighlight: '3 units, blended 7.4% yield',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    clientName: 'James L.',
    clientRole: 'Real Estate Investor',
    story: 'Acquired 3 high-demand pool villas generating consistent year-round rental occupancy.',
    testimonial: 'Amir focused on real net returns instead of marketing hype.',
  },
];
