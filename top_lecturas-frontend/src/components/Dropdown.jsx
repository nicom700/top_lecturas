import { Fragment, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { Menu, Transition } from '@headlessui/react';
import AuthService from 'src/services/auth';
import Avatar from 'avataaars';
import Icon from './Icon';
import Loading from './Loading';

export default function Dropdown() {
    const { user, setUser, ready } = useUserContext();
    const [values, setValues] = useState(null);
    const [avatarComponent, setAvatarComponent] = useState(null);

    useEffect(() => {
        if (!ready || !user) return
        if (!user.avatar) return;

        setTimeout(() => {
            setValues({
                avatar: user.avatar
            });
        }, 100);
    }, [ready]);

    useEffect(() => {
        if (!user) return;
        if (!ready || (user.hasOwnProperty('avatar') && user.avatar === undefined)) return setAvatarComponent(null);

        setTimeout(() => {
            setAvatarComponent(
                <Avatar
                    style={{ width: '48px', height: '48px' }}
                    avatarStyle="Circle"
                    {...user.avatar}
                />
            );
        }, 100);
    }, [user]);

    async function logoutHandler(e) {
        e.preventDefault();
        AuthService.logout();
        setUser(null);
        return <Navigate to={'/'} />;
    }

    if (!ready) {
        return <Loading />;
    }

    if (!user) {
        return (
            <Link
                to={'/login'}
                className="flex items-center overflow-hidden justify-center gap-2 w-max rounded-xl p-2 transition-all border border-gray-300 dark:border-transparent text-gray-700 dark:text-gray-300 dark:bg-bgItemDark dark:hover:bg-zinc-700 hover:shadow-md focus:shadow-md shadow-gray-300 dark:shadow-md"
            >
                <div className="bg-gray-500 dark:text-gray-300 rounded-full border border-gray-500 overflow-hidden">
                    <Icon icon="profileIcon" />
                </div>
                <div className="px-2 max-sm:hidden font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-x-2">
                    Iniciar sesión
                </div>
            </Link>
        );
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center overflow-hidden justify-center gap-2 w-max rounded-xl p-2 transition-all border border-gray-300 dark:border-transparent text-gray-700 dark:text-gray-300 dark:bg-bgItemDark dark:hover:bg-zinc-700 hover:shadow-md focus:shadow-md shadow-gray-300 dark:shadow-md">
                    {user ? (
                        <div className="w-12 h-12 overflow-hidden">
                            {avatarComponent ? avatarComponent : <Loading />}
                        </div>
                    ) : (
                        <div className="bg-gray-500 dark:text-gray-300 rounded-full border border-gray-500 overflow-hidden">
                            <Icon icon="profileIcon" />
                        </div>
                    )}
                    <div className="overflow-hidden px-2 max-xl:hidden font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-x-2">
                        <div>{user && user.name}</div>
                        <Icon icon="chevronDownIcon" />
                    </div>
                </Menu.Button>
            </div>
            {user && (
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 origin-top-right w-60 flex flex-col z-10 rounded-xl shadow-md mt-2 py-4 bg-white dark:bg-bgMenuDark border border-gray-300 dark:border-transparent ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={'/profile'}
                                    className={`${
                                        active
                                            ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                            : 'text-gray-700 dark:text-gray-300'
                                    } block px-4 py-2 transition-all`}
                                >
                                    Perfil
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={'/'}
                                    onClick={logoutHandler}
                                    className={`${
                                        active
                                            ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                            : 'text-gray-700 dark:text-gray-300'
                                    } block px-4 py-2 transition-all`}
                                >
                                    Cerrar sesión
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            )}
        </Menu>
    );
}
