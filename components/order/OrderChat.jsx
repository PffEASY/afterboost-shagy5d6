// components/order/OrderChat.jsx
'use client';

import { useState } from 'react';

export default function OrderChat() {
  const [messages, setMessages] = useState([
    { sender: 'Booster', text: 'Hello! I have received your order details. I will start boosting shortly.', time: '12:00' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl flex flex-col h-80 text-white">
      <div className="border-b border-[#2a3642] pb-3 mb-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-[#ff4655]">Direct Order Chat</h3>
        <p className="text-[11px] text-gray-400">Chat securely with your assigned professional booster.</p>
      </div>

      {/* Історія повідомлень */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-2.5 rounded-xl max-w-[80%] ${m.sender === 'You' ? 'bg-[#ff4655] text-white ml-auto' : 'bg-[#0f1923] border border-[#2a3642] text-gray-200'}`}>
            <div className="flex justify-between items-center text-[9px] text-gray-400 mb-1">
              <span className="font-bold">{m.sender}</span>
              <span>{m.time}</span>
            </div>
            <p className="leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>

      {/* Поле вводу */}
      <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-[#2a3642] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to your booster..."
          className="flex-1 bg-[#0f1923] border border-[#2a3642] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ff4655]"
        />
        <button
          type="submit"
          className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}