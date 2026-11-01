// components/home/BoostCalculator.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Повна сітка рангів та дивізіонів із базовою вартістю за 1 крок
const RANKS = [
  // Iron (1$ за крок)
  { id: 0, name: 'Iron 1', tier: 'Iron', basePrice: 1 },
  { id: 1, name: 'Iron 2', tier: 'Iron', basePrice: 1 },
  { id: 2, name: 'Iron 3', tier: 'Iron', basePrice: 1 },
  // Bronze (1.5$ за крок)
  { id: 3, name: 'Bronze 1', tier: 'Bronze', basePrice: 1.5 },
  { id: 4, name: 'Bronze 2', tier: 'Bronze', basePrice: 1.5 },
  { id: 5, name: 'Bronze 3', tier: 'Bronze', basePrice: 1.5 },
  // Silver (2$ за крок)
  { id: 6, name: 'Silver 1', tier: 'Silver', basePrice: 2 },
  { id: 7, name: 'Silver 2', tier: 'Silver', basePrice: 2 },
  { id: 8, name: 'Silver 3', tier: 'Silver', basePrice: 2 },
  // Gold (3$ за крок)
  { id: 9, name: 'Gold 1', tier: 'Gold', basePrice: 3 },
  { id: 10, name: 'Gold 2', tier: 'Gold', basePrice: 3 },
  { id: 11, name: 'Gold 3', tier: 'Gold', basePrice: 3 },
  // Platinum (5$ за крок)
  { id: 12, name: 'Platinum 1', tier: 'Platinum', basePrice: 5 },
  { id: 13, name: 'Platinum 2', tier: 'Platinum', basePrice: 5 },
  { id: 14, name: 'Platinum 3', tier: 'Platinum', basePrice: 5 },
  // Diamond (7$ за крок)
  { id: 15, name: 'Diamond 1', tier: 'Diamond', basePrice: 7 },
  { id: 16, name: 'Diamond 2', tier: 'Diamond', basePrice: 7 },
  { id: 17, name: 'Diamond 3', tier: 'Diamond', basePrice: 7 },
  // Ascendant (10$ за крок)
  { id: 18, name: 'Ascendant 1', tier: 'Ascendant', basePrice: 10 },
  { id: 19, name: 'Ascendant 2', tier: 'Ascendant', basePrice: 10 },
  { id: 20, name: 'Ascendant 3', tier: 'Ascendant', basePrice: 10 },
  // Immortal (20$ за крок)
  { id: 21, name: 'Immortal 1', tier: 'Immortal', basePrice: 20 },
  { id: 22, name: 'Immortal 2', tier: 'Immortal', basePrice: 20 },
  { id: 23, name: 'Immortal 3', tier: 'Immortal', basePrice: 20 },
  // Radiant (фіксована вершина)
  { id: 24, name: 'Radiant', tier: 'Radiant', basePrice: 100 },
];

