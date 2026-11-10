import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Users, Check, ArrowRight, ArrowLeft, ShieldCheck, 
  CreditCard, Printer, CheckCircle2, Bed, Sparkles, AlertCircle 
} from 'lucide-react';
import { Room, Booking, BookingAddOn } from '../types/hotel';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    selectedRoomId?: string;
  };
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<number>(1);

  // Today & Tomorrow
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  // Dates and guests
  const [checkIn, setCheckIn] = useState<string>(initialParams?.checkIn || todayStr);
  const [checkOut, setCheckOut] = useState<string>(initialParams?.checkOut || tomorrowStr);
  const [adults, setAdults] = useState<number>(initialParams?.adults || 2);
  const [children, setChildren] = useState<number>(initialParams?.children || 0);

  // Selected room
  const [selectedRoom, setSelectedRoom] = useState<Room>(() => {
    if (initialParams?.selectedRoomId) {
      const found = ROOMS_DATA.find(r => r.id === initialParams.selectedRoomId);
      if (found) return found;
    }
    return ROOMS_DATA[0];
  });

  // Calculate nights
  const calculateNights = (inDate: string, outDate: string) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = Math.max(1, end.getTime() - start.getTime());
    return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights(checkIn, checkOut);

  // Add-ons
  const [addOns, setAddOns] = useState<BookingAddOn[]>([
    {
      id: 'addon-breakfast',
      name: '盛宴百匯自助早餐 (每日每位)',
      price: 680,
      description: '主廚精選歐陸麵包、現做蛋料理、新鮮海鮮粥品與鮮榨果汁',
      selected: false
    },
    {
      id: 'addon-limo',
      name: '尊榮高鐵專車接駁 (單趟)',
      price: 600,
      description: '新竹高鐵站至飯店專屬高級房車禮賓接駁',
      selected: false
    },
    {
      id: 'addon-spa',
      name: '三溫暖水療與精油舒壓體驗券',
      price: 500,
      description: '尊享檜木烤箱、蒸氣室、冷熱按摩池與舒緩草本茶點',
      selected: false
    }
  ]);

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalTime, setArrivalTime] = useState('15:00 - 18:00');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bedPreference, setBedPreference] = useState('標準安排');

  // Credit card details (simulated)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (initialParams?.selectedRoomId) {
      const found = ROOMS_DATA.find(r => r.id === initialParams.selectedRoomId);
      if (found) setSelectedRoom(found);
    }
    if (initialParams?.checkIn) setCheckIn(initialParams.checkIn);
    if (initialParams?.checkOut) setCheckOut(initialParams.checkOut);
    if (initialParams?.adults) setAdults(initialParams.adults);
    if (initialParams?.children !== undefined) setChildren(initialParams.children);
  }, [initialParams, isOpen]);

  if (!isOpen) return null;

  // Toggle add-on
  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  // Pricing calculations
  const roomSubtotal = selectedRoom.price * nights;
  const addOnsTotal = addOns
    .filter(a => a.selected)
    .reduce((sum, a) => {
      if (a.id === 'addon-breakfast') {
        return sum + (a.price * adults * nights);
      }
      return sum + a.price;
    }, 0);
  
  const totalPrice = roomSubtotal + addOnsTotal;

  // Submit and create reservation
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrorMsg('請勾選同意訂房規範與取消條款');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length < 15) {
      setErrorMsg('請輸入有效的16碼信用卡卡號作為訂房擔保');
      return;
    }

    // Generate unique confirmation code e.g. BFH-2026-XXXX
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `BFH-2026-${randomCode}`;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingCode,
      room: selectedRoom,
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      guestName,
      email,
      phone,
      arrivalTime,
      specialRequests: `${bedPreference ? `[床型偏好: ${bedPreference}] ` : ''}${specialRequests}`,
      addOns: addOns.filter(a => a.selected),
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      paymentMethod: `信用卡擔保 (尾號 ${cardNumber.slice(-4) || '8888'})`
    };

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('bfh_hotel_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('bfh_hotel_bookings', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save booking to localStorage', err);
    }

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(5); // Confirmation screen
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] text-stone-900 w-full max-w-4xl rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-stone-950 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display-luxury text-lg font-bold tracking-wider text-[#C5A880]">
                BFH HOTEL
              </span>
              <span className="text-xs text-stone-400">· 線上官方訂房系統</span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">官網最優價格保證 ‧ 預訂擔保免手續費</p>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-stone-100/90 border-b border-stone-200 px-6 py-3 flex items-center justify-between text-xs font-medium text-stone-600 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
              <span className={`flex items-center gap-1.5 whitespace-nowrap ${step === 1 ? 'text-[#8D6B3A] font-semibold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-[#C5A880] text-stone-950 font-bold' : step > 1 ? 'bg-stone-800 text-white' : 'bg-stone-200'}`}>1</span>
                <span>客房與日期</span>
              </span>
              <span className="text-stone-300">/</span>
              <span className={`flex items-center gap-1.5 whitespace-nowrap ${step === 2 ? 'text-[#8D6B3A] font-semibold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-[#C5A880] text-stone-950 font-bold' : step > 2 ? 'bg-stone-800 text-white' : 'bg-stone-200'}`}>2</span>
                <span>尊榮加購</span>
              </span>
              <span className="text-stone-300">/</span>
              <span className={`flex items-center gap-1.5 whitespace-nowrap ${step === 3 ? 'text-[#8D6B3A] font-semibold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-[#C5A880] text-stone-950 font-bold' : step > 3 ? 'bg-stone-800 text-white' : 'bg-stone-200'}`}>3</span>
                <span>貴賓資訊</span>
              </span>
              <span className="text-stone-300">/</span>
              <span className={`flex items-center gap-1.5 whitespace-nowrap ${step === 4 ? 'text-[#8D6B3A] font-semibold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 4 ? 'bg-[#C5A880] text-stone-950 font-bold' : 'bg-stone-200'}`}>4</span>
                <span>擔保與確認</span>
              </span>
            </div>

            {/* Quick Pricing Badge */}
            <div className="hidden sm:flex items-center gap-2 text-stone-800">
              <span className="text-xs text-stone-500">{nights} 晚預估</span>
              <span className="text-sm font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                NT$ {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {/* STEP 1: Select Room and Dates */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Date & Guests bar */}
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">入住日期</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={todayStr}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        const next = new Date(e.target.value);
                        next.setDate(next.getDate() + 1);
                        setCheckOut(next.toISOString().split('T')[0]);
                      }
                    }}
                    className="w-full text-sm border border-stone-300 rounded px-2.5 py-1.5 focus:border-[#C5A880] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">退房日期</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded px-2.5 py-1.5 focus:border-[#C5A880] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">住客人數</label>
                  <div className="flex items-center gap-2 text-sm text-stone-800 py-1.5">
                    <span>{adults} 位成人</span>
                    <span className="text-stone-300">·</span>
                    <span>{children} 位孩童</span>
                    <span className="text-stone-400 text-xs">({nights} 晚)</span>
                  </div>
                </div>
              </div>

              {/* Room Cards Selector */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-3 tracking-wide flex items-center justify-between">
                  <span>選擇房型 (Available Rooms)</span>
                  <span className="text-xs font-normal text-stone-500">共 {ROOMS_DATA.length} 款精選房型</span>
                </h3>

                <div className="space-y-3">
                  {ROOMS_DATA.map((room) => {
                    const isSelected = selectedRoom.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
                          isSelected 
                            ? 'bg-amber-50/50 border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]' 
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-20 h-20 rounded object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-stone-900 text-base">{room.name}</h4>
                              <span className="text-xs text-stone-400 font-serif-luxury">{room.nameEn}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
                              <span>{room.size}㎡ ({room.sizePing}坪)</span>
                              <span>·</span>
                              <span>{room.bedType}</span>
                              <span>·</span>
                              <span>可住 {room.capacity.adults} 成人</span>
                            </div>
                            <p className="text-xs text-stone-600 line-clamp-1 mt-1">{room.description}</p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                          <div className="text-left sm:text-right">
                            <span className="text-xs text-stone-400 line-through mr-1">NT$ {room.originalPrice.toLocaleString()}</span>
                            <div className="text-lg font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                              NT$ {room.price.toLocaleString()}
                              <span className="text-xs text-stone-500 font-normal"> /晚</span>
                            </div>
                          </div>
                          <span className={`text-xs mt-1.5 px-3 py-1 rounded font-medium ${
                            isSelected ? 'bg-[#C5A880] text-stone-950' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {isSelected ? '已選取此房型 ✓' : '點擊選擇'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Add-on Amenities */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-stone-900">{selectedRoom.name}</h4>
                  <p className="text-xs text-stone-500">{checkIn} 至 {checkOut} · 共 {nights} 晚 · {adults} 位成人</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500">房價小計</span>
                  <p className="text-base font-bold text-[#8D6B3A] font-serif-luxury tabular-nums">NT$ {roomSubtotal.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1 tracking-wide">尊榮專屬加購服務 (Optional Experiences)</h3>
                <p className="text-xs text-stone-500 mb-4">預先安排加值禮遇，讓您的旅程更加優雅無憂：</p>

                <div className="space-y-3">
                  {addOns.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        addon.selected
                          ? 'bg-amber-50/50 border-[#C5A880] shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                          addon.selected ? 'bg-[#C5A880] border-[#C5A880] text-stone-950' : 'border-stone-300 bg-white'
                        }`}>
                          {addon.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">{addon.name}</h4>
                          <p className="text-xs text-stone-500 mt-0.5">{addon.description}</p>
                          {addon.id === 'addon-breakfast' && (
                            <p className="text-[11px] text-[#8D6B3A] mt-1">
                              已依您預訂之 {adults} 位成人 × {nights} 晚自動核算
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                          +NT$ {addon.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-stone-500 block">
                          {addon.id === 'addon-breakfast' ? '每位/日' : '單趟/張'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-4">
                <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">入住貴賓聯絡資料</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      住客姓名 (Full Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例：王小明 / David Wang"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      聯絡電話 (Mobile Phone) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="例：0912-345-678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      電子郵件 (Email - 用於接收訂房確認信) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="例：guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">預計抵達時間 (ETA)</label>
                    <select
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none bg-white"
                    >
                      <option>15:00 - 18:00 (標準入住)</option>
                      <option>18:00 - 20:00</option>
                      <option>20:00 - 22:00 (晚間抵達)</option>
                      <option>22:00 以後 (深夜抵達)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">床型與客房偏好</label>
                    <select
                      value={bedPreference}
                      onChange={(e) => setBedPreference(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none bg-white"
                    >
                      <option>標準安排 (依房型)</option>
                      <option>安排高樓層景觀房</option>
                      <option>安排靜音走廊房型</option>
                      <option>需嬰兒床 / 嬰兒澡盆 (免費)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">特殊需求備註 (Special Requests)</label>
                    <textarea
                      rows={2}
                      placeholder="如需輪椅通道、無障礙設施、紀念日慶祝佈置等，請填寫於此。"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full text-sm border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Guarantee & Payment */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Order Summary breakdown */}
              <div className="bg-white p-5 rounded-lg border border-stone-200">
                <h4 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">預訂明細與費用摘要</h4>
                
                <div className="py-3 space-y-2 text-xs text-stone-600 border-b border-stone-100">
                  <div className="flex justify-between">
                    <span>房型：{selectedRoom.name} ({nights} 晚)</span>
                    <span className="tabular-nums">NT$ {roomSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>入住期間：{checkIn} 至 {checkOut} ({adults} 大 {children} 小)</span>
                    <span>15:00 入住 / 11:00 退房</span>
                  </div>
                  {addOns.filter(a => a.selected).map(a => (
                    <div key={a.id} className="flex justify-between text-stone-700">
                      <span>加購：{a.name}</span>
                      <span className="tabular-nums">
                        +NT$ {(a.id === 'addon-breakfast' ? a.price * adults * nights : a.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-stone-400">
                    <span>政府稅金與 10% 服務費</span>
                    <span>已包含於報價中</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 text-stone-900">
                  <span className="font-semibold text-sm">應付總額 (Total Amount)</span>
                  <span className="text-xl font-bold font-serif-luxury text-[#8D6B3A] tabular-nums">
                    NT$ {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Simulated Credit Card Guarantee */}
              <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-stone-800">
                  <CreditCard className="w-4 h-4 text-[#8D6B3A]" />
                  <h4 className="text-sm font-bold">信用卡訂房擔保 (Credit Card Guarantee)</h4>
                </div>
                
                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>安全擔保說明：</strong>官網訂房採「入住現場付款」，此處僅記錄信用卡作為訂房有效性擔保，現階段不予扣款。於入住日前 24 小時免費取消。
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      信用卡卡號 (Card Number)
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      className="w-full text-sm font-mono border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">有效期限 (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-sm font-mono border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">安全驗證碼 (CVV/CVC)</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-sm font-mono border border-stone-300 rounded px-3 py-2 focus:border-[#C5A880] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-1 rounded text-[#C5A880] focus:ring-[#C5A880]"
                    />
                    <span className="text-xs text-stone-600">
                      我已詳閱並同意 BFH Hotel 之住房須知、住客實名登記入住規範及 24 小時前免費取消條款。
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation Slip */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-stone-900 font-serif-luxury">訂房成功！感謝您的預約</h3>
                <p className="text-xs text-stone-600">
                  訂房確認信已寄送至 <span className="font-semibold text-stone-800">{confirmedBooking.email}</span>，我們期待您的蒞臨。
                </p>
                <div className="inline-block bg-white px-4 py-1.5 rounded-full border border-emerald-300 mt-2">
                  <span className="text-xs text-stone-500">預約訂單編號：</span>
                  <span className="font-mono font-bold text-stone-900 tracking-wider text-sm ml-1">
                    {confirmedBooking.bookingCode}
                  </span>
                </div>
              </div>

              {/* Printable Voucher Card */}
              <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm space-y-4 print:border-none print:shadow-none">
                <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                  <div>
                    <h4 className="font-display-luxury text-xl font-bold tracking-wider text-[#8D6B3A]">
                      BFH HOTEL
                    </h4>
                    <p className="text-xs text-stone-500 font-serif-luxury">{HOTEL_INFO.chineseName}</p>
                    <p className="text-[11px] text-stone-400 mt-1">{HOTEL_INFO.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      狀態：已確認訂單
                    </span>
                    <p className="text-[11px] text-stone-400 mt-1 font-mono">{new Date().toLocaleDateString('zh-TW')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-b border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-400 block">住客姓名</span>
                    <span className="font-semibold text-stone-800 text-sm">{confirmedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">入住日期 (15:00)</span>
                    <span className="font-semibold text-stone-800 text-sm">{confirmedBooking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">退房日期 (11:00)</span>
                    <span className="font-semibold text-stone-800 text-sm">{confirmedBooking.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">天數與人數</span>
                    <span className="font-semibold text-stone-800 text-sm">{confirmedBooking.nights} 晚 / {confirmedBooking.adults} 大</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-700">
                  <p><span className="text-stone-400">預定房型：</span>{confirmedBooking.room.name} ({confirmedBooking.room.bedType})</p>
                  <p><span className="text-stone-400">擔保方式：</span>{confirmedBooking.paymentMethod}</p>
                  {confirmedBooking.addOns.length > 0 && (
                    <p><span className="text-stone-400">加購項目：</span>{confirmedBooking.addOns.map(a => a.name).join('、')}</p>
                  )}
                  {confirmedBooking.specialRequests && (
                    <p><span className="text-stone-400">特別備註：</span>{confirmedBooking.specialRequests}</p>
                  )}
                  <p className="pt-2 text-right text-base font-bold text-stone-900">
                    現場應付金額：<span className="font-serif-luxury text-[#8D6B3A] text-lg tabular-nums">NT$ {confirmedBooking.totalPrice.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-500" />
                  <span>列印訂房憑證</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded cursor-pointer"
                >
                  完成並返回首頁
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Step 1 to 4) */}
        {step < 5 && (
          <div className="bg-stone-100 border-t border-stone-200 px-6 py-3.5 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 border border-stone-300 rounded flex items-center gap-1 cursor-pointer bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>上一步</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 3) {
                      if (!guestName.trim()) {
                        alert('請填寫住客姓名');
                        return;
                      }
                      if (!email.trim() || !email.includes('@')) {
                        alert('請填寫有效電子郵件');
                        return;
                      }
                      if (!phone.trim()) {
                        alert('請填寫聯絡電話');
                        return;
                      }
                    }
                    setStep(step + 1);
                  }}
                  className="px-6 py-2 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>下一步</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="px-6 py-2.5 text-xs font-semibold text-stone-950 bg-[#C5A880] hover:bg-[#D8BC93] active:bg-[#B18E5E] rounded flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>確認預訂 (NT$ {totalPrice.toLocaleString()})</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
