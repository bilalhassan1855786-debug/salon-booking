'use client';

import { useState } from 'react';
import { Service, Stylist, Appointment } from '@/types/salon';
import { services, stylists, generateTimeSlots } from '@/lib/salonData';

type Step = 1 | 2 | 3 | 4;

export default function SalonBooking() {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Hair', 'Skin', 'Nails', 'Spa', 'Makeup'];
  const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

  const minDate = new Date().toISOString().split('T')[0];
  const timeSlots = selectedDate ? generateTimeSlots(new Date(selectedDate)) : [];

  const availableStylists = selectedService
    ? stylists.filter(st => st.services.includes(selectedService.id))
    : stylists;

  const steps = [
    { n: 1, label: 'Service', icon: '✂️' },
    { n: 2, label: 'Stylist & Time', icon: '📅' },
    { n: 3, label: 'Your Details', icon: '👤' },
    { n: 4, label: 'Confirm', icon: '✅' },
  ];

  const handleConfirm = () => {
    if (form.name && form.phone && selectedService && selectedStylist && selectedDate && selectedTime) {
      setBookingConfirmed(true);
    }
  };

  if (bookingConfirmed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a1a1a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 24, padding: 48, maxWidth: 500,
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h2 style={{ color: '#10b981', fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Booking Confirmed!</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>
            Your appointment has been booked successfully.
          </p>
          <div style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 16, padding: 24, marginBottom: 28, textAlign: 'left',
          }}>
            {[
              ['Service', selectedService?.name],
              ['Stylist', selectedStylist?.name],
              ['Date', new Date(selectedDate).toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
              ['Time', selectedTime],
              ['Total', `Rs. ${selectedService?.price.toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{k}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setBookingConfirmed(false); setStep(1); setSelectedService(null); setSelectedStylist(null); setSelectedDate(''); setSelectedTime(''); setForm({ name:'',phone:'',email:'',notes:'' }); }}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              color: 'white', fontWeight: 700, fontSize: 16,
            }}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a1a 100%)',
      fontFamily: "'Inter', sans-serif", color: 'white',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(236,72,153,0.2)',
        padding: '20px 32px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          }}>💇</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800,
              background: 'linear-gradient(90deg, #ec4899, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Glamour Studio
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Premium Salon & Spa • Book Online</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px' }}>
        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: s.n < step ? 'pointer' : 'default',
              }} onClick={() => s.n < step && setStep(s.n as Step)}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: step === s.n
                    ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                    : s.n < step ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${step === s.n ? 'transparent' : s.n < step ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.n < step ? 18 : 16,
                }}>
                  {s.n < step ? '✓' : s.icon}
                </div>
                <span style={{ fontSize: 11, color: step === s.n ? '#ec4899' : 'rgba(255,255,255,0.4)', fontWeight: step === s.n ? 700 : 400 }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 60, height: 2, background: i < step - 1 ? '#10b981' : 'rgba(255,255,255,0.1)', margin: '0 8px', marginBottom: 22 }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Services */}
        {step === 1 && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: 24, fontWeight: 800 }}>Choose Your Service</h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Select from our premium treatments</p>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: filter === cat ? 'linear-gradient(135deg, #ec4899, #a855f7)' : 'rgba(255,255,255,0.06)',
                  color: filter === cat ? 'white' : 'rgba(255,255,255,0.5)',
                  fontWeight: filter === cat ? 700 : 400, fontSize: 14,
                }}>{cat}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {filteredServices.map(service => (
                <div key={service.id}
                  onClick={() => { setSelectedService(service); setStep(2); }}
                  style={{
                    background: selectedService?.id === service.id
                      ? 'rgba(236,72,153,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${selectedService?.id === service.id ? '#ec4899' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 18, padding: 22, cursor: 'pointer',
                    transition: 'all 0.2s', position: 'relative',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#ec4899'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = selectedService?.id === service.id ? '#ec4899' : 'rgba(255,255,255,0.06)'}
                >
                  {service.popular && (
                    <div style={{
                      position: 'absolute', top: -8, right: 12,
                      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                      borderRadius: 10, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    }}>⭐ Popular</div>
                  )}
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{service.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{service.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>{service.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#ec4899' }}>
                      Rs. {service.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '4px 10px' }}>
                      ⏱ {service.duration} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Stylist & Time */}
        {step === 2 && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: 24, fontWeight: 800 }}>Choose Stylist & Time</h2>

            {/* Stylists */}
            <h3 style={{ marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>Available Stylists</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 32 }}>
              {availableStylists.map(stylist => (
                <div key={stylist.id}
                  onClick={() => setSelectedStylist(stylist)}
                  style={{
                    background: selectedStylist?.id === stylist.id ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${selectedStylist?.id === stylist.id ? '#a855f7' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 16, padding: 20, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{stylist.avatar}</div>
                  <div style={{ fontWeight: 700 }}>{stylist.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{stylist.speciality}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <span style={{ color: '#f59e0b' }}>⭐</span>
                    <span style={{ fontWeight: 700 }}>{stylist.rating}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>({stylist.reviews})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Date */}
            <h3 style={{ marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>Select Date</h3>
            <input
              type="date" min={minDate} value={selectedDate}
              onChange={e => { setSelectedDate(e.target.value); setSelectedTime(''); }}
              style={{
                padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: 12, color: 'white', fontSize: 16, marginBottom: 28,
                colorScheme: 'dark',
              }}
            />

            {/* Time Slots */}
            {selectedDate && (
              <>
                <h3 style={{ marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>Select Time</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10, marginBottom: 32 }}>
                  {timeSlots.map(slot => (
                    <button key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      style={{
                        padding: '12px 8px', borderRadius: 10, border: '2px solid',
                        borderColor: selectedTime === slot.time ? '#a855f7' : slot.available ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                        background: selectedTime === slot.time ? 'rgba(168,85,247,0.2)' : slot.available ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                        color: slot.available ? 'white' : 'rgba(255,255,255,0.2)',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                      }}>
                      {slot.time}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'white', cursor: 'pointer', fontSize: 16,
              }}>← Back</button>
              <button
                disabled={!selectedStylist || !selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                style={{
                  flex: 2, padding: 14, borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: selectedStylist && selectedDate && selectedTime
                    ? 'linear-gradient(135deg, #ec4899, #a855f7)' : 'rgba(255,255,255,0.1)',
                  color: 'white', fontWeight: 700, fontSize: 16,
                }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: 24, fontWeight: 800 }}>Your Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Sara Ahmed', type: 'text' },
                { key: 'phone', label: 'Phone Number', placeholder: '+92-300-1234567', type: 'tel' },
                { key: 'email', label: 'Email (optional)', placeholder: 'sara@example.com', type: 'email' },
                { key: 'notes', label: 'Special Requests', placeholder: 'Any preferences or notes...', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '14px 16px', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      borderRadius: 12, color: 'white', fontSize: 15, outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: 16 }}>← Back</button>
              <button disabled={!form.name || !form.phone} onClick={() => setStep(4)} style={{
                flex: 2, padding: 14, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: form.name && form.phone ? 'linear-gradient(135deg, #ec4899, #a855f7)' : 'rgba(255,255,255,0.1)',
                color: 'white', fontWeight: 700, fontSize: 16,
              }}>Review Booking →</button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: 24, fontWeight: 800 }}>Confirm Booking</h2>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(236,72,153,0.2)',
              borderRadius: 20, padding: 28, marginBottom: 24,
            }}>
              {[
                ['Service', `${selectedService?.icon} ${selectedService?.name}`],
                ['Duration', `${selectedService?.duration} minutes`],
                ['Stylist', `${selectedStylist?.avatar} ${selectedStylist?.name}`],
                ['Date', new Date(selectedDate).toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                ['Time', selectedTime],
                ['Client', form.name],
                ['Phone', form.phone],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
                </div>
              ))}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginTop: 8,
              }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#ec4899' }}>
                  Rs. {selectedService?.price.toLocaleString()}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, padding: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: 16 }}>← Back</button>
              <button onClick={handleConfirm} style={{
                flex: 2, padding: 14, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                color: 'white', fontWeight: 800, fontSize: 16,
              }}>✨ Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}