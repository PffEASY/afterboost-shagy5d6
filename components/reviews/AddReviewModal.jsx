// components/reviews/AddReviewModal.jsx
'use client';

import { useState, useEffect } from 'react';

export default function AddReviewModal({ isOpen, onClose, onAddReview }) {
  const [hasPaidOrder, setHasPaidOrder] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    // Перевіряємо, чи користувач дійсно оплатив замовлення
    const activeOrder = sessionStorage.getItem('activeOrder');
    if (activeOrder) {
      const parsed = JSON.parse(activeOrder);
      if (parsed.isPaid) {
        setHasPaidOrder(true);
        setAuthor(parsed.riotId || 'Verified Customer');
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newReview = {
      id: Date.now(),
      author: author || 'Anonymous Booster Client',
      route: 'Rank Boost',
      rating,
      text,
      date: 'Just now',
    };

    onAddReview(newReview);
    onClose();
    setText('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-2xl shadow-2xl max-w-md w-full space-y-4 text-white relative">
        <div className="flex justify-between items-center border-b border-[#2a3642] pb-3">
          <h3 className="text-sm font-black uppercase tracking-wide text-[#ff4655]">Leave a Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>

        {!hasPaidOrder ? (
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center space-y-2 text-xs">
            <div className="font-bold text-red-400">Access Restricted</div>
            <p className="text-gray-300">
              Only users with a confirmed & paid order can leave reviews on our platform. Please complete an order first.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#0f1923] border border-[#2a3642] rounded-lg p-2.5 text-white outline-none focus:border-[#ff4655]"
              >
                <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                <option value={4}>★★★★☆ (4 Stars - Good)</option>
                <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                <option value={2}>★★☆☆☆ (2 Stars - Poor)</option>
                <option value={1}>★☆☆☆☆ (1 Star - Terrible)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-300 uppercase tracking-wider mb-1">Your Review</label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience with our boosters..."
                className="w-full bg-[#0f1923] border border-[#2a3642] rounded-lg p-2.5 text-white outline-none focus:border-[#ff4655] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff4655] hover:bg-[#fa5763] text-white font-black py-3 rounded-xl uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}