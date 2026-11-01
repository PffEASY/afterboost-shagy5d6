// components/checkout/CheckoutForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  const [riotId, setRiotId] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('pendingOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!riotId.trim() || !contact.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const activeOrder = {
        ...orderData,
        riotId,
        contact,
        paymentMethod,
        isPaid: false, // Оплата відбудеться вже на сторінці ордера у компоненті PaymentBlock
        orderId: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
      };

      sessionStorage.setItem('activeOrder', JSON.stringify(activeOrder));
      setIsSubmitting(false);
      
      // Перенаправляємо на сторінку замовлення, де буде блок оплати
      router.push(`/order/${activeOrder.orderId}`);
    }, 1000);
  };

  if (!orderData) {
    return (
      <div className="bg-[#1f2326] border border-[#2a3642] p-8 rounded-2xl shadow-xl max-w-xl mx-auto text-center space-y-4 text-white">
        <h2 className="text-xl font-black">No Active Order Found</h2>
        <p className="text-xs text-gray-400">Please configure your boost in the calculator first.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Back to Calculator
        </button>
      </div>
    );
  }

  const currencySymbol = orderData.currency === 'USD' ? '$' : '€';

  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-6 text-white">
      <div className="border-b border-[#2a3642] pb-4">
        <h2 className="text-xl font-black tracking-wide">ORDER DETAILS & SETUP</h2>
        <p className="text-xs text-gray-400">Provide your account details to proceed to your order page.</p>
      </div>

      <div className="bg-[#0f1923] border border-[#2a3642] p-4 rounded-xl space-y-2 text-xs">
        <div className="flex justify-between font-bold text-gray-300">
          <span>Route:</span>
          <span className="text-white">{orderData.current} → {orderData.desired}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-300">
          <span>Total Price:</span>
          <span className="text-[#ff4655] text-sm">{currencySymbol}{orderData.price} {orderData.currency}</span>
        </div>
      </div>

      <form onSubmit={handleCreateOrder} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Riot ID (Name#Tag)</label>
          <input
            type="text"
            required
            value={riotId}
            onChange={(e) => setRiotId(e.target.value)}
            placeholder="e.g. Player#1234"
            className="w-full bg-[#0f1923] border border-[#2a3642] rounded-lg p-3 text-xs text-white outline-none focus:border-[#ff4655]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Discord or Telegram</label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. username#0000 or @telegram"
            className="w-full bg-[#0f1923] border border-[#2a3642] rounded-lg p-3 text-xs text-white outline-none focus:border-[#ff4655]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ff4655] hover:bg-[#fa5763] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff4655]/20 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Order...' : 'Proceed to Order Page →'}
        </button>
      </form>
    </div>
  );
}