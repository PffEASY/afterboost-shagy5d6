// components/support/SupportWidget.jsx
'use client';

import { useState } from 'react';

const botResponses = {
  default: "Hello! I'm your Valorant Boost assistant. How can I help you today?",
  price: "Our prices depend on your current and desired rank. You can check the exact price using the calculator on the homepage!",
  safety: "We use 100% secure VPN matching your region and strict offline mode during all boosts.",
  payment: "We support major credit cards and secure payment gateways. You can simulate payment during checkout for testing!"
};

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: botResponses.default }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'You', text: input };
    const textLower = input.toLowerCase();
    
    let botReply = "Thanks for your question! For specific order queries, please use your order chat after purchasing, or contact our support team.";
    if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('цін')) {
      botReply = botResponses.price;
    } else if (textLower.includes('safe') || textLower.includes('ban') || textLower.includes('безпек')) {
      botReply = botResponses.safety;
    } else if (textLower.includes('pay') || textLower.includes('оплат')) {
      botReply = botResponses.payment;
    }

    setMessages(prev => [...prev, userMsg, { sender: 'Bot', text: botReply }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#ff4655] hover:bg-[#fa5763] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer animate-bounce"
        >
          💬
        </button>
      ) : (
        <div className="bg-[#1f2326] border border-[#2a3642] w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Шапка віджета */}
          <div className="bg-[#171a1d] p-3 border-b border-[#2a3642] flex justify-between items-center">
            <span className="font-bold text-xs text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Support Bot
            </span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xs cursor-pointer">✕</button>
          </div>

          {/* Історія повідомлень */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`p-2.5 rounded-xl max-w-[85%] ${m.sender === 'You' ? 'bg-[#ff4655] text-white self-end ml-auto' : 'bg-[#2a3642] text-gray-200'}`}>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          {/* Поле вводу */}
          <form onSubmit={handleSend} className="p-2 border-t border-[#2a3642] bg-[#171a1d] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[#0f1923] border border-[#2a3642] rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#ff4655]"
            />
            <button type="submit" className="bg-[#ff4655] text-white px-3 py-1.5 rounded text-xs font-bold cursor-pointer hover:bg-[#fa5763]">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}