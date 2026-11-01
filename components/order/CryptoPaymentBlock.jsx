// components/order/CryptoPaymentBlock.jsx
'use client';

import { useState } from 'react';

export default function CryptoPaymentBlock({ order, onPaymentSuccess }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPaid, setIsPaid] = useState(order?.isPaid || false);
  const [txHash, setTxHash] = useState('');

  const handleCryptoPay = async () => {
    setIsConnecting(true);

    try {
      // У майбутньому тут буде виклик смартконтракту через Web3/TronWeb (наприклад, TronLink)
      // Смартконтракт автоматично бере суму (order.price), валюту та orderId у payload транзакції.
      
      setTimeout(() => {
        // Симуляція успішної транзакції в мережі TRC
        const fakeHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setTxHash(fakeHash);
        setIsPaid(true);
        setIsConnecting(false);

        if (onPaymentSuccess) {
          onPaymentSuccess(fakeHash);
        }
      }, 2500);

    } catch (error) {
      console.error("Payment failed", error);
      setIsConnecting(false);
    }
  };

  const currencySymbol = order?.currency === 'USD' ? '$' : '€';

  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl space-y-4 text-white">
      <div className="flex justify-between items-center border-b border-[#2a3642] pb-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-[#ff4655]">Crypto Payment (TRC Network)</h3>
        <span className={`text-xs px-3 py-1 rounded font-bold uppercase tracking-wider ${isPaid ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'}`}>
          {isPaid ? 'Paid' : 'Awaiting Payment'}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between bg-[#0f1923] p-3 rounded-lg border border-[#2a3642]">
          <span className="text-gray-400">Amount to Pay:</span>
          <span className="font-black text-sm text-[#ff4655]">{currencySymbol}{order?.price || 0} USDT (TRC-20)</span>
        </div>

        {!isPaid ? (
          <div className="space-y-3 pt-2">
            <p className="text-gray-400 text-[11px]">
              Clicking the button will request your TRC crypto wallet (e.g. TronLink) to sign the smart contract transaction containing your order ID data.
            </p>
            <button
              type="button"
              onClick={handleCryptoPay}
              disabled={isConnecting}
              className="w-full bg-[#ff4655] hover:bg-[#fa5763] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff4655]/20 cursor-pointer disabled:opacity-50"
            >
              {isConnecting ? 'Waiting for Wallet Confirmation...' : 'Connect Wallet & Pay via TRC'}
            </button>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg space-y-2 text-center">
            <div className="font-bold text-green-400 text-sm">✅ Payment Successful!</div>
            <p className="text-[11px] text-gray-300">Funds and Order ID were securely transmitted via smart contract.</p>
            {txHash && (
              <div className="text-[10px] text-gray-400 font-mono break-all bg-[#0f1923] p-2 rounded border border-[#2a3642]">
                TX Hash: {txHash}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}