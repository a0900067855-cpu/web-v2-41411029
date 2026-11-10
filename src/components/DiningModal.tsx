import React, { useState } from 'react';
import { X, Clock, MapPin, Phone, Utensils, CheckCircle, Calendar, Users } from 'lucide-react';
import { Restaurant } from '../types/hotel';

interface DiningModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export const DiningModal: React.FC<DiningModalProps> = ({ restaurant, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('18:00');
  const [people, setPeople] = useState(2);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!restaurant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] text-stone-900 w-full max-w-2xl rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Restaurant banner */}
        <div className="relative aspect-[21/9] bg-stone-950">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-widest text-[#D8BC93] font-serif-luxury">
              {restaurant.nameEn} · {restaurant.floor}
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold mt-0.5">
              {restaurant.name}
            </h3>
          </div>
        </div>

        {/* Content & Booking inquiry */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Info bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <span>{restaurant.cuisine}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <span className="line-clamp-1">{restaurant.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            {restaurant.description}
          </p>

          {/* Signature dishes */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">主廚推薦招牌佳餚</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {restaurant.signatures.map((sig, i) => (
                <div key={i} className="flex items-center gap-2 bg-white p-2.5 rounded border border-stone-200">
                  <span className="text-[#8D6B3A] font-bold">✦</span>
                  <span className="text-stone-800 font-medium">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table reservation inquiry form */}
          <div className="bg-white p-5 rounded-lg border border-stone-200">
            <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8D6B3A]" />
              <span>線上預約席位 (Table Reservation)</span>
            </h4>

            {isSubmitted ? (
              <div className="text-center py-6 space-y-2 bg-emerald-50 rounded border border-emerald-200">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-stone-900 text-sm">席位預約需求已送出</h5>
                <p className="text-xs text-stone-600">
                  餐廳服務人員將於 2 小時內透過電話 ({phone}) 與您聯繫確認席位保留。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-stone-600 block mb-1">用餐日期</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-stone-600 block mb-1">用餐時段</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded outline-none focus:border-[#C5A880] bg-white"
                  >
                    <option>11:30 (午餐首輪)</option>
                    <option>12:30 (午餐)</option>
                    <option>17:30 (晚餐首輪)</option>
                    <option>18:30 (晚餐)</option>
                    <option>19:30 (晚餐二輪)</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-stone-600 block mb-1">用餐人數</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={people}
                    onChange={(e) => setPeople(parseInt(e.target.value) || 2)}
                    className="w-full p-2 border border-stone-300 rounded outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-stone-600 block mb-1">訂位貴賓姓名</label>
                  <input
                    type="text"
                    placeholder="王大衛 先生/女士"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-medium text-stone-600 block mb-1">聯絡電話</label>
                  <input
                    type="tel"
                    placeholder="0912-345-678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded cursor-pointer transition-colors shadow-sm"
                  >
                    送出訂位需求
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 cursor-pointer"
          >
            關閉
          </button>
        </div>

      </div>
    </div>
  );
};