export default function BoostCalculator() {
  const router = useRouter();

  // Вибір індексів рангів
  const [currentIndex, setCurrentIndex] = useState(0); // Iron 1
  const [desiredIndex, setDesiredIndex] = useState(6); // Silver 1

  // Валюта: USD або EUR
  const [currency, setCurrency] = useState('USD');
  const currencySymbol = currency === 'USD' ? '$' : '€';
  const currencyRate = currency === 'EUR' ? 0.92 : 1;

  // Чекбокси додаткових опцій
  const [options, setOptions] = useState({
    duo: false,
    express: false,
    agents: false,
    stream: false,
    offline: false,
    vpn: false,
  });

  const handleCheckboxChange = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Розрахунок ціни з урахуванням кількості кроків та знижки за обсяг
  const calculatePrice = () => {
    if (desiredIndex <= currentIndex) return 0;

    let subtotal = 0;
    const stepsCount = desiredIndex - currentIndex;

    for (let i = currentIndex; i < desiredIndex; i++) {
      subtotal += RANKS[i].basePrice;
    }

    // Прогресивна знижка за кількість рангів (>3 дивізіонів — 10%, >6 дивізіонів — 20%)
    let discount = 1;
    if (stepsCount >= 6) {
      discount = 0.8;
    } else if (stepsCount >= 3) {
      discount = 0.9;
    }

    let total = subtotal * discount;

    // Націнки за чекбокси
    if (options.duo) total *= 1.30;
    if (options.express) total *= 1.25;
    if (options.agents) total *= 1.10;
    if (options.stream) total *= 1.10;

    return Math.round(total * currencyRate * 100) / 100;
  };

  const finalPrice = calculatePrice();
  const stepsCount = desiredIndex > currentIndex ? desiredIndex - currentIndex : 0;

  const handleProceed = () => {
    const orderData = {
      currentRank: RANKS[currentIndex].name,
      desiredRank: RANKS[desiredIndex].name,
      options,
      currency,
      price: finalPrice,
    };
    sessionStorage.setItem('currentOrder', JSON.stringify(orderData));
    router.push('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Перемикач валют */}
      <div className="flex justify-center items-center gap-3">
        <span className="text-sm text-gray-400 font-semibold">Currency:</span>
        <button
          type="button"
          onClick={() => setCurrency('USD')}
          className={`px-4 py-1.5 rounded font-bold text-sm transition-all cursor-pointer ${
            currency === 'USD' ? 'bg-[#ff4655] text-white shadow-md shadow-[#ff4655]/30' : 'bg-[#1f2326] text-gray-400 hover:text-white'
          }`}
        >
          USD ($)
        </button>
        <button
          type="button"
          onClick={() => setCurrency('EUR')}
          className={`px-4 py-1.5 rounded font-bold text-sm transition-all cursor-pointer ${
            currency === 'EUR' ? 'bg-[#ff4655] text-white shadow-md shadow-[#ff4655]/30' : 'bg-[#1f2326] text-gray-400 hover:text-white'
          }`}
        >
          EUR (€)
        </button>
      </div>

      {/* Калькулятор рангів */}
      <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl grid gap-6 md:grid-cols-2 relative">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Current Rank</label>
          <select
            value={currentIndex}
            onChange={(e) => {
              const newIdx = Number(e.target.value);
              setCurrentIndex(newIdx);
              if (newIdx >= desiredIndex) {
                setDesiredIndex(Math.min(newIdx + 1, RANKS.length - 1));
              }
            }}
            className="w-full bg-[#0f1923] border border-[#2a3642] rounded p-3 text-white focus:border-[#ff4655] outline-none font-medium cursor-pointer"
          >
            {RANKS.slice(0, RANKS.length - 1).map((rank) => (
              <option key={rank.id} value={rank.id}>
                {rank.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Desired Rank</label>
          <select
            value={desiredIndex}
            onChange={(e) => setDesiredIndex(Number(e.target.value))}
            className="w-full bg-[#0f1923] border border-[#2a3642] rounded p-3 text-white focus:border-[#ff4655] outline-none font-medium cursor-pointer"
          >
            {RANKS.map((rank) => (
              <option key={rank.id} value={rank.id} disabled={rank.id <= currentIndex}>
                {rank.name} {rank.id <= currentIndex ? '(unavailable)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Підказка про знижку за обсяг рангів */}
        <div className="md:col-span-2 bg-[#0f1923] border border-[#ff4655]/30 p-3 rounded-lg flex flex-col sm:flex-row items-center justify-between text-sm gap-2">
          <span className="text-gray-300">
            ⚡ <strong>Bulk Discount:</strong> The larger the range you order, the cheaper each division costs!
          </span>
          <span className="text-[#ff4655] font-bold whitespace-nowrap">
            {stepsCount >= 6 ? 'Active: 20% OFF' : stepsCount >= 3 ? 'Active: 10% OFF' : 'Select 3+ divisions'}
          </span>
        </div>
      </div>

      {/* Чекбокси опцій із тултипами */}
      <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl">
        <h3 className="font-bold mb-4 text-[#ff4655] tracking-wide text-xs uppercase">Additional Options & Safety</h3>
        <div className="grid gap-4 md:grid-cols-2 text-xs">
          
          {/* Duo */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.duo}
              onChange={() => handleCheckboxChange('duo')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">Duo Queue (+30%)</span>
              <span className="text-[11px] text-gray-400">Play together in a lobby with our booster.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              The safest method: win together in a lobby with the booster!
            </div>
          </label>

          {/* Express */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.express}
              onChange={() => handleCheckboxChange('express')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">Express Order (+25%)</span>
              <span className="text-[11px] text-gray-400">Priority execution without waiting in queue.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              The booster starts playing immediately after payment confirmation.
            </div>
          </label>

          {/* Agents */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.agents}
              onChange={() => handleCheckboxChange('agents')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">Specific Agents (+10%)</span>
              <span className="text-[11px] text-gray-400">Play strictly on your favorite characters/roles.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              You can specify your agent pool on the next checkout step.
            </div>
          </label>

          {/* Stream */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.stream}
              onChange={() => handleCheckboxChange('stream')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">Stream / Broadcast (+10%)</span>
              <span className="text-[11px] text-gray-400">Private match stream via Discord.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              Watch every match in real-time through a private stream.
            </div>
          </label>

          {/* Offline mode */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.offline}
              onChange={() => handleCheckboxChange('offline')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">Offline Mode (Free)</span>
              <span className="text-[11px] text-gray-400">Show as offline to your friends list.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              Nobody on your friend list will know you are currently playing.
            </div>
          </label>

          {/* VPN */}
          <label className="flex items-start gap-3 cursor-pointer group relative bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] hover:border-[#ff4655] transition-all">
            <input
              type="checkbox"
              checked={options.vpn}
              onChange={() => handleCheckboxChange('vpn')}
              className="w-4 h-4 accent-[#ff4655] mt-0.5"
            />
            <div>
              <span className="font-semibold block text-white group-hover:text-[#ff4655] transition-colors">VPN Protection (Free)</span>
              <span className="text-[11px] text-gray-400">IP address matching your exact region.</span>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-black text-[10px] text-gray-200 rounded shadow-lg z-20 text-center border border-gray-700 pointer-events-none">
              Full simulation of your usual location to protect your account.
            </div>
          </label>

        </div>
      </div>

      {/* Підсумок та кнопка */}
      <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-gray-400 text-xs uppercase font-semibold">Total Price:</span>
          <div className="text-3xl font-black text-[#ff4655] mt-0.5">
            {finalPrice} {currencySymbol}
          </div>
          <span className="text-[10px] text-gray-400">Estimated delivery: ~1-2 days</span>
        </div>
        <button
          type="button"
          onClick={handleProceed}
          disabled={finalPrice <= 0}
          className="w-full md:w-auto bg-[#ff4655] hover:bg-[#fa5763] disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff4655]/30 cursor-pointer"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}