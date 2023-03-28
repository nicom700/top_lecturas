import { Link, Navigate } from 'react-router-dom';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import { useUserContext } from 'src/context/UserContext';

export default function Dashboard() {
    const { user, ready } = useUserContext();

    if (!ready) {
        return <Loading />;
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className="my-12 grow flex items-center justify-around">
            <div className="max-w-sm mb-12 text-gray-700">
                <TitleH1 text="Dashboard" />
                <p className="my-5">Bienvenido {user.name}</p>
            </div>
        </div>
    );
}
