'use client';

import { Service } from '@/types/salon';
import { services } from '@/lib/salonData';

interface Props {
  selected: Service | null;
  onSelect: (service: Service) => void;
}

const categoryIcons: Record<string, string> = {
  Hair: '✂️', Skin: '🌸', Nails: '💅', Spa: '🧖', Makeup: '💄',
};

const categoryColors: Record<string, string> = {
  Hair: '#a855f7', Skin: '#ec4899', Nails: '#f59e0b', Spa: '#06b6d4', Makeup: '#10b981',
};

export default function ServiceSelector({ selected, onSelect }: Props) {
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div>
      {categories.map(category => {
        const catServices = services.filter(s => s.category === category);
        const color = categoryColors[category] || '#a855f7';

        return (
          <div key={category} style={{ marginBottom: 32 }}>
            {/* Category Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${color}20`,
                border: `1px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {categoryIcons[category]}
              </div>
              <h3 style={{
                margin: 0, fontSize: 16, fontWeight: 700, color,
              }}>
                {category}
              </h3>
              <div style={{
                height: 1, flex: 1,
                background: `linear-gradient(90deg, ${color}40, transparent)`,
              }} />
              <span style={{
                fontSize: 12, color: 'rgba(255,255,255,0.3)',
              }}>
                {catServices.length} services
              </span>
            </div>

            {/* Services Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 14,
            }}>
              {catServices.map(service => {
                const isSelected = selected?.id === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => onSelect(service)}
                    style={{
                      background: isSelected ? `${color}12` : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${isSelected ? color : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 16, padding: 18, cursor: 'pointer',
                      transition: 'all 0.2s', position: 'relative',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected)
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}50`;
                    }}
                    onMouseLeave={e => {
                      if (!isSelected)
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    {/* Popular Badge */}
                    {service.popular && (
                      <div style={{
                        position: 'absolute', top: -8, right: 10,
                        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                        borderRadius: 8, padding: '2px 8px',
                        fontSize: 10, fontWeight: 800, color: 'white',
                      }}>
                        ⭐ POPULAR
                      </div>
                    )}

                    {/* Selected Check */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 22, height: 22, borderRadius: '50%',
                        background: color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800,
                      }}>✓</div>
                    )}

                    <div style={{ fontSize: 32, marginBottom: 10 }}>{service.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{service.name}</div>
                    <div style={{
                      fontSize: 12, color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.5, marginBottom: 14,
                    }}>
                      {service.description}
                    </div>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color }}>
                        Rs. {service.price.toLocaleString()}
                      </span>
                      <span style={{
                        fontSize: 11, color: 'rgba(255,255,255,0.4)',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 6, padding: '3px 8px',
                      }}>
                        ⏱ {service.duration} min
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}