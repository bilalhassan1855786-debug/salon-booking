'use client';

import { useMemo, useState } from 'react';
import type { Service, Stylist } from '@/types/salon';
import { services, stylists, generateTimeSlots } from '@/lib/salonData';

type Step = 1 | 2 | 3 | 4;
type BookingForm = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const categories = ['All', 'Hair', 'Skin', 'Nails', 'Spa', 'Makeup'];

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 52%, #0a1a1a 100%)',
  color: '#fff',
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const primaryButton: React.CSSProperties = {
  padding: '14px 18px',
  borderRadius: 12,
  border: 'none',
  background: 'linear-gradient(135deg, #ec4899, #a855f7)',
  color: '#fff',
  fontWeight: 750,
  fontSize: 15,
  cursor: 'pointer',
};

const secondaryButton: React.CSSProperties = {
  ...primaryButton,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.16)',
};

const panelStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(236,72,153,0.18)',
  borderRadius: 18,
  padding: 22,
};

export default function SalonBooking() {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  const filteredServices = useMemo(
    () => (filter === 'All' ? services : services.filter((service) => service.category === filter)),
    [filter],
  );

  // Use local date components to avoid UTC/time-zone date shifts.
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const timeSlots = useMemo(
    () => (selectedDate ? generateTimeSlots(new Date(`${selectedDate}T12:00:00`)) : []),
    [selectedDate],
  );

  const availableStylists = useMemo(
    () =>
      selectedService
        ? stylists.filter((stylist) => stylist.services.includes(selectedService.id))
        : stylists,
    [selectedService],
  );

  const steps: { n: Step; label: string; icon: string }[] = [
    { n: 1, label: 'Service', icon: '✂️' },
    { n: 2, label: 'Stylist & Time', icon: '📅' },
    { n: 3, label: 'Your Details', icon: '👤' },
    { n: 4, label: 'Confirm', icon: '✅' },
  ];

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString('en-PK', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const updateForm = (key: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedStylist || !selectedDate || !selectedTime) {
      setError('Please select a service, stylist, date, and time.');
      setStep(2);
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter your name and phone number.');
      setStep(3);
      return;
    }
    setError('');
    setBookingConfirmed(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingConfirmed(false);
    setForm({ name: '', phone: '', email: '', notes: '' });
    setFilter('All');
    setError('');
  };

  const goToStep = (nextStep: Step) => {
    setError('');
    setStep(nextStep);
  };

  if (bookingConfirmed) {
    return (
      <main style={{ ...pageStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <section style={{ ...panelStyle, width: '100%', maxWidth: 520, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 68, marginBottom: 12 }} aria-hidden="true">🎉</div>
          <h1 style={{ color: '#34d399', fontSize: 28, margin: '0 0 12px' }}>Booking Confirmed!</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Your appointment details are ready. Please note this demo confirms the booking in the interface only; it does not save to a server or notify the salon.
          </p>
          <div style={{ ...panelStyle, textAlign: 'left', margin: '24px 0' }}>
            {[
              ['Service', selectedService?.name ?? '—'],
              ['Stylist', selectedStylist?.name ?? '—'],
              ['Date', formattedDate || '—'],
              ['Time', selectedTime || '—'],
              ['Name', form.name],
              ['Phone', form.phone],
              ['Total', selectedService ? `Rs. ${selectedService.price.toLocaleString()}` : '—'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{label}</span>
                <strong style={{ fontSize: 14, textAlign: 'right', overflowWrap: 'anywhere' }}>{value}</strong>
              </div>
            ))}
          </div>
          <button type="button" onClick={resetBooking} style={{ ...primaryButton, width: '100%' }}>
            Book Another Appointment
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <header style={{ background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(236,72,153,0.2)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #ec4899, #a855f7)', display: 'grid', placeItems: 'center', fontSize: 24 }} aria-hidden="true">💇</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 850, background: 'linear-gradient(90deg, #ec4899, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Glamour Studio</h1>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Premium Salon & Spa · Book Online</p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '30px 20px 56px' }}>
        <nav aria-label="Booking progress" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 0, marginBottom: 36, overflowX: 'auto' }}>
          {steps.map((item, index) => (
            <div key={item.n} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => item.n < step && goToStep(item.n)}
                aria-current={step === item.n ? 'step' : undefined}
                style={{ border: 0, background: 'transparent', color: '#fff', cursor: item.n < step ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, minWidth: 74, padding: 0 }}
              >
                <span style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', background: step === item.n ? 'linear-gradient(135deg, #ec4899, #a855f7)' : item.n < step ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', border: `2px solid ${step === item.n ? 'transparent' : item.n < step ? '#10b981' : 'rgba(255,255,255,0.12)'}`, fontSize: 17 }}>
                  {item.n < step ? '✓' : item.icon}
                </span>
                <span style={{ fontSize: 11, color: step === item.n ? '#f9a8d4' : 'rgba(255,255,255,0.55)', fontWeight: step === item.n ? 700 : 400, whiteSpace: 'nowrap' }}>{item.label}</span>
              </button>
              {index < steps.length - 1 && <span aria-hidden="true" style={{ width: 'clamp(12px, 5vw, 64px)', height: 2, background: item.n < step ? '#10b981' : 'rgba(255,255,255,0.1)', margin: '0 6px 22px' }} />}
            </div>
          ))}
        </nav>

        {error && <div role="alert" style={{ padding: '12px 16px', marginBottom: 20, borderRadius: 12, border: '1px solid rgba(248,113,113,0.45)', background: 'rgba(127,29,29,0.2)', color: '#fecaca' }}>{error}</div>}

        {step === 1 && (
          <section>
            <h2 style={{ textAlign: 'center', margin: '0 0 8px', fontSize: 26 }}>Choose Your Service</h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.58)', margin: '0 0 26px' }}>Select from our salon and spa treatments.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 26 }}>
              {categories.map((category) => (
                <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} style={{ padding: '9px 16px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.08)', background: filter === category ? 'linear-gradient(135deg, #ec4899, #a855f7)' : 'rgba(255,255,255,0.055)', color: '#fff', cursor: 'pointer', fontWeight: filter === category ? 700 : 500 }}>
                  {category}
                </button>
              ))}
            </div>
            {filteredServices.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)' }}>No services found in this category.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
                {filteredServices.map((service) => (
                  <button key={service.id} type="button" onClick={() => { setSelectedService(service); setSelectedStylist(null); setSelectedDate(''); setSelectedTime(''); setError(''); setStep(2); }} style={{ ...panelStyle, color: '#fff', textAlign: 'left', cursor: 'pointer', position: 'relative', border: `2px solid ${selectedService?.id === service.id ? '#ec4899' : 'rgba(255,255,255,0.07)'}`, transition: 'transform 160ms ease, border-color 160ms ease' }}>
                    {service.popular && <span style={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: 10, padding: '4px 9px', fontSize: 10, fontWeight: 800 }}>POPULAR</span>}
                    <div style={{ fontSize: 34, marginBottom: 12 }}>{service.icon}</div>
                    <div style={{ fontWeight: 750, fontSize: 17, marginBottom: 7 }}>{service.name}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '0 0 18px' }}>{service.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                      <strong style={{ fontSize: 19, color: '#f9a8d4' }}>Rs. {service.price.toLocaleString()}</strong>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '5px 8px' }}>⏱ {service.duration} min</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 style={{ textAlign: 'center', margin: '0 0 26px', fontSize: 26 }}>Choose Stylist & Time</h2>
            {selectedService && <p style={{ textAlign: 'center', color: '#f9a8d4', marginTop: -14, marginBottom: 28 }}>{selectedService.name} · Rs. {selectedService.price.toLocaleString()}</p>}

            <h3 style={{ color: 'rgba(255,255,255,0.82)', marginBottom: 14 }}>Available Stylists</h3>
            {availableStylists.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>No stylists are listed for this service yet. Please choose another service.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 14, marginBottom: 30 }}>
                {availableStylists.map((stylist) => {
                  const selected = selectedStylist?.id === stylist.id;
                  return (
                    <button key={stylist.id} type="button" onClick={() => { setSelectedStylist(stylist); setError(''); }} aria-pressed={selected} style={{ ...panelStyle, textAlign: 'center', color: '#fff', cursor: 'pointer', border: `2px solid ${selected ? '#ec4899' : 'rgba(255,255,255,0.07)'}`, background: selected ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.04)' }}>
                      <div style={{ width: 58, height: 58, borderRadius: '50%', margin: '0 auto 12px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.25))', fontSize: 28 }}>{stylist.avatar || '💇‍♀️'}</div>
                      <strong style={{ display: 'block', marginBottom: 6 }}>{stylist.name}</strong>
                      <span style={{ color: selected ? '#f9a8d4' : 'rgba(255,255,255,0.5)', fontSize: 12 }}>{selected ? 'Selected stylist' : 'Tap to select'}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <h3 style={{ color: 'rgba(255,255,255,0.82)', marginBottom: 12 }}>Select Date</h3>
            <input aria-label="Appointment date" type="date" min={minDate} value={selectedDate} onChange={(event) => { setSelectedDate(event.target.value); setSelectedTime(''); setError(''); }} style={{ boxSizing: 'border-box', width: '100%', maxWidth: 320, display: 'block', padding: '12px 14px', marginBottom: 26, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 12, color: '#fff', fontSize: 15, colorScheme: 'dark' }} />

            {selectedDate && (
              <>
                <h3 style={{ color: 'rgba(255,255,255,0.82)', marginBottom: 12 }}>Select Time</h3>
                {timeSlots.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>No time slots are available for this date.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 10, marginBottom: 28 }}>
                    {timeSlots.map((slot) => (
                      <button key={slot.time} type="button" disabled={!slot.available} onClick={() => { setSelectedTime(slot.time); setError(''); }} aria-pressed={selectedTime === slot.time} style={{ padding: '12px 8px', borderRadius: 10, border: `1px solid ${selectedTime === slot.time ? '#c084fc' : 'rgba(255,255,255,0.12)'}`, background: selectedTime === slot.time ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.04)', color: slot.available ? '#fff' : 'rgba(255,255,255,0.25)', cursor: slot.available ? 'pointer' : 'not-allowed', fontSize: 13, fontWeight: 650 }}>
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button type="button" onClick={() => goToStep(1)} style={{ ...secondaryButton, flex: 1 }}>← Back</button>
              <button type="button" disabled={!selectedService || !selectedStylist || !selectedDate || !selectedTime} onClick={() => goToStep(3)} style={{ ...primaryButton, flex: 2, opacity: selectedService && selectedStylist && selectedDate && selectedTime ? 1 : 0.45, cursor: selectedService && selectedStylist && selectedDate && selectedTime ? 'pointer' : 'not-allowed' }}>Continue →</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section style={{ maxWidth: 540, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', margin: '0 0 26px', fontSize: 26 }}>Your Details</h2>
            <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {([
                { key: 'name', label: 'Full Name *', placeholder: 'Sara Ahmed', type: 'text', required: true },
                { key: 'phone', label: 'Phone Number *', placeholder: '+92 300 1234567', type: 'tel', required: true },
                { key: 'email', label: 'Email (optional)', placeholder: 'sara@example.com', type: 'email', required: false },
                { key: 'notes', label: 'Special Requests (optional)', placeholder: 'Any preferences or notes...', type: 'text', required: false },
              ] as const).map((field) => (
                <label key={field.key} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.78)', fontWeight: 650 }}>
                  {field.label}
                  <input type={field.type} required={field.required} value={form[field.key]} onChange={(event) => updateForm(field.key, event.target.value)} placeholder={field.placeholder} style={{ boxSizing: 'border-box', width: '100%', marginTop: 8, padding: '13px 14px', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(236,72,153,0.28)', borderRadius: 10, color: '#fff', fontSize: 15, outline: 'none' }} />
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              <button type="button" onClick={() => goToStep(2)} style={{ ...secondaryButton, flex: 1 }}>← Back</button>
              <button type="button" disabled={!form.name.trim() || !form.phone.trim()} onClick={() => goToStep(4)} style={{ ...primaryButton, flex: 2, opacity: form.name.trim() && form.phone.trim() ? 1 : 0.45 }}>Review Booking →</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section style={{ maxWidth: 560, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', margin: '0 0 26px', fontSize: 26 }}>Confirm Booking</h2>
            <div style={{ ...panelStyle, marginBottom: 22 }}>
              {[
                ['Service', `${selectedService?.icon ?? ''} ${selectedService?.name ?? 'Not selected'}`],
                ['Duration', selectedService ? `${selectedService.duration} minutes` : '—'],
                ['Stylist', `${selectedStylist?.avatar ?? ''} ${selectedStylist?.name ?? 'Not selected'}`],
                ['Date', formattedDate || 'Not selected'],
                ['Time', selectedTime || 'Not selected'],
                ['Client', form.name || '—'],
                ['Phone', form.phone || '—'],
                ['Email', form.email || 'Not provided'],
                ['Notes', form.notes || 'None'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, flexShrink: 0 }}>{label}</span>
                  <strong style={{ fontSize: 14, textAlign: 'right', overflowWrap: 'anywhere' }}>{value}</strong>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 20 }}>
                <strong style={{ fontSize: 18 }}>Total</strong>
                <strong style={{ fontSize: 24, color: '#f9a8d4' }}>Rs. {selectedService?.price.toLocaleString() ?? '—'}</strong>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>Demo note: confirming shows a success screen only. Connect an API/database to save real appointments and prevent double-booking.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button type="button" onClick={() => goToStep(3)} style={{ ...secondaryButton, flex: 1 }}>← Back</button>
              <button type="button" onClick={handleConfirm} style={{ ...primaryButton, flex: 2 }}>✨ Confirm Booking</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
