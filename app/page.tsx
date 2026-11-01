// app/page.js
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoostCalculator from '@/components/home/BoostCalculator';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] flex flex-col">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сторінки */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full space-y-12">
        {/* Банер / Заголовок */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-4xl font-black tracking-wider uppercase">
            Elevate Your Rank with <span className="text-[#ff4655]">AFTERBOOST</span>
          </h1>
          <p className="text-sm text-gray-400">
            Professional Valorant boosting service by top-tier Immortal and Radiant players. Fast, 100% secure, and anonymous.
          </p>
        </div>

        {/* Калькулятор бусту */}
        <BoostCalculator />

        {/* Блок коротких переваг */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#2a3642]">
          <div className="bg-[#1f2326] border border-[#2a3642] p-5 rounded-xl space-y-2">
            <h3 className="font-black text-sm text-[#ff4655] uppercase">🛡️ 100% Safe & Secure</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We use localized VPNs matching your exact region and strict offline mode during every session.
            </p>
          </div>
          <div className="bg-[#1f2326] border border-[#2a3642] p-5 rounded-xl space-y-2">
            <h3 className="font-black text-sm text-[#ff4655] uppercase">⚡ Lightning Fast</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Boosters start working within minutes after your order is confirmed and payment is completed.
            </p>
          </div>
          <div className="bg-[#1f2326] border border-[#2a3642] p-5 rounded-xl space-y-2">
            <h3 className="font-black text-sm text-[#ff4655] uppercase">💬 24/7 Live Chat</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Communicate directly with your assigned professional booster through our secure order chat.
            </p>
          </div>
        </div>
      </main>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}