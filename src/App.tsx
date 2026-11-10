/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OffersSection } from './components/OffersSection';
import { RoomsSection } from './components/RoomsSection';
import { DiningSection } from './components/DiningSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { DiningModal } from './components/DiningModal';
import { Room, Offer, Restaurant, Booking } from './types/hotel';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [activeRoomDetail, setActiveRoomDetail] = useState<Room | null>(null);
  const [activeDiningDetail, setActiveDiningDetail] = useState<Restaurant | null>(null);

  // Parameters passed into booking modal
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    selectedRoomId?: string;
  }>({});

  // Success toast
  const [successToast, setSuccessToast] = useState<{
    show: boolean;
    bookingCode: string;
    roomName: string;
  }>({ show: false, bookingCode: '', roomName: '' });

  // Quick book from hero search bar
  const handleHeroSearch = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    selectedRoomId?: string;
  }) => {
    setBookingParams(params);
    setIsBookingOpen(true);
  };

  // Open booking with a specific room
  const handleOpenBookingWithRoom = (room: Room) => {
    setBookingParams(prev => ({
      ...prev,
      selectedRoomId: room.id,
    }));
    setIsBookingOpen(true);
  };

  // Open booking from offer
  const handleSelectOffer = (offer: Offer) => {
    // If offer is related to specific room or general
    setBookingParams({
      selectedRoomId: offer.id === 'offer-executive-privilege' ? 'executive-premier' : 'deluxe-king'
    });
    setIsBookingOpen(true);
  };

  // Booking confirmed callback
  const handleBookingSuccess = (booking: Booking) => {
    setSuccessToast({
      show: true,
      bookingCode: booking.bookingCode,
      roomName: booking.room.name
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-[#C5A880]/30 selection:text-stone-950 font-sans">
      
      {/* Success Notification Banner */}
      {successToast.show && (
        <div className="fixed top-24 right-4 z-50 bg-stone-900 text-white p-4 rounded-lg shadow-2xl border border-[#C5A880] flex items-start gap-3 max-w-md animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs space-y-1">
            <p className="font-bold text-sm text-[#D8BC93]">預約已確認！</p>
            <p className="text-stone-300">
              您已成功預約「{successToast.roomName}」。
            </p>
            <p className="text-stone-400 font-mono">
              訂單編號: <span className="font-bold text-white">{successToast.bookingCode}</span>
            </p>
            <button
              onClick={() => {
                setSuccessToast({ show: false, bookingCode: '', roomName: '' });
                setIsLookupOpen(true);
              }}
              className="text-[#C5A880] hover:underline pt-1 block cursor-pointer"
            >
              點此檢視訂單紀錄 →
            </button>
          </div>
          <button
            onClick={() => setSuccessToast({ show: false, bookingCode: '', roomName: '' })}
            className="text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenBooking={() => {
          setBookingParams({});
          setIsBookingOpen(true);
        }}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with interactive fast booking bar */}
        <Hero onSearchBooking={handleHeroSearch} />

        {/* Offers & Packages Section */}
        <OffersSection onSelectOffer={handleSelectOffer} />

        {/* Rooms & Suites Catalog */}
        <RoomsSection
          onOpenBookingWithRoom={handleOpenBookingWithRoom}
          onViewRoomDetail={(room) => setActiveRoomDetail(room)}
        />

        {/* Dining & Culinary */}
        <DiningSection
          onSelectRestaurant={(restaurant) => setActiveDiningDetail(restaurant)}
        />

        {/* Leisure Facilities & Pool */}
        <FacilitiesSection />

        {/* Strategic Location & Transportation */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => {
          setBookingParams({});
          setIsBookingOpen(true);
        }}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Online Booking Flow Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialParams={bookingParams}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Reservation Lookup & Manage Modal */}
      <ReservationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={activeRoomDetail}
        onClose={() => setActiveRoomDetail(null)}
        onBookRoom={(room) => {
          setActiveRoomDetail(null);
          handleOpenBookingWithRoom(room);
        }}
      />

      {/* Dining Detail & Table Reservation Modal */}
      <DiningModal
        restaurant={activeDiningDetail}
        onClose={() => setActiveDiningDetail(null)}
      />

    </div>
  );
}
