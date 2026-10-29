'use client';

import { TimeSlot } from '@/types/salon';
import { generateTimeSlots } from '@/lib/salonData';

interface Props {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  serviceDuration: number;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  serviceDuration,
}: Props) {
  const minDate = new Date().toISOString().split('T')[0];
  const timeSlots: TimeSlot[] = selectedDate ? generateTimeSlots(new Date(selectedDate)) : [];

  // Generate next 7 days for quick date buttons
  const quickDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDay = (date: Date) =>
    date.toLocaleDateString('en-PK', { weekday: 'short' });

  const toInputValue = (date: Date) =>
    date.toISOString().split('T')[0];

  const morning   = timeSlots.filter(s => parseInt(s.time) < 12);
  const afternoon = timeSlots.filter(s => parseInt(s.time) >= 12 && parseInt(s.time) < 17);
  const evening   = timeSlots.filter(s => parseInt(s.time) >= 17);

  const slotGroups = [
    { label: '🌅 Morning',   slots: morning   },
    { label: '☀️ Afternoon', slots: afternoon },
    { label: '🌆 Evening',   slots: evening   },
  ];

  return (
    <div>
      {/* Quick Date Selector */}
      <div style={{ marginBottom: 24 }}>
        <label style={{
          display: 'block', marginBottom: 12,
          fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
        }}>
          📅 Select Date
        </label>

        {/* Quick 7-Day Buttons */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 8, marginBottom: 12,
        }}>
          {quickDates.map((date, i) => {
            const val = toInputValue(date);
            const isSelected = selectedDate === val;
            const isToday = i === 0;
            return (
              <button
                key={val}
                onClick={() => { onDateChange(val); onTimeChange(''); }}
                style={{
                  padding: '10px 4px', borderRadius: 12, border: 'none',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  background: isSelected
                    ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                    : 'rgba(255,255,255,0.05)',
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.6)',
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>
                  {isToday ? 'Today' : formatDay(date)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>
                  {date.getDate()}
                </div>
                <div style={{ fontSize: 9, opacity: 0.7 }}>
                  {date.toLocaleDateString('en-PK', { month: 'short' })}
                </div>
              </button>
            );
          })}
        </div>

        {/* Manual Date Input */}
        <input
          type="date"
          min={minDate}
          value={selectedDate}
          onChange={e => { onDateChange(e.target.value); onTimeChange(''); }}
          style={{
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(236,72,153,0.3)',
            borderRadius: 10, color: 'white', fontSize: 13,
            outline: 'none', colorScheme: 'dark',
          }}
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 16,
          }}>
            <label style={{
              fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
            }}>
              🕐 Select Time
            </label>
            <span style={{
              fontSize: 11, color: 'rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 6, padding: '3px 8px',
            }}>
              Duration: {serviceDuration} min
            </span>
            <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
              {[
                { label: 'Available', color: '#10b981' },
                { label: 'Booked',    color: 'rgba(255,255,255,0.15)' },
              ].map(leg => (
                <div key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: leg.color }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{leg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {slotGroups.map(group =>
            group.slots.length > 0 && (
              <div key={group.label} style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 10, letterSpacing: 1,
                }}>
                  {group.label}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: 8,
                }}>
                  {group.slots.map(slot => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => onTimeChange(slot.time)}
                        style={{
                          padding: '11px 6px', borderRadius: 10,
                          border: `2px solid ${
                            isSelected
                              ? '#a855f7'
                              : slot.available
                              ? 'rgba(255,255,255,0.08)'
                              : 'rgba(255,255,255,0.03)'
                          }`,
                          background: isSelected
                            ? 'rgba(168,85,247,0.2)'
                            : slot.available
                            ? 'rgba(255,255,255,0.04)'
                            : 'rgba(255,255,255,0.01)',
                          color: slot.available
                            ? isSelected ? '#a855f7' : 'white'
                            : 'rgba(255,255,255,0.15)',
                          cursor: slot.available ? 'pointer' : 'not-allowed',
                          fontSize: 13, fontWeight: isSelected ? 800 : 500,
                          transition: 'all 0.15s', position: 'relative',
                        }}
                      >
                        {slot.time}
                        {!slot.available && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <div style={{
                              width: '70%', height: 1,
                              background: 'rgba(255,255,255,0.1)',
                              transform: 'rotate(-15deg)',
                            }} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {!selectedDate && (
        <div style={{
          textAlign: 'center', padding: '32px 20px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 14, border: '1px dashed rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.3)', fontSize: 14,
        }}>
          📅 Select a date to see available time slots
        </div>
      )}
    </div>
  );
}