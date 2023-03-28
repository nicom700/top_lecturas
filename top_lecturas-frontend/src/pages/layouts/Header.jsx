import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import Dropdown from 'src/components/Dropdown';
import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';

export function Header() {
    return (
        <header className="py-4 px-8 border-b bg-white shadow-md">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
                <div className="flex min-w-fit w-64 justify-start">
                    <Link
                        to={'/'}
                        className="flex items-center gap-2 text-primary hover:text-primaryHover transition-all"
                    >
                        <Logo className={'w-16 h-16'} />
                        <span className="text-2xl font-bold mx-3 max-lg:hidden">
                            Top Lecturas
                        </span>
                    </Link>
                </div>
                <div className="flex grow">
                    <div className="flex items-center gap-2 mx-auto w-max max-sm:hidden">
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/start'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white"
                            >
                                <Icon icon="playIcon" />
                                <span>Jugar</span>
                            </Link>
                        </div>
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white"
                            >
                                <Icon icon="rankingIcon" />
                                <span>Top jugadores</span>
                            </Link>
                        </div>
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white"
                            >
                                <Icon icon="aboutIcon" />
                                <span>Nosotros</span>
                            </Link>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <Menu
                            as="div"
                            className="inline-block text-left"
                        >
                            <Menu.Button className="w-12 h-12 relative flex items-center overflow-hidden justify-center gap-2 border border-gray-300 rounded-xl py-2 px-2 hover:shadow-md focus:shadow-md transition-shadow shadow-gray-300">
                                <Icon icon="barsIcon" />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-1/2 transform -translate-x-1/2 w-60 flex flex-col z-10 rounded-xl shadow-md mt-2 py-4 bg-white border border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={'/start'}
                                                className={`${
                                                    active
                                                        ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                                        : 'text-gray-700'
                                                } flex items-center px-4 py-2 transition-all`}
                                            >
                                                <Icon icon="playIcon" />
                                                <span>Jugar</span>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={'/'}
                                                className={`${
                                                    active
                                                        ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                                        : 'text-gray-700'
                                                } flex items-center px-4 py-2 transition-all`}
                                            >
                                                <Icon icon="rankingIcon" />
                                                <span>Top jugadores</span>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={'/'}
                                                className={`${
                                                    active
                                                        ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                                        : 'text-gray-700'
                                                } flex items-center px-4 py-2 transition-all`}
                                            >
                                                <Icon icon="aboutIcon" />
                                                <span>Nosotros</span>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <div className="flex min-w-fit w-64 justify-end">
                    <Dropdown />
                </div>
            </div>
        </header>
    );
}
