import AuthRoute from '@/components/AuthRoute';
import GeekLayout from '@/pages/Layout';
import Login from '@/pages/Login';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Publish = lazy(() => import('@/pages/Publish'));
const Article = lazy(() => import('@/pages/Article'));
const Home = lazy(() => import('@/pages/Home'));
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <GeekLayout></GeekLayout>
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: 'publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
