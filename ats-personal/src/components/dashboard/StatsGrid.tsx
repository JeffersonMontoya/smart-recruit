import React from 'react';
import { Briefcase, Users, TrendingUp, FileText } from 'lucide-react';
import { Card } from '../ui/Card';

export const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard 
                label="Vacantes Activas" 
                value="12" 
                icon={<Briefcase size={20} />} 
                color="blue"
                trend="+2 this week" 
            />
            <StatCard 
                label="En Entrevista" 
                value="28" 
                icon={<Users size={20} />} 
                color="purple"
                trend="4 today"
            />
            <StatCard 
                label="Hiring Rate" 
                value="18%" 
                icon={<TrendingUp size={20} />} 
                color="green"
                trend="+1.2%"
            />
            <StatCard 
                label="Nuevas Apps" 
                value="45" 
                icon={<FileText size={20} />} 
                color="orange"
                trend="12 since yesterday"
            />
        </div>
    );
};

const StatCard = ({ label, value, icon, color, trend }: { label: string, value: string, icon: React.ReactNode, color: string, trend: string }) => {
    // Map colors to classes roughly
    const colors: any = {
        blue: 'text-blue-400 bg-blue-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        green: 'text-green-400 bg-green-500/10',
        orange: 'text-orange-400 bg-orange-500/10',
    };

    return (
        <Card className="flex flex-col justify-between group cursor-pointer hover:bg-zinc-900/40">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${colors[color]}`}>
                    {icon}
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                    {trend}
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
                <p className="text-sm text-zinc-500 font-medium">{label}</p>
            </div>
        </Card>
    );
}
