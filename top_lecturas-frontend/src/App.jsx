import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { UserContextProvider } from './userContext';

function App() {
    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    );
}

export default App
