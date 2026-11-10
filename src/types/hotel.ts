export type RoomCategory = 'all' | 'room' | 'executive' | 'suite';

export interface Room {
  id: string;
  name: string;
  nameEn: string;
  category: 'room' | 'executive' | 'suite';
  description: string;
  size: number; // in square meters
  sizePing: number; // in ping
  bedType: string;
  capacity: {
    adults: number;
    children: number;
  };
  price: number;
  originalPrice: number;
  image: string;
  view: string;
  highlights: string[];
  amenities: string[];
}

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  selected: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  email: string;
  phone: string;
  arrivalTime?: string;
  specialRequests?: string;
  addOns: BookingAddOn[];
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  validUntil: string;
  priceFrom: number;
  image: string;
  description: string;
  included: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  nameEn: string;
  cuisine: string;
  floor: string;
  hours: string;
  phone: string;
  description: string;
  signatures: string[];
  image: string;
}

export interface Facility {
  id: string;
  name: string;
  nameEn: string;
  floor: string;
  hours: string;
  description: string;
  features: string[];
  image: string;
}
