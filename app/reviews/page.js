// app/reviews/page.js
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/reviews/ReviewCard';
import AddReviewModal from '@/components/reviews/AddReviewModal';

const initialReviews = [
  {
    id: 1,
    author: 'Vortex#7777',
    route: 'Gold III → Diamond I',
    rating: 5,
    text: 'Absolute legends! Finished my boost in less than 2 days. The booster used offline mode and VPN, absolutely zero issues with my friends list. Highly recommended!',
    date: '2 days ago',
  },
  {
    id: 2,
    author: 'ScreamFan#EUW',
    route: 'Platinum II → Ascendant II',
    rating: 5,
    text: 'Bought Duo Queue with express priority. Played alongside an Immortal booster who gave me amazing tips. Worth every single dollar.',
    date: '4 days ago',
  },
  {
    id: 3,
    author: 'Nixie#0001',
    route: 'Silver I → Gold III',
    rating: 5,
    text: 'Super fast communication through the order chat. The TRC crypto payment worked instantly via smart contract. Will definitely use again next act.',
    date: '1 week ago',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] flex flex-col">
      {/* Хедер сайту */}
      <Header />

      {/* Головний контент сторінки */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full space-y-8">
        {/* Шапка та кнопка відкриття модального вікна */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#2a3642] pb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-wide uppercase">
              Customer Reviews
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Read real feedback from players who reached their desired Valorant ranks with <span className="text-[#ff4655] font-bold">AFTERBOOST</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ff4655] hover:bg-[#fa5763] text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff4655]/20 cursor-pointer whitespace-nowrap"
          >
            Leave a Review +
          </button>
        </div>

        {/* Список відгуків */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>

      {/* Модальне вікно додавання відгуку з перевіркою оплати */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* Футер сайту */}
      <Footer />
    </div>
  );
}