import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { OFFERS_DATA } from '../data/hotelData';
import { Offer } from '../types/hotel';

interface OffersSectionProps {
  onSelectOffer: (offer: Offer) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onSelectOffer }) => {
  return (
    <section id="offers" className="py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#8D6B3A] font-serif-luxury font-semibold mb-2">
              Exclusive Packages & Privileges
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              尊榮住房專案 <span className="text-[#C5A880] font-light">·</span> 體驗頂級禮遇
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-600 max-w-md font-light">
            官方網站獨家優惠，提供一泊二食饗宴、商務尊貴行政禮遇及家庭假期探索方案。
          </p>
        </div>

        {/* Bento Grid layout of 4 curated packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {OFFERS_DATA.map((offer, idx) => {
            const isLarge = idx === 0 || idx === 1;
            return (
              <div
                key={offer.id}
                className={`group bg-white rounded-lg border border-stone-200 hover:border-[#C5A880]/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between ${
                  isLarge ? 'lg:col-span-6' : 'lg:col-span-6'
                }`}
              >
                <div>
                  {/* Photo container */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-stone-950/80 backdrop-blur-md text-[#D8BC93] rounded tracking-wider">
                        {offer.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-[11px] text-stone-400 font-mono mb-1">
                      專案適用期限至 {offer.validUntil}
                    </div>

                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#8D6B3A] transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    
                    <p className="text-xs text-stone-500 font-medium mt-1 mb-3">
                      {offer.subtitle}
                    </p>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    {/* Highlights list */}
                    <ul className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                      {offer.included.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer price & CTA */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">專案優惠每晚起</span>
                    <div className="text-xl font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                      NT$ {offer.priceFrom.toLocaleString()}
                      <span className="text-xs text-stone-500 font-normal"> 起</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectOffer(offer)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded transition-colors cursor-pointer"
                  >
                    <span>預訂此專案</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
