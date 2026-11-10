import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-display-luxury text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#C5A880] block">
                BFH HOTEL
              </span>
              <span className="text-xs text-stone-400 font-serif-luxury tracking-widest uppercase block mt-0.5">
                {HOTEL_INFO.chineseName}
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              新竹五星級國際品牌奢華酒店，融合當代藝術與極致款待之道。無論商務差旅或度假放鬆，皆為您締造專屬尊寵的美好回憶。
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>電話：{HOTEL_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>電子郵件：{HOTEL_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 font-serif-luxury">
              探索飯店
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <button onClick={() => scrollTo('offers')} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  最新專案禮遇
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('rooms')} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  客房與套房介紹
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('dining')} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  星級美饌與酒吧
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('facilities')} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  室內溫水泳池與水療
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('location')} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  交通位置與停車
                </button>
              </li>
            </ul>
          </div>

          {/* Online Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 font-serif-luxury">
              線上服務與預訂
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <button onClick={onOpenBooking} className="text-[#C5A880] hover:text-[#D8BC93] font-medium transition-colors cursor-pointer">
                  即時線上客房預訂 →
                </button>
              </li>
              <li>
                <button onClick={onOpenLookup} className="hover:text-[#C5A880] transition-colors cursor-pointer">
                  訂單查詢與退訂管理
                </button>
              </li>
              <li>
                <span className="text-stone-500">官網最優價格保證</span>
              </li>
              <li>
                <span className="text-stone-500">會議宴會與婚宴諮詢</span>
              </li>
              <li>
                <span className="text-stone-500">喜波波兒童俱樂部</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Direct Booking Guarantee */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 font-serif-luxury">
              尊榮禮遇保證
            </h4>
            <div className="p-4 bg-stone-900 rounded-lg border border-stone-800 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-1.5 text-stone-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>官方直訂五大優勢</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-400">
                1. 官網最低價格保證<br />
                2. 入住日前 24H 彈性取消<br />
                3. 免收線上訂房手續費<br />
                4. 優先高樓層視野安排<br />
                5. 專屬管家客製備品需求
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} BFH Hotel {HOTEL_INFO.chineseName}. All Rights Reserved.</span>
            <span aria-hidden="true" className="text-stone-800">·</span>
            <span className="hover:text-stone-400 transition-colors">隱私權政策</span>
            <span aria-hidden="true" className="text-stone-800">·</span>
            <span className="hover:text-stone-400 transition-colors">服務條款</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span>返回頂部</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
