import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { HOTEL_IMAGES, ROOMS_DATA } from '../data/hotelData';

interface HeroProps {
  onSearchBooking: (searchParams: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    selectedRoomId?: string;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchBooking }) => {
  // Format today and tomorrow dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(today));
  const [checkOut, setCheckOut] = useState<string>(formatDate(tomorrow));
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');
  const [showGuestDropdown, setShowGuestDropdown] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchBooking({
      checkIn,
      checkOut,
      adults,
      children,
      selectedRoomId: selectedRoomId === 'all' ? undefined : selectedRoomId,
    });
  };

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-end bg-stone-950 overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HOTEL_IMAGES.hero}
          alt="BFH Hotel 建築外觀與尊榮大廳夜景"
          className="w-full h-full object-cover object-center scale-105 transform animate-fade-in duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered luxury gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/20 to-stone-950/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
        <div className="max-w-3xl space-y-4 mb-10 text-white">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D8BC93] font-serif-luxury">
            <span>5-Star International Hospitality</span>
            <span aria-hidden="true">·</span>
            <span>新竹竹北首選五星旗艦</span>
          </div>
          
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight text-balance">
            卓越款待 <span className="text-[#C5A880] font-light">·</span> 沉浸非凡奢華
          </h1>
          
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
            融合國際五星級精緻美學與細膩管家服務。座落新竹高鐵核心特區，提供雅緻客房、星級美饌宴饗、恆溫水療泳池與全天候專屬行政禮遇。
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300/90">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              官網獨家最優惠價格保證
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              入住前 24H 免費取消與彈性保證
            </span>
          </div>
        </div>

        {/* Floating Quick Online Booking Engine Bar */}
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-lg p-4 sm:p-5 shadow-2xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 items-end">
            {/* Check-In Date */}
            <div className="lg:col-span-3 space-y-1">
              <label className="text-[11px] font-medium tracking-wider text-stone-400 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                入住日期 (Check-in)
              </label>
              <input
                type="date"
                value={checkIn}
                min={formatDate(new Date())}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    const next = new Date(e.target.value);
                    next.setDate(next.getDate() + 1);
                    setCheckOut(formatDate(next));
                  }
                }}
                className="w-full bg-stone-950/70 border border-stone-700 rounded px-3 py-2.5 text-stone-100 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Check-Out Date */}
            <div className="lg:col-span-3 space-y-1">
              <label className="text-[11px] font-medium tracking-wider text-stone-400 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                退房日期 (Check-out)
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-950/70 border border-stone-700 rounded px-3 py-2.5 text-stone-100 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Guests Selector */}
            <div className="lg:col-span-3 space-y-1 relative">
              <label className="text-[11px] font-medium tracking-wider text-stone-400 uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                入住人數 (Guests)
              </label>
              <button
                type="button"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="w-full bg-stone-950/70 border border-stone-700 rounded px-3 py-2.5 text-stone-100 text-sm flex items-center justify-between text-left hover:border-stone-500 transition-colors"
              >
                <span>{adults} 位成人 · {children} 位孩童</span>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>

              {/* Guest Dropdown */}
              {showGuestDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700 rounded-lg p-4 shadow-xl z-30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-stone-200">成人 (12歲以上)</p>
                      <p className="text-[10px] text-stone-400">標準雙人/加大單人床</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded border border-stone-700 text-stone-300 hover:border-[#C5A880] flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-stone-100 tabular-nums">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(6, adults + 1))}
                        className="w-7 h-7 rounded border border-stone-700 text-stone-300 hover:border-[#C5A880] flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                    <div>
                      <p className="text-xs font-medium text-stone-200">孩童 (0-11歲)</p>
                      <p className="text-[10px] text-stone-400">不佔床可免費同住</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded border border-stone-700 text-stone-300 hover:border-[#C5A880] flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-stone-100 tabular-nums">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(4, children + 1))}
                        className="w-7 h-7 rounded border border-stone-700 text-stone-300 hover:border-[#C5A880] flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGuestDropdown(false)}
                    className="w-full mt-2 py-1.5 text-xs text-stone-950 font-semibold bg-[#C5A880] rounded hover:bg-[#D8BC93]"
                  >
                    確認選擇
                  </button>
                </div>
              )}
            </div>

            {/* Room Preference & Submit Action */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full bg-[#C5A880] hover:bg-[#D8BC93] active:bg-[#B18E5E] text-stone-950 font-semibold py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>搜尋空房與最優價格</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
