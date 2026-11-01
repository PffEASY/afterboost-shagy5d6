// app/order/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';

export default function OrderPage() {
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // Завантажуємо дані замовлення та попередні повідомлення чату
  useEffect(() => {
    if (orderId) {
      const savedOrder = sessionStorage.getItem('activeOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
        if (parsedOrder.status === 'Paid') setIsPaid(true);
      }

      // Завантажуємо історію чату з localStorage для цього ID
      const savedMessages = localStorage.getItem(`chat_${orderId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Початкове системне повідомлення в чаті
        const initialMsg = [
          {
            sender: 'System',
            text: 'Order created successfully! Welcome to your secure order chat.',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
        setMessages(initialMsg);
        localStorage.setItem(`chat_${orderId}`, JSON.stringify(initialMsg));
      }
    }
  }, [orderId]);

  // Відправка повідомлення у чат
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sender: 'Customer', // У майбутньому можна змінювати залежно від того, хто пише (ви чи клієнт)
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedMessages = [...messages, messageData];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${orderId}`, JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  // Симуляція оплати
  const handleSimulatePayment = () => {
    setIsPaid(true);
    if (order) {
      const updatedOrder = { ...order, status: 'Paid & In Progress' };
      setOrder(updatedOrder);
      sessionStorage.setItem('activeOrder', JSON.stringify(updatedOrder));
    }

    // Додаємо системне повідомлення про оплату
    const paymentMsg = {
      sender: 'System',
      text: 'Payment confirmed! The booster has been notified and will start shortly.',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updatedMessages = [...messages, paymentMsg];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${orderId}`, JSON.stringify(updatedMessages));
  };

  const currencySymbol = order?.currency === 'EUR' ? '€' : '$';

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#2a3642] pb-4 gap-4">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Order ID: #{orderId}
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              ORDER & LIVE CHAT
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPaid
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}
            >
              {isPaid ? 'Paid / In Progress' : 'Awaiting Payment'}
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* ЛІВА КОЛОНКА: Деталі замовлення та Оплата */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-[#1f2326] border border-[#2a3642] p-5 rounded-xl shadow-xl space-y-4">
              <h3 className="font-bold text-[#ff4655] text-sm uppercase tracking-wider">
                Summary
              </h3>

              {order ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400 block text-xs">Route:</span>
                    <span className="font-bold text-white">
                      {order.currentRank} → {order.desiredRank}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">
                      Riot ID:
                    </span>
                    <span className="font-semibold text-white">
                      {order.riotId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">
                      Contact:
                    </span>
                    <span className="font-semibold text-white">
                      {order.contact}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#2a3642] flex justify-between items-center">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-xl font-black text-[#ff4655]">
                      {order.price} {currencySymbol}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  Loading order details...
                </p>
              )}
            </div>

            {/* Блок оплати */}
            <div className="bg-[#1f2326] border border-[#2a3642] p-5 rounded-xl shadow-xl space-y-4">
              <h3 className="font-bold text-[#ff4655] text-sm uppercase tracking-wider">
                Payment
              </h3>

              {!isPaid ? (
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">
                    Transfer the exact amount using your preferred payment
                    method or simulate payment to test the system:
                  </p>
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-lg cursor-pointer"
                  >
                    Simulate Successful Payment
                  </button>
                </div>
              ) : (
                <div className="text-xs text-green-400 bg-green-950/30 border border-green-500/20 p-3 rounded-lg">
                  ✓ Payment has been successfully verified. Your booster is
                  ready!
                </div>
              )}
            </div>
          </div>

          {/* ПРАВА КОЛОНКА: Чат із бустером */}
          <div className="md:col-span-2 bg-[#1f2326] border border-[#2a3642] rounded-xl shadow-xl flex flex-col h-[500px]">
            <div className="p-4 border-b border-[#2a3642] bg-[#171a1d] rounded-t-xl flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                Live Support & Booster Chat
              </span>
              <span className="text-xs text-gray-400">ID: {orderId}</span>
            </div>

            {/* Вікно повідомлень */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.sender === 'System'
                      ? 'bg-[#0f1923] text-gray-400 mx-auto text-center border border-[#2a3642] text-xs w-full'
                      : msg.sender === 'Customer'
                      ? 'bg-[#ff4655] text-white self-end rounded-br-none'
                      : 'bg-[#2a3642] text-gray-200 self-start rounded-bl-none'
                  }`}
                >
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="font-bold text-[10px] opacity-75">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] opacity-50">{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Форма відправки повідомлення */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#2a3642] bg-[#171a1d] rounded-b-xl flex gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-[#0f1923] border border-[#2a3642] rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff4655] outline-none"
              />
              <button
                type="submit"
                className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold px-5 py-2 rounded-lg text-sm transition-all cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
