'use client';

import { Service } from "@/types/salon";

type Props = {
  services: Service[];
  onSelect: (service: Service) => void;
};

export default function ServiceSelector({ services, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Select Service</h2>
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className="w-full p-3 bg-gray-800 text-white rounded"
        >
          {s.name} — Rs {s.price}
        </button>
      ))}
    </div>
  );
}