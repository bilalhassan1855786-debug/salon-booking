'use client';

type Props = {
  slots: string[];
  onPick: (slot: string) => void;
};

export default function TimeSlotPicker({ slots, onPick }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Pick Time</h2>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onPick(slot)}
            className="p-2 bg-blue-600 text-white rounded"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}