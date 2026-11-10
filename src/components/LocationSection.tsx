import React, { useState } from 'react';
import { MapPin, Navigation, Car, Train, Plane, Clock, Phone, Mail } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const LocationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hsr' | 'drive' | 'science' | 'airport'>('hsr');

  return (
    <section id="location" className="py-20 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#8D6B3A] font-serif-luxury font-semibold mb-2">
              Strategic Location & Transport
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              地理位置與交通 <span className="text-[#C5A880] font-light">·</span> 繁華樞紐之巔
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-600 max-w-md font-light">
            位處竹北商業精華特區，毗鄰高鐵新竹站與國道一號，迅速串聯新竹科學園區與大台北生活圈。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Transport Tabs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-xs text-stone-400 font-serif-luxury uppercase tracking-wider block">Address</span>
                <p className="text-base font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8D6B3A]" />
                  <span>{HOTEL_INFO.address}</span>
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  電話：{HOTEL_INFO.phone} ‧ 傳真：{HOTEL_INFO.fax}
                </p>
              </div>

              {/* Transportation Tabs */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">交通方式說明</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('hsr')}
                    className={`p-2.5 rounded text-xs font-medium flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      activeTab === 'hsr'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Train className="w-4 h-4" />
                    <span>台灣高鐵</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('drive')}
                    className={`p-2.5 rounded text-xs font-medium flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      activeTab === 'drive'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>自行開車</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('science')}
                    className={`p-2.5 rounded text-xs font-medium flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      activeTab === 'science'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>科學園區</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('airport')}
                    className={`p-2.5 rounded text-xs font-medium flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      activeTab === 'airport'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Plane className="w-4 h-4" />
                    <span>桃園機場</span>
                  </button>
                </div>

                {/* Tab Content Details */}
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-2">
                  {activeTab === 'hsr' && (
                    <>
                      <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Train className="w-3.5 h-3.5 text-[#8D6B3A]" />
                        <span>自高鐵新竹站出發（車程約 5 分鐘）：</span>
                      </p>
                      <p>1. 飯店提供每日定時免費接駁車（往返高鐵新竹站 4 號出口），請提前向禮賓部預約。</p>
                      <p>2. 計程車搭乘：於高鐵站排班計程車處搭乘，約 5 分鐘抵達飯店大門。</p>
                    </>
                  )}

                  {activeTab === 'drive' && (
                    <>
                      <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-[#8D6B3A]" />
                        <span>國道一號竹北交流道（車程約 2 分鐘）：</span>
                      </p>
                      <p>1. 南下/北上均自竹北交流道下，往芎林方向沿光明六路東一段直行，約 2 分鐘即可見飯店於右側。</p>
                      <p>2. 飯店備有地下專屬地下平面坡道停車場，房客住宿期間享無限次免費停車消磁。</p>
                    </>
                  )}

                  {activeTab === 'science' && (
                    <>
                      <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#8D6B3A]" />
                        <span>往返新竹科學園區（竹科）：</span>
                      </p>
                      <p>1. 經自強南路銜接經國大橋至竹科約 10-15 分鐘車程。</p>
                      <p>2. 飯店禮賓櫃台提供商務叫車與全天候專屬禮賓房車租賃預訂服務。</p>
                    </>
                  )}

                  {activeTab === 'airport' && (
                    <>
                      <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#8D6B3A]" />
                        <span>往返桃園國際機場（TPE，車程約 40-45 分鐘）：</span>
                      </p>
                      <p>1. 沿國道一號北上直達，順暢便捷。</p>
                      <p>2. 飯店可代為安排頂級賓士進口禮賓車接送機服務（費用洽禮賓服務部）。</p>
                    </>
                  )}
                </div>
              </div>

              {/* Check-in info card */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block">辦理入住 (Check-in)</span>
                  <span className="font-semibold text-stone-800 text-sm">15:00 以後</span>
                </div>
                <div>
                  <span className="text-stone-400 block">辦理退房 (Check-out)</span>
                  <span className="font-semibold text-stone-800 text-sm">11:00 以前</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Styled Map Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="relative aspect-[4/3] bg-stone-100 flex items-center justify-center p-6 text-center">
                {/* Styled Map Graphic Representation */}
                <div className="w-full h-full rounded-lg bg-stone-900 relative overflow-hidden flex flex-col items-center justify-center p-8 text-white">
                  {/* Subtle Grid Roads graphic */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute w-full h-[2px] bg-stone-700/60 top-1/2 -translate-y-6" />
                  <div className="absolute w-[2px] h-full bg-stone-700/60 left-1/2 -translate-x-12" />
                  
                  {/* Pin Mark */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                    <div className="w-12 h-12 rounded-full bg-[#C5A880] text-stone-950 flex items-center justify-center shadow-2xl border-2 border-white">
                      <MapPin className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="mt-2 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded border border-[#C5A880]/60 text-xs font-bold text-[#D8BC93] tracking-wider font-display-luxury">
                      BFH HOTEL
                    </div>
                  </div>

                  {/* Nearby Landmark points */}
                  <div className="absolute bottom-4 left-4 text-[10px] text-stone-400 bg-stone-950/80 px-2.5 py-1.5 rounded border border-stone-800">
                    高鐵新竹站 ‧ 車程 5 分鐘
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] text-stone-400 bg-stone-950/80 px-2.5 py-1.5 rounded border border-stone-800">
                    國道一號竹北交流道 ‧ 2 分鐘
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-600">導航搜尋：新竹縣竹北市光明六路東一段265號</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('新竹縣竹北市光明六路東一段265號')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#C5A880] hover:bg-[#D8BC93] text-stone-950 font-semibold rounded transition-colors inline-flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Google 地圖導航</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
