import React, { useState, useEffect } from 'react';
import { X, Search, Calendar, Phone, CheckCircle, AlertTriangle, Printer, Trash2 } from 'lucide-react';
import { Booking } from '../types/hotel';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [matchedBookings, setMatchedBookings] = useState<Booking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Load from local storage
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('bfh_hotel_bookings');
      if (stored) {
        const parsed: Booking[] = JSON.parse(stored);
        setAllBookings(parsed);
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  useEffect(() => {
    if (isOpen) {
      const list = loadBookings();
      setMatchedBookings(list);
      setHasSearched(false);
      setActionNotice('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const key = searchKey.trim().toLowerCase();
    if (!key) {
      setMatchedBookings(allBookings);
      return;
    }

    const filtered = allBookings.filter(b => 
      b.bookingCode.toLowerCase().includes(key) ||
      b.phone.includes(key) ||
      b.email.toLowerCase().includes(key) ||
      b.guestName.toLowerCase().includes(key)
    );
    setMatchedBookings(filtered);
  };

  const handleCancelBooking = (bookingCode: string) => {
    if (!window.confirm(`確定要取消訂單編號 ${bookingCode} 的預約嗎？`)) {
      return;
    }

    const updated = allBookings.map(b => 
      b.bookingCode === bookingCode ? { ...b, status: 'cancelled' as const } : b
    );
    setAllBookings(updated);
    setMatchedBookings(prev => prev.map(b => 
      b.bookingCode === bookingCode ? { ...b, status: 'cancelled' as const } : b
    ));
    localStorage.setItem('bfh_hotel_bookings', JSON.stringify(updated));
    setActionNotice(`訂單 ${bookingCode} 已成功取消，無產生任何取消費用。`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] text-stone-900 w-full max-w-2xl rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-stone-950 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-display-luxury text-lg font-bold text-[#C5A880]">訂房紀錄查詢與管理</h3>
            <p className="text-xs text-stone-400">輸入訂單編號 (例: BFH-2026-xxxx)、電話或住客姓名查詢</p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6 border-b border-stone-200 bg-white">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="輸入訂房編號、手機號碼或住客姓名..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded focus:border-[#C5A880] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded transition-colors cursor-pointer"
            >
              查詢訂單
            </button>
          </form>

          {actionNotice && (
            <p className="mt-3 text-xs text-amber-700 bg-amber-50 p-2.5 rounded border border-amber-200">
              {actionNotice}
            </p>
          )}
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {matchedBookings.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-3">
              <Calendar className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
              <p className="text-sm">
                {hasSearched ? '查無相符之訂房紀錄。請確認訂單編號或聯絡電話。' : '目前尚無已儲存之訂房紀錄。'}
              </p>
              <p className="text-xs text-stone-400">
                若需協助，請致電專線：+886-3-620-6000
              </p>
            </div>
          ) : (
            matchedBookings.map((b) => (
              <div 
                key={b.id} 
                className={`bg-white rounded-lg border p-5 shadow-sm space-y-3 ${
                  b.status === 'cancelled' ? 'border-stone-200 opacity-60 bg-stone-50' : 'border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
                      訂單編號: {b.bookingCode}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 mt-0.5">{b.room.name}</h4>
                    <p className="text-xs text-stone-500">{b.checkIn} 入住 ~ {b.checkOut} 退房 ({b.nights} 晚)</p>
                  </div>

                  <div>
                    {b.status === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        <CheckCircle className="w-3.5 h-3.5" /> 已確認
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-stone-100 text-stone-600 rounded">
                        已取消
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 border-y border-stone-100 text-xs text-stone-600">
                  <div>
                    <span className="text-stone-400 block">住客姓名</span>
                    <span className="font-medium text-stone-800">{b.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">聯絡電話</span>
                    <span className="font-medium text-stone-800">{b.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">總金額 (現場付款)</span>
                    <span className="font-bold text-[#8D6B3A] font-serif-luxury text-sm tabular-nums">
                      NT$ {b.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {b.addOns && b.addOns.length > 0 && (
                  <p className="text-xs text-stone-500">
                    <span className="text-stone-400">加購項目：</span>
                    {b.addOns.map(a => a.name).join('、')}
                  </p>
                )}

                {b.specialRequests && (
                  <p className="text-xs text-stone-500">
                    <span className="text-stone-400">備註：</span>{b.specialRequests}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-400 font-mono">
                    建立時間: {new Date(b.createdAt).toLocaleDateString('zh-TW')}
                  </span>

                  <div className="flex items-center gap-2">
                    {b.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(b.bookingCode)}
                        className="text-xs text-red-600 hover:text-red-700 px-3 py-1 border border-red-200 rounded hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>取消此預約</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="text-xs text-stone-700 px-3 py-1 border border-stone-300 rounded hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3 h-3 text-stone-500" />
                      <span>列印明細</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-stone-100 px-6 py-3 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded cursor-pointer"
          >
            關閉
          </button>
        </div>

      </div>
    </div>
  );
};
