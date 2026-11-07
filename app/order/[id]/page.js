// app/order/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import CryptoPaymentBlock from '@/components/order/CryptoPaymentBlock';

export default function OrderPage() {
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [userWallet, setUserWallet] = useState('');

  useEffect(() => {
    if (orderId) {
      const savedWallet = sessionStorage.getItem('userWallet');
      if (savedWallet) setUserWallet(savedWallet);

      const savedOrder = sessionStorage.getItem('activeOrder');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
        if (parsedOrder.status === 'Paid' || parsedOrder.isPaid) setIsPaid(true);
      } else {
        const defaultOrder = {
          price: 49,
          currency: 'USD',
          currentRank: 'Gold I',
          desiredRank: 'Platinum I',
          riotId: 'Player#1234',
        };
        setOrder(defaultOrder);
      }

      const savedMessages = localStorage.getItem(`chat_${orderId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        const initialMsg = [
          {
            sender: 'System',
            text: 'Order created successfully! Connect and sign with your Web3 wallet to unlock the chat and complete payment.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
        setMessages(initialMsg);
        localStorage.setItem(`chat_${orderId}`, JSON.stringify(initialMsg));
      }
    }
  }, [orderId]);

  const handleWalletConnect = (address) => {
    setUserWallet(address);
  };

  const handlePaymentSuccess = (txHash) => {
    setIsPaid(true);
    if (order) {
      const updatedOrder = { ...order, status: 'Paid & In Progress', isPaid: true, txHash };
      setOrder(updatedOrder);
      sessionStorage.setItem('activeOrder', JSON.stringify(updatedOrder));
    }

    const paymentMsg = {
      sender: 'System',
      text: `Payment confirmed via smart contract! TX Hash: ${txHash.slice(0, 10)}...`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedMessages = [...messages, paymentMsg];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${orderId}`, JSON.stringify(updatedMessages));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userWallet) return;

    const shortWallet = `${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`;

    const messageData = {
      sender: shortWallet,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, messageData];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${orderId}`, JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const currencySymbol = order?.currency === 'EUR' ? '€' : '$';

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
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
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
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
                  {order.riotId && (
                    <div>
                      <span className="text-gray-400 block text-xs">Riot ID:</span>
                      <span className="font-semibold text-white">{order.riotId}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#2a3642] flex justify-between items-center">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-xl font-black text-[#ff4655]">
                      {currencySymbol}{order.price} USDT
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400">Loading order details...</p>
              )}
            </div>

            <CryptoPaymentBlock 
              order={order} 
              onPaymentSuccess={handlePaymentSuccess} 
              onWalletConnect={handleWalletConnect} 
            />
          </div>

          <div className="md:col-span-2 bg-[#1f2326] border border-[#2a3642] rounded-xl shadow-xl flex flex-col h-[520px]">
            <div className="p-4 border-b border-[#2a3642] bg-[#171a1d] rounded-t-xl flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${userWallet ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                Secure Web3 Order Chat {userWallet ? '(Unlocked)' : '(Locked: Connect Wallet)'}
              </span>
              <span className="text-xs text-gray-400 font-mono">ID: {orderId}</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.sender === 'System'
                      ? 'bg-[#0f1923] text-gray-400 mx-auto text-center border border-[#2a3642] text-xs w-full'
                      : msg.sender.includes('...')
                      ? 'bg-[#ff4655] text-white self-end rounded-br-none'
                      : 'bg-[#2a3642] text-gray-200 self-start rounded-bl-none'
                  }`}
                >
                  <div className="flex justify-between items-center gap-4 mb-1">
                    <span className="font-bold text-[10px] opacity-75 font-mono">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] opacity-50">{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#2a3642] bg-[#171a1d] rounded-b-xl flex gap-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!userWallet}
                placeholder={userWallet ? "Type your message to the booster..." : "Connect & sign wallet to chat..."}
                className="flex-1 bg-[#0f1923] border border-[#2a3642] rounded-lg px-3 py-2 text-sm text-white focus:border-[#ff4655] outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userWallet}
                className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold px-5 py-2 rounded-lg text-sm transition-all cursor-pointer disabled:opacity-50"
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