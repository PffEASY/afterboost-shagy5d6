// app/faq-guarantees/page.js
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] flex flex-col">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сторінки FAQ & Guarantees */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full space-y-8 text-gray-300">
        {/* Шапка сторінки */}
        <div className="border-b border-[#2a3642] pb-6 space-y-2">
          <h1 className="text-3xl font-black text-white tracking-wide uppercase">
            FAQ & Guarantees
          </h1>
          <p className="text-xs text-gray-400">
            Find answers to frequently asked questions regarding our security protocols, booster qualification, and delivery guarantees at <span className="text-[#ff4655] font-bold">AFTERBOOST</span>.
          </p>
        </div>

        {/* Секція гарантій */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-[#ff4655] uppercase tracking-wider">Our Core Guarantees</h2>
          
          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">🛡️ Absolute Account Security & VPN Protection</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              We treat every account with extreme care. Every professional booster assigned to your order uses a secure, dedicated VPN matching your exact city and country location, alongside mandatory offline mode. This ensures that your friends list and Riot Games security systems register zero suspicious anomalies.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">⚡ Guaranteed Delivery Times</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              Orders begin processing almost instantly after payment confirmation. Our top-tier Immortal and Radiant boosters maintain a high win-rate, completing divisions swiftly within estimated timeframes. If you select Express Priority, your order is moved straight to the top of the queue.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">💬 24/7 Direct Communication</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              You are never left in the dark. Through our dedicated order chat system, you can communicate directly with your booster in real-time, inquire about progress, or coordinate specific play schedules.
            </p>
          </div>
        </div>

        {/* Секція FAQ (Часті запитання) */}
        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-black text-[#ff4655] uppercase tracking-wider">Frequently Asked Questions</h2>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">Q: Who will be playing on my account?</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              A: Only verified, vetted professional players who have achieved peak ranks of Immortal or Radiant in Valorant. We never hire random or untrusted players.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">Q: Can I play other games or log into my account while boosting is active?</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              A: No. While an active boost is underway, logging into your Riot account will interrupt the booster&apos;s session and can trigger security warnings. Always coordinate with your booster via the chat before opening the game.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">Q: How does Duo Queue work?</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              A: With Duo Queue, you play alongside our booster from your own account in a party. You do not need to share your password or login credentials, making it 100% secure against account takeovers.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">Q: What payment methods do you accept?</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              A: We currently support secure cryptocurrency payments (such as USDT via the TRC network), offering fast, anonymous, and reliable transaction processing through smart contracts.
            </p>
          </div>

          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl space-y-2 shadow-lg">
            <h3 className="font-bold text-white text-sm">Q: What happens if my order gets delayed?</h3>
            <p className="text-xs leading-relaxed text-gray-400">
              A: In the rare event of unforeseen delays or booster unavailability, our support team immediately reassigns another top-tier professional to ensure your order is completed as quickly as possible.
            </p>
          </div>
        </div>
      </main>

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}