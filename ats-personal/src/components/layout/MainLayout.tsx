import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {


  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-cyan-500/20 selection:text-cyan-200 flex">
      <Sidebar />
      <main className="flex-1 md:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header />
        
        <div className="flex-1 w-full p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
