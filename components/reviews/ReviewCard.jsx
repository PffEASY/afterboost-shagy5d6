// components/reviews/ReviewCard.jsx
'use client';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-[#1f2326] border border-[#2a3642] p-6 rounded-xl shadow-xl space-y-4 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-black text-sm text-white">{review.author}</h4>
          <span className="text-[10px] text-[#ff4655] font-semibold uppercase">{review.route}</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-300 leading-relaxed italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="text-[10px] text-gray-500 text-right">
        {review.date}
      </div>
    </div>
  );
}