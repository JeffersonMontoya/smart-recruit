
import MainLayout from './components/layout/MainLayout';
import { ProfileCard } from './components/dashboard/ProfileCard';
import { StatsGrid } from './components/dashboard/StatsGrid';

const App = () => { 
  return (
    <MainLayout>
       <div className="animate-fade-in space-y-8">
          <section className="space-y-6">
             <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Dashboard General</h1>
                  <p className="text-zinc-500">Bienvenido de vuelta, aquí está lo que sucede hoy.</p>
                </div>
                <span className="text-xs font-mono text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-900">v1.0.0-beta</span>
             </div>

             <ProfileCard />
             <StatsGrid />
          </section>
       </div>
    </MainLayout>
  );
};

export default App;
