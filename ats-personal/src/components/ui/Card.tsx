import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card = ({ children, className = '', noPadding = false }: CardProps) => {
  return (
    <div className={`bg-zinc-950 border border-zinc-900 rounded-3xl ${noPadding ? '' : 'p-6'} ${className} hover:border-zinc-800 transition-colors`}>
      {children}
    </div>
  );
};
