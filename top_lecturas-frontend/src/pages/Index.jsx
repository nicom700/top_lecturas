import { Link } from 'react-router-dom';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import { userContext } from 'src/userContext';

export default function Index() {
    const { user, ready } = userContext();

    if (!ready) {
        return <Loading />;
    }

    return (
        <div className="my-12 grow flex items-center justify-around bg-[url('/src/assets/logo.svg')] bg-no-repeat bg-center ">
            <div className="max-w-sm mb-12 text-gray-700">
                <TitleH1 text="Top Lecturas" />
                <p className="my-5">Pagina de inicio</p>
                {user && (
                    <div className="my-5 flex gap-1">
                        <Link
                            to={'/dashboard'}
                            className="bg-red-400 text-white p-2 hover:bg-red-600"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to={'/profile'}
                            className="bg-red-400 text-white p-2 hover:bg-red-600"
                        >
                            Mi perfil
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
