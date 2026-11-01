// app/checkout/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function CheckoutPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  // Поля форми клієнта
  const [riotId, setRiotId] = useState('');
  const [contact, setContact] = useState('');
  const [preferredAgents, setPreferredAgents] = useState('');

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('currentOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    if (!riotId.trim() || !contact.trim()) {
      alert('Please fill in your Riot ID and Contact details!');
      return;
    }

    // Генеруємо унікальний ідентифікатор замовлення для чату
    const orderId = 'boost_' + Math.random().toString(36).substring(2, 9);

    // Зберігаємо повні дані замовлення разом із контактами клієнта
    const fullOrderDetails = {
      ...order,
      orderId,
      riotId,
      contact,
      preferredAgents: order?.options?.agents ? preferredAgents : 'N/A',
      status: 'Awaiting Payment',
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem('activeOrder', JSON.stringify(fullOrderDetails));

    // Переходимо на сторінку чату та оплати
    router.push(`/order/${orderId}`);
  };

  const currencySymbol = order?.currency === 'EUR' ? '€' : '$';

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1]">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-6 tracking-wide text-center md:text-left">
          CHECKOUT ORDER
        </h1>

        {order ? (
          <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl space-y-6">
            
            {/* Підсумок замовлення з калькулятора */}
            <div className="border-b border-[#2a3642] pb-6">
              <h2 className="text-lg font-bold text-[#ff4655] mb-3">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Boost Route:</span>
                <span className="font-bold text-white text-base">
                  {order.currentRank} <span className="text-[#ff4655]">→</span> {order.desiredRank}
                </span>
              </div>

              {/* Перелік активних опцій */}
              <div className="mt-3 bg-[#0f1923] p-3 rounded-lg border border-[#2a3642]">
                <span className="text-xs text-gray-400 block mb-1 font-semibold">Selected Options:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {order.options?.duo && <span className="bg-[#ff4655]/20 text-[#ff4655] px-2 py-0.5 rounded border border-[#ff4655]/40">Duo Queue</span>}
                  {order.options?.express && <span className="bg-[#ff4655]/20 text-[#ff4655] px-2 py-0.5 rounded border border-[#ff4655]/40">Express Order</span>}
                  {order.options?.agents && <span className="bg-[#ff4655]/20 text-[#ff4655] px-2 py-0.5 rounded border border-[#ff4655]/40">Specific Agents</span>}
                  {order.options?.stream && <span className="bg-[#ff4655]/20 text-[#ff4655] px-2 py-0.5 rounded border border-[#ff4655]/40">Live Stream</span>}
                  {order.options?.offline && <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Offline Mode</span>}
                  {order.options?.vpn && <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded">VPN Protection</span>}
                  {!Object.values(order.options || {}).some(Boolean) && <span className="text-gray-500">Standard Boost</span>}
                </div>
              </div>

              {/* Фінальна сума */}
              <div className="flex justify-between items-baseline mt-4">
                <span className="text-gray-300 font-semibold">Total Price:</span>
                <span className="text-3xl font-black text-[#ff4655]">
                  {order.price} {currencySymbol}
                </span>
              </div>
            </div>

            {/* Форма даних покупця */}
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Riot ID <span className="text-[#ff4655]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                  placeholder="e.g. Player#EUW or Nickname#1234"
                  className="w-full bg-[#0f1923] border border-[#2a3642] rounded p-3 text-white focus:border-[#ff4655] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Contact Info (Discord / Telegram) <span className="text-[#ff4655]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. @telegram_handle or discord_username"
                  className="w-full bg-[#0f1923] border border-[#2a3642] rounded p-3 text-white focus:border-[#ff4655] outline-none text-sm"
                />
              </div>

              {/* Додаткове поле, якщо обрано чекбокс 'Specific Agents' */}
              {order.options?.agents && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Preferred Agents / Roles
                  </label>
                  <input
                    type="text"
                    value={preferredAgents}
                    onChange={(e) => setPreferredAgents(e.target.value)}
                    placeholder="e.g. Jett, Reyna, Duelists only"
                    className="w-full bg-[#0f1923] border border-[#2a3642] rounded p-3 text-white focus:border-[#ff4655] outline-none text-sm"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-[#ff4655]/30 mt-6 cursor-pointer"
              >
                Proceed to Payment & Live Chat
              </button>
            </form>

          </div>
        ) : (
          /* Якщо користувач зайшов на /checkout без вибору в калькуляторі */
          <div className="bg-[#1f2326] border border-[#2a3642] p-8 rounded-xl text-center space-y-4 shadow-xl">
            <p className="text-gray-400">No active order found. Please select your rank in the calculator first.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-lg shadow-[#ff4655]/20 cursor-pointer"
            >
              Back to Calculator
            </button>
          </div>
        )}
      </main>
    </div>
  );
}