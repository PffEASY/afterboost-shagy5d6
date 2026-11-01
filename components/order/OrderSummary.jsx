// components/order/OrderSummary.jsx
'use client';

export default function OrderSummary({ order }) {
  if (!order) return null;

  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl space-y-4 text-white">
      <div className="flex justify-between items-center border-b border-[#2a3642] pb-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-[#ff4655]">Order Summary #{order.orderId || '123456'}</h3>
        <span className="text-xs bg-[#0f1923] border border-[#2a3642] px-2.5 py-1 rounded text-gray-300 font-semibold">
          {order.currency}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] space-y-1">
          <span className="text-gray-400 uppercase font-bold text-[10px]">Boost Route</span>
          <div className="font-black text-sm text-white">{order.currentRank} → {order.desiredRank}</div>
        </div>

        <div className="bg-[#0f1923] p-3 rounded-lg border border-[#2a3642] space-y-1">
          <span className="text-gray-400 uppercase font-bold text-[10px]">Account Details</span>
          <div className="font-semibold text-white">Riot ID: <span className="text-[#ff4655]">{order.riotId || 'Player#1234'}</span></div>
          <div className="font-semibold text-gray-300">Contact: {order.contact || 'Not provided'}</div>
        </div>
      </div>

      {/* Обрані опції */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected Options</span>
        <div className="flex flex-wrap gap-2">
          {order.options && Object.entries(order.options).map(([key, val]) => (
            val && (
              <span key={key} className="bg-[#0f1923] border border-[#2a3642] px-2.5 py-1 rounded-md text-[11px] text-gray-300 uppercase font-semibold">
                ✓ {key}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}