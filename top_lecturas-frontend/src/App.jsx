import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { UserContextProvider } from './context/UserContext';

function App() {
    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    );
}

export default App
