import type { ReactNode } from 'react';

import Footer from './Footer';

interface LayoutProps {
  subtitle: string;
  children: ReactNode;
}

export default function Layout({ subtitle, children }: LayoutProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">⚡ Pokédex</h1>
      <p className="text-gray-500 text-center mt-1">{subtitle}</p>
      {children}
      <Footer />
    </div>
  );
}
