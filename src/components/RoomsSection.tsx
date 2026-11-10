import React, { useState } from 'react';
import { Bed, Users, Maximize2, ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';
import { Room, RoomCategory } from '../types/hotel';

interface RoomsSectionProps {
  onOpenBookingWithRoom: (room: Room) => void;
  onViewRoomDetail: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onOpenBookingWithRoom,
  onViewRoomDetail
}) => {
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('all');

  const filteredRooms = activeCategory === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter(r => r.category === activeCategory);

  return (
    <section id="rooms" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#8D6B3A] font-serif-luxury font-semibold mb-2">
              Luxurious Accommodations
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              客房與套房 <span className="text-[#C5A880] font-light">·</span> 雅緻休憩天地
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-600 max-w-md font-light">
            融合當代雅韻與溫暖木質調，配備頂級名床與深浸浴缸，為您打造沉靜優雅的下榻空間。
          </p>
        </div>

        {/* Filter Tabs (Interactive filter control) */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-lg max-w-md mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            全部客房 ({ROOMS_DATA.length})
          </button>
          <button
            onClick={() => setActiveCategory('room')}
            className={`px-4 py-2 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'room'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            豪華客房
          </button>
          <button
            onClick={() => setActiveCategory('executive')}
            className={`px-4 py-2 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'executive'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            行政尊貴
          </button>
          <button
            onClick={() => setActiveCategory('suite')}
            className={`px-4 py-2 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'suite'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            頂級套房
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-[#FAF9F5] rounded-xl border border-stone-200 hover:border-[#C5A880]/80 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold tracking-wider text-stone-100 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded">
                      {room.category === 'suite' ? '尊榮套房' : room.category === 'executive' ? '行政酒廊禮遇' : '雅緻客房'}
                    </span>
                  </div>

                  {/* Size info badge */}
                  <div className="absolute bottom-3 left-3 text-white text-xs font-light flex items-center gap-1.5">
                    <span>{room.size}㎡ / {room.sizePing}坪</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.capacity.adults} 位成人</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="text-[11px] text-stone-400 font-serif-luxury tracking-widest uppercase mb-1">
                    {room.nameEn}
                  </div>
                  
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 group-hover:text-[#8D6B3A] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed my-3 font-light">
                    {room.description}
                  </p>

                  {/* Specs & Highlights */}
                  <div className="space-y-2 py-3 border-y border-stone-200/80 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Bed className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                      <span className="line-clamp-1">{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                      <span className="line-clamp-1">{room.highlights[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="p-6 pt-0">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] text-stone-400 line-through mr-1">
                      NT$ {room.originalPrice.toLocaleString()}
                    </span>
                    <div className="text-2xl font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                      NT$ {room.price.toLocaleString()}
                      <span className="text-xs text-stone-500 font-normal font-sans"> /晚起</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    官網保證低價
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewRoomDetail(room)}
                    className="py-2.5 px-3 text-xs font-medium text-stone-700 hover:text-stone-950 bg-white border border-stone-300 hover:bg-stone-50 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-400" />
                    <span>查看詳情</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBookingWithRoom(room)}
                    className="py-2.5 px-3 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] active:bg-[#B18E5E] rounded flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>立即預訂</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
