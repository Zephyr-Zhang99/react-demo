import AuthRoute from '@/components/AuthRoute';
import Article from '@/pages/Article';
import Home from '@/pages/Home';
import GeekLayout from '@/pages/Layout';
import Login from '@/pages/Login';
import Publish from '@/pages/Publish';
import { createBrowserRouter } from 'react-router-dom';

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
        element: <Home></Home>,
      },
      {
        path: 'article',
        element: <Article></Article>,
      },
      {
        path: 'publish',
        element: <Publish></Publish>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
