import { Link } from 'react-router-dom';
import Dropdown from 'src/components/Dropdown';
import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import { userContext } from 'src/userContext';

export function Header() {
    const { user, setUser, ready } = userContext();

    return (
        <header className="py-4 px-8 border-b bg-white shadow-md">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
                <div className="flex min-w-fit w-64 justify-start">
                    <Link
                        to={'/'}
                        className="flex items-center gap-2 text-primary hover:text-primaryHover transition-all"
                    >
                        <Logo className={'w-16 h-16'} />
                        <span className="text-2xl font-bold mx-3">
                            Top Lecturas
                        </span>
                    </Link>
                </div>
                <div className="flex grow max-lg:hidden">
                    <div className="flex items-center gap-2 mx-auto w-max">
                        <div className="mx-2 font-bold">
                            <Link
                                to={'/start'}
                                className="flex items-center p-3 px-6 rounded-xl transition-all hover:bg-primaryHover text-gray-700 hover:text-white"
                            >
                                <Icon icon="playIcon" />
                                <span>Jugar</span>
                            </Link>
                        </div>
                        <div className="mx-2 font-bold">
                            <Link
                                to={'/'}
                                className="flex items-center p-3 px-6 rounded-xl transition-all hover:bg-primaryHover text-gray-700 hover:text-white"
                            >
                                <Icon icon="rankingIcon" />
                                <span>Top jugadores</span>
                            </Link>
                        </div>
                        <div className="mx-2 font-bold">
                            <Link
                                to={'/'}
                                className="flex items-center p-3 px-6 rounded-xl transition-all hover:bg-primaryHover text-gray-700 hover:text-white"
                            >
                                <Icon icon="aboutIcon" />
                                <span>Nosotros</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex min-w-fit w-64 justify-end">
                    <Dropdown />
                </div>
            </div>
        </header>
    );
}
