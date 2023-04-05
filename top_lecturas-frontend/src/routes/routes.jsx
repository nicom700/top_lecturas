import { createBrowserRouter } from 'react-router-dom';
import Layout from 'src/pages/layouts/Layout';
import Index from 'src/pages/Index';
import Login from 'src/pages/auth/Login';
import Register from 'src/pages/auth/Register';
import Profile from 'src/pages/profile/Profile';
import Dashboard from 'src/pages/Dashboard';
import Start from 'src/pages/game/Start';
import Ranking from 'src/pages/Ranking';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Index />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/start',
                element: <Start />,
            },
            {
                path: '/ranking',
                element: <Ranking />
            }
            
        ],
    },
]);
