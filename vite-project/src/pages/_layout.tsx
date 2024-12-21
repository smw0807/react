import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <Suspense fallback={'loding....'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
