import React from 'react';
import { Heart, Calendar, Clock, Star, Video } from 'lucide-react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const appointments: Appointment[] = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    type: "Video Session",
    status: "upcoming"
  },
  {
    id: 2,
    date: "2024-03-15",
    time: "2:30 PM",
    type: "Chat Session",
    status: "completed"
  }
];

const Healer: React.FC = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center mb-8">
        <Heart className="h-6 w-6 mr-2 text-teal-600" />
        <h1 className="text-2xl font-bold">My Healer</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Healer Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <img
                src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Dr. Emily Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold">Dr. Emily Chen</h2>
              <p className="text-gray-600">Clinical Psychologist</p>
              <div className="flex items-center justify-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">4.9 (128 reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full btn-primary flex items-center justify-center">
                <Video className="h-5 w-5 mr-2" />
                Schedule Session
              </button>
              <button className="w-full btn-secondary">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Appointments and History */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-teal-600" />
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium">{appointment.type}</div>
                    <div className="text-gray-600 text-sm">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-teal-600" />
                    <span className="text-sm font-medium">
                      {appointment.status === 'upcoming' ? 'Join Session' : appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Session History</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="font-medium">Video Session</div>
                <div className="text-gray-600 text-sm">March 10, 2024 at 3:00 PM</div>
                <div className="mt-2 text-sm text-gray-500">
                  Duration: 50 minutes
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="font-medium">Chat Session</div>
                <div className="text-gray-600 text-sm">March 5, 2024 at 2:30 PM</div>
                <div className="mt-2 text-sm text-gray-500">
                  Duration: 30 minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healer;