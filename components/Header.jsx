// components/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f1923]/90 backdrop-blur-md border-b border-[#2a3642]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="font-black text-lg text-white tracking-wider flex items-center gap-2">
          AFTER<span className="text-[#ff4655]">BOOST</span>
        </Link>

        {/* Навігація для десктопа */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase text-gray-300">
          <Link href="/" className="hover:text-[#ff4655] transition-colors">Order Boost</Link>
          <Link href="/reviews" className="hover:text-[#ff4655] transition-colors">Reviews</Link>
          <Link href="/faq-guarantees" className="hover:text-[#ff4655] transition-colors">FAQ</Link>
        </nav>

        {/* Кнопка мобільного меню (гамбургер) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Випадаюче мобільне меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#171a1d] border-b border-[#2a3642] px-4 py-4 space-y-3 text-xs font-semibold tracking-wider uppercase">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-[#ff4655]"
          >
            Order Boost
          </Link>
          <Link
            href="/reviews"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-[#ff4655]"
          >
            Reviews
          </Link>
          <Link
            href="/faq-guarantees"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-[#ff4655]"
          >
            FAQ
          </Link>
        </div>
      )}
    </header>
  );
}