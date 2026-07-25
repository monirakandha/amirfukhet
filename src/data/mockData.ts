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
    title: 'The Crestwood Contemporary Villa',
    slug: 'crestwood-contemporary-villa',
    price: 3250000,
    formattedPrice: '$3,250,000',
    status: 'for-sale',
    propertyType: 'Villa',
    location: {
      address: '1420 Crestwood Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210',
    },
    features: {
      beds: 5,
      baths: 6,
      sqft: 6400,
      garage: 3,
      yearBuilt: 2023,
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'An architectural masterpiece nestled in the coveted Crestwood enclave. Featuring floor-to-ceiling glass walls, an infinity-edge heated pool, smart automation systems, custom Italian oak cabinetry, and panoramic canyon views.',
    amenities: [
      'Infinity Pool',
      'Smart Home Automation',
      'Chef Kitchen',
      'Wine Cellar',
      'Private Spa & Sauna',
      'Electric Vehicle Charger',
      'Gated Entry',
      'Solar Energy System',
    ],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'prop-2',
    title: 'Skyline Horizons Penthouse',
    slug: 'skyline-horizons-penthouse',
    price: 4800000,
    formattedPrice: '$4,800,000',
    status: 'for-sale',
    propertyType: 'Penthouse',
    location: {
      address: '880 Ocean Boulevard, Apt 42B',
      city: 'Miami',
      state: 'FL',
      zip: '33139',
    },
    features: {
      beds: 4,
      baths: 4.5,
      sqft: 4850,
      garage: 2,
      yearBuilt: 2024,
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Ultra-luxury penthouse offering 360-degree ocean & city view. Private rooftop plunge pool, wrapping wrap-around terrace, private elevator access, and 24/7 concierge concierge service.',
    amenities: [
      'Private Elevator',
      'Rooftop Terrace & Pool',
      '24/7 Concierge',
      'Fitness Center Access',
      'Marble Bathrooms',
      'Floor-to-Ceiling Windows',
      'Valet Parking',
    ],
    featured: true,
    agent: primaryAgent,
    createdAt: '2026-07-10T14:30:00Z',
  },
  {
    id: 'prop-3',
    title: 'Oakwood Park Craftsman Estate',
    slug: 'oakwood-park-craftsman-estate',
    price: 1850000,
    formattedPrice: '$1,850,000',
    status: 'for-sale',
    propertyType: 'Single Family',
    location: {
      address: '742 Willow Creek Way',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
    },
    features: {
      beds: 4,
      baths: 3.5,
      sqft: 3600,
      garage: 2,
      yearBuilt: 2021,
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200',
    ],
    description:
      'Warm and inviting classic modern craftsman home featuring handcrafted timber beams, custom fireplace, lush private backyard garden, outdoor kitchen, and energy-efficient climate control.',
    amenities: [
      'Outdoor Kitchen',
      'Fire Pit',
      'Hardwood Floors',
      'Home Office Suite',
      'Walk-in Pantry',
      'Lush Landscaping',
    ],
    featured: false,
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
    title: 'Top Real Estate Market Trends to Watch in Q3 & Q4 2026',
    slug: 'real-estate-market-trends-2026',
    category: 'Market Trends',
    summary:
      'An in-depth analysis of mortgage interest rates, luxury home inventory, and shifting buyer preferences in major metropolitan markets.',
    content: `
      <p>The real estate market in 2026 continues to demonstrate resilience and unique strategic opportunities for both buyers and sellers. As mortgage rates stabilize, inventory levels in prime suburban and luxury coastal sectors are seeing renewed activity.</p>
      
      <h3>Key Highlights:</h3>
      <ul>
        <li><strong>Inventory Growth:</strong> Selective markets have experienced a 12% rise in active listings.</li>
        <li><strong>Sustainability Demand:</strong> Solar integration, EV charging, and high-efficiency heat pumps now yield higher appraisal valuations.</li>
        <li><strong>Remote & Hybrid Migration:</strong> High-earning buyers continue to prioritize spacious home office suites and outdoor living areas.</li>
      </ul>
      
      <p>Understanding these macro trends allows sellers to position their properties strategically for maximum equity return.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Eleanor Vance',
      role: 'Principal Realtor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    publishedAt: '2026-07-20',
    readTimeMinutes: 5,
    tags: ['Market Analysis', 'Interest Rates', 'Luxury Living', 'Real Estate 2026'],
    featured: true,
  },
  {
    id: 'blog-2',
    title: '10 Essential Tips for First-Time Luxury Home Buyers',
    slug: 'essential-tips-first-time-luxury-home-buyers',
    category: 'Home Buying',
    summary:
      'Navigating high-end real estate requires specialized due diligence, HOA understanding, private financing options, and expert negotiation.',
    content: `
      <p>Purchasing your first luxury residence is a thrilling milestone, but it also comes with intricate considerations beyond standard residential transactions.</p>
      
      <h3>1. Get Pre-Approved for Jumbo Financing Early</h3>
      <p>Luxury properties frequently command competitive offers. Having fully underwritten pre-approval positions you as a serious buyer ready to close smoothly.</p>

      <h3>2. Inspect Beyond Surface Aesthetics</h3>
      <p>Complex HVAC networks, automated home controls, heated pools, and architectural roofing demand specialized inspections by certified luxury inspectors.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Eleanor Vance',
      role: 'Principal Realtor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    publishedAt: '2026-07-12',
    readTimeMinutes: 6,
    tags: ['Buyer Advice', 'Luxury Buying', 'Jumbo Loan', 'Home Inspection'],
    featured: false,
  },
  {
    id: 'blog-3',
    title: 'How Professional Staging Boosts Property Sale Price by up to 8%',
    slug: 'professional-staging-boosts-property-sale-price',
    category: 'Seller Tips',
    summary:
      'Discover how curated furniture design and strategic lighting transform visual appeal and create emotional connections for prospective buyers.',
    content: `
      <p>First impressions online drive physical showings. When buyers tour a professionally staged home, they instantly visualize their lifestyle within the space.</p>
    `,
    coverImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Eleanor Vance',
      role: 'Principal Realtor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    publishedAt: '2026-07-05',
    readTimeMinutes: 4,
    tags: ['Staging', 'Selling Tips', 'Home Valuation'],
    featured: false,
  },
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    clientName: 'Marcus & Sophia Sterling',
    clientRole: 'Home Seller',
    propertyTitle: 'Bel Air Modern Panoramic Estate',
    originalPrice: 4200000,
    soldPrice: 4450000,
    daysOnMarket: 14,
    story:
      'Marcus and Sophia had listed their Bel Air home with a prior brokerage for 90 days without an acceptable offer. Eleanor executed a custom staging overhaul, high-resolution architectural cinematography, and targeted international buyer outreach.',
    testimonial:
      '"Eleanor Vance delivered an extraordinary outcome. Her targeted marketing strategy generated 4 competing offers within two weeks, selling our home for $250k above our original asking price!"',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    location: 'Bel Air, Los Angeles, CA',
    dateClosed: 'June 2026',
    highlights: [
      'Sold 6% Over List Price',
      'Only 14 Days on Market',
      '4 Competitive Offers Generated',
      'Record Price Per Sq Ft in Neighborhood',
    ],
  },
  {
    id: 'story-2',
    clientName: 'David K. Henderson',
    clientRole: 'Real Estate Investor',
    propertyTitle: 'Waterfront Penthouse Portfolio Acquisition',
    soldPrice: 7800000,
    daysOnMarket: 9,
    story:
      'David was seeking off-market luxury waterfront properties for capital appreciation and rental yield. Eleanor leveraged her deep private network to secure an exclusive off-market penthouse before public MLS release.',
    testimonial:
      '"Working with Eleanor gave me a true competitive advantage. Her market intelligence and seamless negotiation secured an off-market deal at exceptional terms."',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    location: 'Miami Beach, FL',
    dateClosed: 'May 2026',
    highlights: [
      'Off-Market Private Acquisition',
      'Secured Below Appraised Value',
      'Immediate High-Yield Rental Contract',
    ],
  },
];
