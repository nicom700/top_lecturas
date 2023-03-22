import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthService from 'src/services/auth';
import { userContext } from 'src/userContext';
import Icon from './Icon';
import Loading from './Loading';

export default function Dropdown() {
    const { user, setUser, ready } = userContext();

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
                className="flex items-center gap-2 w-max border border-gray-300 rounded-full py-2 px-2 hover:shadow-md transition-shadow shadow-gray-300"
            >
                <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <Icon icon="profileIcon" />
                </div>
                <div className="px-2 max-sm:hidden font-semibold text-gray-700 flex items-center gap-x-2">
                    Iniciar sesión
                </div>
            </Link>
        );
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center justify-center gap-2 w-max border border-gray-300 rounded-full py-2 px-2 hover:shadow-md focus:shadow-md transition-shadow shadow-gray-300 ">
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                        <Icon icon="profileIcon" />
                    </div>
                    <div className="px-2 max-sm:hidden font-semibold text-gray-700 flex items-center gap-x-2">
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
                    <Menu.Items className="flex flex-col z-10 rounded-xl shadow-md absolute right-0 origin-top-right w-60 mt-2 py-4 bg-white border border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={'/profile'}
                                    className={`${
                                        active
                                            ? 'bg-primaryHover text-white'
                                            : 'text-gray-700'
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
                                            ? 'bg-primaryHover text-white'
                                            : 'text-gray-700'
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
