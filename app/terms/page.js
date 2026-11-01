// app/terms/page.js
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] flex flex-col">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сторінки Terms */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full space-y-8 text-gray-300">
        {/* Шапка сторінки */}
        <div className="border-b border-[#2a3642] pb-6 space-y-2">
          <h1 className="text-3xl font-black text-white tracking-wide uppercase">
            Terms of Service & User Agreement
          </h1>
          <p className="text-xs text-gray-400">
            Last updated: November 2026. Please read these terms carefully before using <span className="text-[#ff4655] font-bold">AFTERBOOST</span> services.
          </p>
        </div>

        {/* 1. Загальні положення */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">1. General Provisions & Acceptance</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            By accessing or using the AFTERBOOST website, purchasing any ranking services, or interacting with our platform, you legally agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately cease usage of our platform. AFTERBOOST provides digital video game enhancement services for Valorant, operated independently.
          </p>
        </section>

        {/* 2. Зв'язок з Riot Games */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">2. Intellectual Property & Riot Games Disclaimer</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            AFTERBOOST is in no way affiliated with, endorsed, sponsored, or officially connected with Riot Games, Inc., Valorant, or any of their associated subsidiaries and partners. All game titles, character names, assets, logos, and associated imagery are trademarks and registered copyrights of Riot Games, Inc. 
          </p>
          <p className="text-xs leading-relaxed text-gray-400">
            Our services involve assisting users with in-game progression. We make no claims to ownership of Valorant intellectual property. All rights belong strictly to their respective copyright holders.
          </p>
        </section>

        {/* 3. Ризики акаунтів та відмова від відповідальності */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">3. Account Risks & Limitation of Liability</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            Account sharing, professional boosting, and third-party matchmaking assistance are strictly prohibited under the Riot Games Terms of Service and End User License Agreement (EULA). By purchasing our services, you fully acknowledge, understand, and accept all inherent risks associated with account sharing, including but not limited to temporary suspensions, competitive bans, or rank rollbacks imposed by game publishers.
          </p>
          <p className="text-xs leading-relaxed text-gray-400">
            <strong className="text-white">AFTERBOOST assumes zero liability</strong> for any punitive actions, suspensions, or bans taken against your Riot Games account by the game publisher. While our professional boosters utilize secure VPN configurations matching your geographical region and mandatory offline mode to minimize risks, the ultimate responsibility rests entirely with the account owner.
          </p>
        </section>

        {/* 4. Політика повернення коштів (Рефанди) */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">4. Refund & Cancellation Policy</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            Customer satisfaction is paramount, but financial transactions are subject to strict conditions:
          </p>
          <ul className="list-disc list-inside text-xs space-y-2 text-gray-400 pl-2">
            <li>
              <strong className="text-white">Before Service Initiation:</strong> Full or partial refunds are available exclusively if the boosting process or order has not yet been started by an assigned booster.
            </li>
            <li>
              <strong className="text-white">During Service:</strong> Once a booster has logged into your account or active matchmaking games have been played towards your order, refunds are strictly non-applicable.
            </li>
            <li>
              <strong className="text-white">Disputes & Chargebacks:</strong> Unauthorized chargebacks or payment disputes filed directly through financial institutions without prior resolution with our support team will result in an immediate permanent ban from our platform and public listing of associated user identifiers.
            </li>
          </ul>
        </section>

        {/* 5. Конфіденційність */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">5. Privacy & Data Protection</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            We respect your digital privacy. All account credentials, login tokens, personal messages, and payment data submitted through our checkout and client panels are heavily encrypted and permanently purged from our operational databases immediately upon successful completion of your order. We never share, sell, or distribute customer information to external third parties.
          </p>
        </section>

        {/* 6. Зміни до умов */}
        <section className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-3 shadow-lg">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">6. Modifications to Terms</h2>
          <p className="text-xs leading-relaxed text-gray-400">
            AFTERBOOST reserves the right to modify, amend, or completely rewrite these Terms of Service at any given time without prior individual notice. Continued use of our website following any alterations constitutes your binding acceptance of the revised terms.
          </p>
        </section>
      </main>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}