import React from 'react';
import { User, MapPin, Mail, MoreHorizontal, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';


import { useAuth } from '../../context/AuthContext';

export const ProfileCard = () => {
  const { user } = useAuth();
  
  return (
    <Card className="relative overflow-hidden group" noPadding>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
         <User size={200} />
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-8 items-start relative z-10">
         {/* Profile Photo with Gradient Ring */}
         <div className="shrink-0 relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-600 p-1 shadow-2xl shadow-cyan-900/20">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center border-4 border-zinc-950 overflow-hidden">
                    <User className="w-12 h-12 text-zinc-400" />
                </div>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-zinc-950 rounded-full"></div>
         </div>

         {/* Content Info */}
         <div className="flex-1 w-full space-y-6">
            <div className="flex justify-between items-start">
                <div>
                   <h2 className="text-3xl font-bold text-white tracking-tight">{user?.nombre}</h2>
                   <p className="text-cyan-400 font-medium capitalize">{user?.rol || 'Rol no definido'}</p>
                </div>
                <button className="p-2 text-zinc-600 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">
                    <MoreHorizontal />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InfoItem icon={<Mail size={16} />} label="Email" value={user?.email || ''} />
               <InfoItem icon={<MapPin size={16} />} label="Base" value="Mexico City (Remote)" />
            </div>

            <div className="pt-4 border-t border-zinc-900">
               <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-zinc-500" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Actividad Semanal</span>
               </div>
               <div className="flex gap-2">
                  <ActivityDay day="L" active />
                  <ActivityDay day="M" active />
                  <ActivityDay day="X" active opacity="opacity-50" />
                  <ActivityDay day="J" />
                  <ActivityDay day="V" />
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-3 text-sm">
        <div className="p-2 rounded-lg bg-zinc-900 text-zinc-500">
           {icon}
        </div>
        <div>
           <p className="text-zinc-500 text-xs">{label}</p>
           <p className="text-zinc-300 font-medium">{value}</p>
        </div>
    </div>
);

const ActivityDay = ({ day, active, opacity = '' }: { day: string, active?: boolean, opacity?: string }) => (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${active ? `bg-cyan-500 text-black ${opacity}` : 'bg-zinc-900 text-zinc-600'}`}>
       {day}
    </div>
);
