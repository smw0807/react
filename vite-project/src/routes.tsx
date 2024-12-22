import IndexPage from './pages';
import Signin from './pages/signin';

export const routes = [
  {
    path: '/',
    // element: <GlobalLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/signin', element: <Signin /> },
    ],
  },
];

export const pages = [
  { route: '/' },
  { route: '/signin' },
  // { route: "/products" },
  // { route: "/products/:id" },
];
