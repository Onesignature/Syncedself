import React from 'react';
import PlatformHeader from '../components/PlatformHeader';
import { Outlet } from 'react-router-dom';

const Platform: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PlatformHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Platform;