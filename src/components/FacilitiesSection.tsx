import React from 'react';
import { Waves, Dumbbell, Sparkles, Check, Clock, MapPin } from 'lucide-react';
import { FACILITIES_DATA, HOTEL_IMAGES } from '../data/hotelData';

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#8D6B3A] font-serif-luxury font-semibold mb-2">
              Wellness & Leisure
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              休閒育樂設施 <span className="text-[#C5A880] font-light">·</span> 舒活煥采之旅
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-600 max-w-md font-light">
            位於 5 樓的悠活休閒樓層，配備恆溫泳池、全天候健身中心、喜波波童樂世界與日式冷熱泉三溫暖。
          </p>
        </div>

        {/* Featured Big Pool Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg border border-stone-200 aspect-[16/9] sm:aspect-[21/9] bg-stone-900">
          <img
            src={HOTEL_IMAGES.pool}
            alt="BFH Hotel 室內溫水游泳池"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 text-white max-w-2xl">
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#C5A880] text-stone-950 rounded uppercase tracking-wider">
              5F 休閒核心設施
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold mt-2">
              採光室內溫水泳池 ＆ 休憩水療區
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-light leading-relaxed">
              25 米恆溫水域結合全景採光玻璃帷幕，提供池畔柚木日光躺椅與獨立水療衝擊水柱，讓身心於碧藍波光中舒暢漫遊。
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACILITIES_DATA.slice(1).map((facility) => (
            <div
              key={facility.id}
              className="bg-[#FAF9F5] p-6 rounded-xl border border-stone-200 hover:border-[#C5A880]/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-[#8D6B3A] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {facility.floor}
                  </span>
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{facility.hours}</span>
                  </span>
                </div>

                <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                  {facility.name}
                </h4>
                <p className="text-[11px] text-stone-400 font-serif-luxury tracking-wider mb-2">
                  {facility.nameEn}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                  {facility.description}
                </p>

                <ul className="space-y-1.5 text-xs text-stone-700 pt-3 border-t border-stone-200">
                  {facility.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500">
                房客憑房卡感應即可免費入場使用
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
