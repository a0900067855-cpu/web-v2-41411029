import React from 'react';
import { X, Bed, Maximize2, Users, Check, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] text-stone-900 w-full max-w-3xl rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Photo */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-stone-900">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#D8BC93] uppercase font-serif-luxury block">
                {room.nameEn}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold mt-0.5">
                {room.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-300">每晚原價 NT$ {room.originalPrice.toLocaleString()}</span>
              <div className="text-2xl font-bold text-[#D8BC93] font-serif-luxury tabular-nums">
                NT$ {room.price.toLocaleString()}
                <span className="text-xs text-stone-300 font-normal"> /晚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Key Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-lg border border-stone-200 text-xs">
            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <div>
                <span className="text-stone-400 block">客房面積</span>
                <span className="font-semibold text-stone-800">{room.size}㎡ ({room.sizePing}坪)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <div>
                <span className="text-stone-400 block">床型配置</span>
                <span className="font-semibold text-stone-800 line-clamp-1">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <div>
                <span className="text-stone-400 block">可住人數</span>
                <span className="font-semibold text-stone-800">最高 {room.capacity.adults} 位成人</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#8D6B3A] shrink-0" />
              <div>
                <span className="text-stone-400 block">景觀朝向</span>
                <span className="font-semibold text-stone-800 line-clamp-1">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-2">房型概述</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-2.5">特色亮點</h4>
            <div className="flex flex-wrap gap-2">
              {room.highlights.map((h, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-amber-50 text-[#8D6B3A] border border-amber-200/80 rounded font-medium">
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Complete Amenities Checklist */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 mb-3">客房配備與頂級備品</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-white p-4 rounded-lg border border-stone-200">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8D6B3A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies & Privileges */}
          <div className="bg-stone-100 p-4 rounded-lg text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800">
              <ShieldCheck className="w-4 h-4 text-[#8D6B3A]" />
              <span>入住與取消規範</span>
            </div>
            <p>· 入住時間為下午 15:00 後，退房時間為上午 11:00 前。</p>
            <p>· 於入住日前 24 小時前可免費取消預訂或更改日期。</p>
            <p>· 全館客房禁菸；全館高速光纖無線網路免費使用。</p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 border-t border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-stone-500 block">含服務費與稅金特惠價</span>
            <span className="text-xl font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
              NT$ {room.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 rounded cursor-pointer"
            >
              關閉
            </button>
            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="px-6 py-2.5 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>立即預訂此房型</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
