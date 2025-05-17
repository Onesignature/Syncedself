import React from 'react';
import { Heart, Calendar, Clock, Star, Video, MessageSquare, Award, Shield, Check, ArrowRight } from 'lucide-react';
import { useSyncedToken } from '../hooks/useSyncedToken';
import { useWallet } from '@solana/wallet-adapter-react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  cost: number;
  status: 'upcoming' | 'completed' | 'cancelled',
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    type: "Video Session",
    cost: 50,
    status: "upcoming",
    notes: "Weekly check-in and progress review"
  },
  {
    id: 2,
    date: "2024-03-15",
    time: "2:30 PM",
    type: "Chat Session",
    cost: 30,
    status: "completed",
    notes: "Discussed stress management techniques"
  }
];

const Healer: React.FC = () => {
  const { balance } = useSyncedToken();
  const { connected } = useWallet();

  return (
    <div className="container-custom py-8 animate-fadeIn">
      <div className="flex items-center mb-8">
        <Heart className="h-6 w-6 mr-2 text-teal-600" />
        <h1 className="text-2xl font-bold">My Healer</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Healer Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-8 text-white text-center">
              <img
                src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Dr. Emily Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h2 className="text-2xl font-bold mb-1">Dr. Emily Chen</h2>
              <p className="text-white/90 mb-3">Clinical Psychologist</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9</span>
                </div>
                <span className="text-white/80">|</span>
                <span>128 reviews</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-medium">10+ Years</div>
                  <div className="text-sm text-gray-500">Experience</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium">Certified</div>
                  <div className="text-sm text-gray-500">Therapist</div>
                </div>
              </div>
              
              <button className="w-full btn-primary flex items-center justify-center mb-3 transform hover:scale-105 transition-transform">
                <Video className="h-5 w-5 mr-2" />
                Schedule Session
              </button>
              <button className="w-full btn-secondary transform hover:scale-105 transition-transform">
                <MessageSquare className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Appointments and History */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-teal-600" />
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="p-4 border border-gray-100 rounded-lg hover:border-teal-500 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {appointment.type === "Video Session" ? (
                        <Video className="h-5 w-5 text-teal-600 mr-2" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-teal-600 mr-2" />
                      )}
                      <span className="font-medium">{appointment.type}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'upcoming' 
                        ? 'bg-teal-100 text-teal-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    <span className="mx-2">·</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{appointment.time}</span>
                    <span className="mx-2">·</span>
                    <span>{appointment.cost} $SYNCED</span>
                  </div>
                  {appointment.notes && (
                    <p className="text-gray-600 text-sm mb-3">{appointment.notes}</p>
                  )}
                  {appointment.status === 'upcoming' && (
                    <div>
                      {connected && balance >= appointment.cost ? (
                        <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center">
                          <Video className="h-4 w-4 mr-2" />
                          Join Session
                        </button>
                      ) : (
                        <div className="text-center text-red-500 text-sm">
                          Insufficient $SYNCED balance
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Session History</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-lg hover:border-teal-500 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-teal-600 mr-2" />
                    <span className="font-medium">Video Session</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg hover:border-teal-500 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-teal-600 mr-2" />
                    <span className="font-medium">Chat Session</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>March 5, 2024</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>30 minutes</span>
                </div>
                <button className="text-teal-600 text-sm hover:text-teal-700 transition-colors flex items-center">
                  View Chat History
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healer;