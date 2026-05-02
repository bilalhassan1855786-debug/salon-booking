import { Appointment } from "@/types/salon";

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="p-4 bg-gray-900 text-white rounded mt-3">
      <h3 className="text-lg font-bold">{appointment.name}</h3>
      <p>Service: {appointment.service.name}</p>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
    </div>
  );
}