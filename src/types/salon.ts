export interface Service {
  id: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Nails' | 'Spa' | 'Makeup';
  duration: number; // minutes
  price: number;
  description: string;
  icon: string;
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  speciality: string;
  rating: number;
  reviews: number;
  avatar: string;
  availableDays: number[]; // 0=Sun, 1=Mon...
  services: string[]; // service IDs
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
}

export interface BookingStep {
  step: number;
  label: string;
  completed: boolean;
}