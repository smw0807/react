import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
