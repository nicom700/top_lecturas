import { createBrowserRouter } from 'react-router-dom';
import Layout from 'src/pages/layouts/Layout';
import NotFound from 'src/pages/NotFound';
import Index from 'src/pages/Index';
import Login from 'src/pages/auth/Login';
import Register from 'src/pages/auth/Register';
import Profile from 'src/pages/profile/Profile';
import Start from 'src/pages/game/Start';
import Ranking from 'src/pages/Ranking';
import Us from 'src/pages/Us'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
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
            },
            {
                path: '/us',
                element: <Us />,
            },
        ],
    },
]);
