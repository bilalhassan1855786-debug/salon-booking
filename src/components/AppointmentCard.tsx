'use client';

import { Appointment, Service, Stylist } from '@/types/salon';
import { services, stylists } from '@/lib/salonData';

interface Props {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

const statusConfig = {
  pending: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    icon: '⏳',
    label: 'Pending Confirmation',
  },
  confirmed: {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    icon: '✅',
    label: 'Confirmed',
  },
  completed: {
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.1)',
    border: 'rgba(168,85,247,0.3)',
    icon: '⭐',
    label: 'Completed',
  },
  cancelled: {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    icon: '❌',
    label: 'Cancelled',
  },
};

export default function AppointmentCard({ appointment, onCancel }: Props) {
  const service = services.find(s => s.id === appointment.serviceId);
  const stylist = stylists.find(s => s.id === appointment.stylistId);
  const status = statusConfig[appointment.status];

  const appointmentDate = new Date(appointment.date);
  const isPast = appointmentDate < new Date();
  const isToday = appointmentDate.toDateString() === new Date().toDateString();

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${status.border}`,
      borderRadius: 20, padding: 24,
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 32px ${status.color}15`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Background Gradient Accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120, borderRadius: '0 20px 0 100%',
        background: `${status.color}08`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 18,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 13,
            background: `${status.color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            {service?.icon || '💇'}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{service?.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              #{appointment.id.slice(-6).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div style={{
          background: status.bg,
          border: `1px solid ${status.border}`,
          borderRadius: 10, padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>{status.icon}</span>
          <span style={{ fontSize: 12, color: status.color, fontWeight: 700 }}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Date & Time Highlight */}
      <div style={{
        background: isToday
          ? 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))'
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isToday ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 14, padding: '14px 18px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16,
      }}>
        <div>
          {isToday && (
            <div style={{
              fontSize: 10, fontWeight: 800, color: '#ec4899',
              marginBottom: 4, letterSpacing: 1,
            }}>📍 TODAY</div>
          )}
          <div style={{ fontWeight: 700, fontSize: 15 }}>
            📅 {appointmentDate.toLocaleDateString('en-PK', {
              weekday: 'long', year: 'numeric',
              month: 'long', day: 'numeric',
            })}
          </div>
        </div>
        <div style={{
          fontSize: 22, fontWeight: 800,
          color: isToday ? '#ec4899' : 'rgba(255,255,255,0.8)',
        }}>
          🕐 {appointment.time}
        </div>
      </div>

      {/* Details Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 10, marginBottom: 16,
      }}>
        {[
          {
            label: 'Stylist',
            value: `${stylist?.avatar} ${stylist?.name}`,
            icon: '💇',
          },
          {
            label: 'Duration',
            value: `${service?.duration} minutes`,
            icon: '⏱',
          },
          {
            label: 'Client',
            value: appointment.customerName,
            icon: '👤',
          },
          {
            label: 'Phone',
            value: appointment.customerPhone,
            icon: '📱',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10, padding: '10px 14px',
          }}>
            <div style={{
              fontSize: 11, color: 'rgba(255,255,255,0.35)',
              marginBottom: 4,
            }}>
              {item.icon} {item.label}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Price Row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Total Amount</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: status.color }}>
            Rs. {appointment.totalPrice.toLocaleString()}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {/* Reschedule Button */}
          {!isPast && appointment.status !== 'cancelled' && (
            <button style={{
              padding: '9px 16px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>
              📅 Reschedule
            </button>
          )}

          {/* Cancel Button */}
          {!isPast && appointment.status !== 'cancelled' && onCancel && (
            <button
              onClick={() => onCancel(appointment.id)}
              style={{
                padding: '9px 16px', borderRadius: 10,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                color: '#ef4444',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)';
              }}
            >
              ❌ Cancel
            </button>
          )}

          {/* Review Button for Completed */}
          {appointment.status === 'completed' && (
            <button style={{
              padding: '9px 16px', borderRadius: 10,
              border: '1px solid rgba(168,85,247,0.3)',
              background: 'rgba(168,85,247,0.1)',
              color: '#a855f7',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>
              ⭐ Leave Review
            </button>
          )}
        </div>
      </div>

      {/* Notes */}
      {appointment.notes && (
        <div style={{
          marginTop: 14, padding: '10px 14px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 10, borderLeft: `3px solid ${status.color}`,
        }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>
            📝 Special Notes
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            {appointment.notes}
          </div>
        </div>
      )}
    </div>
  );
}