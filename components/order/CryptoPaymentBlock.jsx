// components/order/CryptoPaymentBlock.jsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACTS = {
  sepolia: {
    contractAddress: '0x7e84A29bA813dA15dBF8EF33D9b34D8b84efB903',
    usdtAddress: '0x7169D38820dfd117c3FA1f22a6f7dBAa7d0dE513',
    chainIdHex: '0xaa36a7',
  },
  arbitrum: {
    contractAddress: '0x726B2083E9bC0c1C1EFa48b5816a1e80392907E6',
    usdtAddress: '0xFd086bC7CD5C481DCC9C85ebe478A1C0b69FCbb9',
    chainIdHex: '0xa4b1',
  }
};

const PAYMENT_ABI = [
  "function payWithUSDT(string calldata _orderId, uint256 _amount, string calldata _orderSummary) external"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

export default function CryptoPaymentBlock({ order, onPaymentSuccess, onWalletConnect }) {
  const [selectedNetwork, setSelectedNetwork] = useState('arbitrum');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPaid, setIsPaid] = useState(order?.isPaid || false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedWallet = sessionStorage.getItem('userWallet');
    const savedNetwork = sessionStorage.getItem('userNetwork');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      if (savedNetwork) setSelectedNetwork(savedNetwork);
    }
  }, []);

  const handleConnectWallet = async (networkToUse = selectedNetwork) => {
    setError('');
    setIsConnecting(true);

    try {
      if (networkToUse === 'arbitrum' || networkToUse === 'sepolia') {
        if (typeof window.ethereum === 'undefined') {
          throw new Error('EVM provider is not available.');
        }

        const targetChainId = CONTRACTS[networkToUse].chainIdHex;
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
        } catch (switchError) {
          throw new Error('Failed to switch network in wallet.');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];
        const signer = await provider.getSigner();

        const message = `Sign-In to AfterBoost Order Session\nWallet: ${address}\nTimestamp: ${Date.now()}`;
        const signature = await signer.signMessage(message);

        if (!signature) {
          throw new Error('Wallet signature rejected.');
        }

        setWalletAddress(address);
        setSelectedNetwork(networkToUse);
        sessionStorage.setItem('userWallet', address);
        sessionStorage.setItem('userNetwork', networkToUse);
        sessionStorage.setItem('userSignature', signature);

        const existing = sessionStorage.getItem('activeOrder');
        let orderParsed = existing ? JSON.parse(existing) : { ...(order || {}) };
        orderParsed.clientWallet = address;
        orderParsed.network = networkToUse;
        sessionStorage.setItem('activeOrder', JSON.stringify(orderParsed));

        if (onWalletConnect) {
          onWalletConnect(address);
        }

      } else if (networkToUse === 'tron') {
        if (typeof window.tronWeb === 'undefined' || !window.tronWeb.defaultAddress.base58) {
          throw new Error('TronLink is not available.');
        }
        const address = window.tronWeb.defaultAddress.base58;
        setWalletAddress(address);
        setSelectedNetwork('tron');
        sessionStorage.setItem('userWallet', address);
        sessionStorage.setItem('userNetwork', 'tron');

        if (onWalletConnect) {
          onWalletConnect(address);
        }
      }
    } catch (err) {
      setError(err.message || 'Connection failed.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNetworkChange = (newNetwork) => {
    setSelectedNetwork(newNetwork);
    if (walletAddress) {
      handleConnectWallet(newNetwork);
    }
  };

  const handleDisconnectWallet = () => {
    sessionStorage.clear();
    setWalletAddress('');
    window.location.reload();
  };

  const handleCryptoPay = async () => {
    if (!walletAddress) return;
    setIsConnecting(true);
    setError('');

    try {
      if (selectedNetwork === 'tron') {
        throw new Error('Tron payment integration is pending.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const cfg = CONTRACTS[selectedNetwork];
      const currentOrder = order || JSON.parse(sessionStorage.getItem('activeOrder') || '{}');
      const rawPrice = currentOrder.price || 10;
      const orderId = window.location.pathname.split('/').pop() || 'ORDER_1';
      const orderSummaryText = `Route: ${currentOrder.currentRank || 'N/A'} -> ${currentOrder.desiredRank || 'N/A'}`;

      const amountInUnits = ethers.parseUnits(rawPrice.toString(), 6);

      const usdtContract = new ethers.Contract(cfg.usdtAddress, ERC20_ABI, signer);
      
      const approveTx = await usdtContract.approve(cfg.contractAddress, amountInUnits);
      await approveTx.wait();

      const paymentContract = new ethers.Contract(cfg.contractAddress, PAYMENT_ABI, signer);
      const tx = await paymentContract.payWithUSDT(orderId, amountInUnits, orderSummaryText);
      
      const receipt = await tx.wait();
      const hash = receipt.hash;

      setTxHash(hash);
      setIsPaid(true);

      const existing = sessionStorage.getItem('activeOrder');
      if (existing) {
        let orderParsed = JSON.parse(existing);
        orderParsed.isPaid = true;
        orderParsed.txHash = hash;
        sessionStorage.setItem('activeOrder', JSON.stringify(orderParsed));
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(hash);
      }

    } catch (err) {
      setError(err.reason || err.message || 'Transaction execution failed.');
    } finally {
      setIsConnecting(false);
    }
  };

  const currencySymbol = order?.currency === 'EUR' ? '€' : '$';

  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl space-y-5 text-white">
      <div className="flex justify-between items-center border-b border-[#2a3642] pb-3">
        <h3 className="text-sm font-black uppercase tracking-wide text-[#ff4655]">
          Web3 Authentication & Payment
        </h3>
        <span className={`text-xs px-3 py-1 rounded font-bold uppercase tracking-wider ${isPaid ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'}`}>
          {isPaid ? 'Paid' : walletAddress ? 'Authenticated' : 'Pending Login'}
        </span>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-xs text-red-400 break-all">
          {error}
        </div>
      )}

      <div className="space-y-2 text-xs">
        <label className="block font-bold uppercase text-gray-300 tracking-wider">
          Network
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleNetworkChange('arbitrum')}
            className={`p-2.5 rounded-xl border text-[11px] font-black uppercase transition-all cursor-pointer ${
              selectedNetwork === 'arbitrum'
                ? 'bg-[#ff4655]/10 border-[#ff4655] text-white'
                : 'bg-[#0f1923] border-[#2a3642] text-gray-400 hover:border-gray-500'
            }`}
          >
            Arbitrum
          </button>
          <button
            type="button"
            onClick={() => handleNetworkChange('tron')}
            className={`p-2.5 rounded-xl border text-[11px] font-black uppercase transition-all cursor-pointer ${
              selectedNetwork === 'tron'
                ? 'bg-[#ff4655]/10 border-[#ff4655] text-white'
                : 'bg-[#0f1923] border-[#2a3642] text-gray-400 hover:border-gray-500'
            }`}
          >
            Tron
          </button>
          <button
            type="button"
            onClick={() => handleNetworkChange('sepolia')}
            className={`p-2.5 rounded-xl border text-[11px] font-black uppercase transition-all cursor-pointer ${
              selectedNetwork === 'sepolia'
                ? 'bg-[#ff4655]/10 border-[#ff4655] text-white'
                : 'bg-[#0f1923] border-[#2a3642] text-gray-400 hover:border-gray-500'
            }`}
          >
            Sepolia
          </button>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between bg-[#0f1923] p-3 rounded-lg border border-[#2a3642]">
          <span className="text-gray-400">Total Due:</span>
          <span className="font-black text-sm text-[#ff4655]">
            {currencySymbol}{order?.price || 0} USDT
          </span>
        </div>

        {!walletAddress ? (
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => handleConnectWallet(selectedNetwork)}
              disabled={isConnecting}
              className="w-full bg-[#ff4655] hover:bg-[#fa5763] text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-[#ff4655]/20 cursor-pointer disabled:opacity-50"
            >
              {isConnecting ? 'Authenticating...' : `Sign-In with Wallet (${selectedNetwork.toUpperCase()})`}
            </button>
          </div>
        ) : !isPaid ? (
          <div className="space-y-4 pt-2">
            <div className="bg-[#0f1923] border border-[#2a3642] p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-gray-500 block uppercase font-bold text-[10px]">
                  Active Session ({selectedNetwork.toUpperCase()})
                </span>
                <span className="text-white font-mono font-bold">{walletAddress}</span>
              </div>
              <button
                type="button"
                onClick={handleDisconnectWallet}
                className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer"
              >
                Disconnect
              </button>
            </div>

            <button
              type="button"
              onClick={handleCryptoPay}
              disabled={isConnecting}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isConnecting ? 'Executing Transaction...' : `Pay via Smart Contract`}
            </button>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg space-y-2 text-center">
            <div className="font-bold text-green-400 text-sm">Payment Confirmed</div>
            {txHash && (
              <div className="text-[10px] text-gray-400 font-mono break-all bg-[#0f1923] p-2 rounded border border-[#2a3642]">
                TX: {txHash}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}