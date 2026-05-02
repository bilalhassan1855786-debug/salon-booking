import { Service, Stylist, TimeSlot } from '@/types/salon';

export const services: Service[] = [
  { id: 's1', name: 'Haircut & Style',     category: 'Hair',   duration: 60,  price: 1500, description: 'Expert cut and blow-dry styling', icon: '✂️', popular: true },
  { id: 's2', name: 'Hair Color',          category: 'Hair',   duration: 120, price: 4000, description: 'Full color, highlights or balayage', icon: '🎨', popular: true },
  { id: 's3', name: 'Keratin Treatment',   category: 'Hair',   duration: 180, price: 8000, description: 'Smoothing treatment for 3 months', icon: '💫' },
  { id: 's4', name: 'Facial (Premium)',    category: 'Skin',   duration: 75,  price: 3500, description: 'Deep cleanse + hydration mask', icon: '🌸', popular: true },
  { id: 's5', name: 'Bridal Makeup',       category: 'Makeup', duration: 120, price: 15000, description: 'Full bridal look with trial', icon: '👰', popular: true },
  { id: 's6', name: 'Manicure & Pedicure', category: 'Nails',  duration: 90,  price: 2500, description: 'Gel or regular, includes nail art', icon: '💅' },
  { id: 's7', name: 'Full Body Massage',   category: 'Spa',    duration: 90,  price: 5000, description: 'Swedish or deep tissue massage', icon: '🧖' },
  { id: 's8', name: 'Eyebrow Threading',   category: 'Skin',   duration: 20,  price: 300,  description: 'Shape and define your brows', icon: '👁️' },
];

export const stylists: Stylist[] = [
  { id: 'st1', name: 'Aisha Malik',    speciality: 'Hair Expert',    rating: 4.9, reviews: 234, avatar: '👩‍🦱', availableDays: [1,2,3,4,5],   services: ['s1','s2','s3'] },
  { id: 'st2', name: 'Sara Hussain',   speciality: 'Makeup Artist',  rating: 4.8, reviews: 189, avatar: '💄',   availableDays: [0,1,2,5,6],   services: ['s5','s4'] },
  { id: 'st3', name: 'Nadia Khan',     speciality: 'Skin Specialist', rating: 4.7, reviews: 156, avatar: '🧖‍♀️',  availableDays: [1,3,4,5,6],   services: ['s4','s7','s8'] },
  { id: 'st4', name: 'Zara Ahmed',     speciality: 'Nail Artist',    rating: 4.9, reviews: 312, avatar: '💅',   availableDays: [1,2,3,4,5,6], services: ['s6','s8'] },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const day = date.getDay();
  const bookedSlots = ['10:00', '11:30', '14:00', '16:30'];
  for (let h = 9; h <= 19; h++) {
    for (let m of [0, 30]) {
      if (h === 19 && m === 30) break;
      const time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
      slots.push({ time, available: !bookedSlots.includes(time) && day !== 0 });
    }
  }
  return slots;
};