import { Link } from 'react-router-dom';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import { useUserContext } from 'src/context/UserContext';


export default function Index() {
    const { user, ready } = useUserContext();

    if (!ready) {
        return <Loading />;
    }

    return (
        <div className="my-12 grow flex items-center justify-around bg-no-repeat bg-center ">
            <div className="max-w-sm mb-12 text-gray-700">
                <h1 className='text-5xl text-gray-700 dark:text-gray-300 font-bold text-center mt-4 mb-8'>¿Sabes cuál tiene más visitas?</h1>
                <TitleH1 text="Top Lecturas" />
                {user && (
                    <div className="my-5 flex gap-1 justify-center">
                        <Link
                            to={'/dashboard'}
                            className="bg-primaryHover text-white p-2 hover:bg-primaryActive rounded-xl border px-4 py-2"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to={'/profile'}
                            className="bg-primaryHover text-white p-2 hover:bg-primaryActive rounded-xl border px-4 py-2"
                        >
                            Mi perfil
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
