import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
