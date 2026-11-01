// components/Footer.jsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#171a1d] border-t border-[#2a3642] text-gray-400 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        {/* Дисклеймер Riot Games */}
        <div className="text-center md:text-left space-y-1 max-w-xl">
          <p className="font-bold text-white">AFTERBOOST is not endorsed by Riot Games in any way.</p>
          <p className="text-[10px] text-gray-500">
            Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </p>
        </div>

        {/* Посилання на Terms of Service */}
        <div className="flex items-center gap-6 font-semibold uppercase tracking-wider">
          <Link href="/terms" className="hover:text-[#ff4655] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}