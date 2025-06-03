import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-indigo-950">
      <div className="stars-container fixed top-0 left-0 w-full h-full pointer-events-none z-0"></div>
      <Header />
      <main className="flex-grow z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;