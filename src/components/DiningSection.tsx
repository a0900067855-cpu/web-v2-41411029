import React from 'react';
import { Utensils, Clock, Phone, ArrowRight } from 'lucide-react';
import { RESTAURANTS_DATA } from '../data/hotelData';
import { Restaurant } from '../types/hotel';

interface DiningSectionProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onSelectRestaurant }) => {
  return (
    <section id="dining" className="py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#8D6B3A] font-serif-luxury font-semibold mb-2">
              Culinary Art & Dining
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              美饌饗宴 <span className="text-[#C5A880] font-light">·</span> 星級匠心滋味
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-600 max-w-md font-light">
            匯聚國際主廚團隊，呈獻環球百匯、正宗粵式片皮鴨、頂級日式和牛割烹與優雅大廳酒吧。
          </p>
        </div>

        {/* 4 Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESTAURANTS_DATA.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group bg-white rounded-xl border border-stone-200 hover:border-[#C5A880]/80 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-stone-950/80 backdrop-blur-md text-[#D8BC93] rounded">
                      {restaurant.floor} ‧ {restaurant.cuisine}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-stone-400 font-serif-luxury tracking-widest uppercase mb-1">
                    {restaurant.nameEn}
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 group-hover:text-[#8D6B3A] transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed my-3 font-light">
                    {restaurant.description}
                  </p>

                  <div className="space-y-1.5 py-3 border-t border-stone-100 text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                      <span className="line-clamp-1">{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                      <span>訂位專線 {restaurant.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 hover:text-stone-950 bg-stone-100 hover:bg-[#C5A880]/20 border border-stone-200 hover:border-[#C5A880] rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>查看招牌料理 ＆ 線上訂位</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8D6B3A]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
