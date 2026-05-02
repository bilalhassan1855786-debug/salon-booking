'use client';

import { Service } from "@/types/salon";
import { useState } from "react";

type Props = {
  service: Service;
  time: string;
  onBook: (name: string, date: string) => void;
};

export default function BookingForm({ service, time, onBook }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Enter Details</h2>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={() => onBook(name, date)}
        className="w-full p-3 bg-green-600 text-white rounded"
      >
        Confirm Booking for {service.name} at {time}
      </button>
    </div>
  );
}