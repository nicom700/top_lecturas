import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from 'src/userContext.jsx';
import AuthService from 'src/services/auth';
import Loading from 'src/components/Loading';
import Button from 'src/components/forms/Button';

export default function Profile() {
    const { user, setUser, ready } = userContext();
    const [redirect, setRedirect] = useState(null);

    async function logoutHandler() {
        AuthService.logout();
        setUser(null);
        setRedirect('/');
    }

    if (!ready) {
        return <Loading />;
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="my-12 grow flex flex-col items-center">
            <div className="max-w-md w-full bg-white p-6 shadow-md rounded-xl">
                <div className="mb-4">
                    <p>
                        <strong>Id:</strong> {user._id}
                    </p>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
                <Button
                    type="submit"
                    name="logout"
                    value="Cerrar sesión"
                    onClick={logoutHandler}
                />
            </div>
        </div>
    );
}
