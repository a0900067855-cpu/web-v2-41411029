import React, { useState } from 'react';
import { Phone, Calendar, Search, Menu, X, Globe, User } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenLookup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md text-stone-100 border-b border-stone-800/80 transition-all">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs text-stone-400 border-b border-stone-800/60 font-sans">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-stone-200 transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>訂房專線 {HOTEL_INFO.phone}</span>
          </span>
          <span className="flex items-center gap-1.5 text-stone-400">
            <span>{HOTEL_INFO.chineseName}</span>
            <span aria-hidden="true">·</span>
            <span>新竹高鐵 5 分鐘</span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <button 
            onClick={() => onOpenLookup()}
            className="flex items-center gap-1 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>訂房查詢與管理</span>
          </button>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <button 
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="hover:text-stone-200 transition-colors"
            >
              {lang === 'zh' ? '繁體中文' : 'ENGLISH'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex flex-col justify-center select-none"
        >
          <span className="font-display-luxury text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#C5A880] group-hover:text-[#D8BC93] transition-colors">
            BFH HOTEL
          </span>
          <span className="text-[10px] tracking-[0.3em] text-stone-400 font-serif-luxury uppercase -mt-0.5">
            Hsinchu ‧ Luxury & Suites
          </span>
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <button
            onClick={() => scrollToSection('offers')}
            className="text-stone-300 hover:text-[#C5A880] transition-colors hover:underline underline-offset-8"
          >
            最新專案
          </button>
          <button
            onClick={() => scrollToSection('rooms')}
            className="text-stone-300 hover:text-[#C5A880] transition-colors hover:underline underline-offset-8"
          >
            客房與套房
          </button>
          <button
            onClick={() => scrollToSection('dining')}
            className="text-stone-300 hover:text-[#C5A880] transition-colors hover:underline underline-offset-8"
          >
            美饌饗宴
          </button>
          <button
            onClick={() => scrollToSection('facilities')}
            className="text-stone-300 hover:text-[#C5A880] transition-colors hover:underline underline-offset-8"
          >
            休閒設施
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="text-stone-300 hover:text-[#C5A880] transition-colors hover:underline underline-offset-8"
          >
            交通周邊
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLookup}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium tracking-wider text-stone-300 hover:text-white border border-stone-700 hover:border-[#C5A880] rounded transition-colors whitespace-nowrap cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>訂房查詢</span>
          </button>
          
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] active:bg-[#B18E5E] rounded shadow-md transition-all whitespace-nowrap cursor-pointer uppercase"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>立即訂房</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 pb-4 border-b border-stone-800 text-sm font-medium">
            <button
              onClick={() => scrollToSection('offers')}
              className="text-left py-2 text-stone-300 hover:text-[#C5A880]"
            >
              最新專案 (Offers & Packages)
            </button>
            <button
              onClick={() => scrollToSection('rooms')}
              className="text-left py-2 text-stone-300 hover:text-[#C5A880]"
            >
              客房與套房 (Rooms & Suites)
            </button>
            <button
              onClick={() => scrollToSection('dining')}
              className="text-left py-2 text-stone-300 hover:text-[#C5A880]"
            >
              美饌饗宴 (Dining & Bars)
            </button>
            <button
              onClick={() => scrollToSection('facilities')}
              className="text-left py-2 text-stone-300 hover:text-[#C5A880]"
            >
              休閒設施 (Facilities & Spa)
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-left py-2 text-stone-300 hover:text-[#C5A880]"
            >
              交通周邊 (Location)
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>查詢已預約訂單</span>
            </button>
            <span className="text-xs text-stone-500">專線 {HOTEL_INFO.phone}</span>
          </div>
        </div>
      )}
    </header>
  );
};
