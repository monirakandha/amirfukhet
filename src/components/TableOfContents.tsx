'use client';

import React, { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Basic Intersection Observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px'
      }
    );

    // Initial check for hash in URL
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (items.some(i => i.id === hash)) {
        setActiveId(hash);
      }
    } else if (items.length > 0) {
      setActiveId(items[0].id); // Default to first item
    }

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    
    // Update URL hash
    window.history.pushState(null, '', `#${id}`);

    // Scroll with offset for sticky navbar
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // Account for fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ul className="space-y-3 text-[15px] text-gray-500 font-medium">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block px-4 py-2 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-[#F0F4FF] text-[#3B82F6]' 
                  : 'hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
