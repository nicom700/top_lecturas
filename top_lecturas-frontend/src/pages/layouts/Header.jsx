import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import Dropdown from 'src/components/Dropdown';
import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import DarkMode from './DarkMode';
import useDarkMode from 'src/hooks/useDarkMode';

export function Header() {
    const [colorTheme, setTheme] = useDarkMode();

    return (
        <header className="backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 dark:bg-opacity-80 border border-white/80 dark:border-zinc-800/80 text-white py-4 px-8 max-lg:px-4 bg-white dark:bg-zinc-800 dark:border-b-zinc-900 shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center mx-auto max-w-7xl max-md:gap-2">
                <div className="flex min-w-fit w-64 justify-start">
                    <Link
                        to={'/'}
                        className="flex items-center gap-2 text-primary hover:text-primaryHover transition-all dark:text-primaryDark dark:hover:text-primaryHoverDark"
                    >
                        <Logo className={'w-16 h-16'} />
                        <span className="text-2xl font-bold mx-3 max-lg:hidden ">
                            Top Lecturas
                        </span>
                    </Link>
                </div>
                <div className="flex grow justify-center">
                    <div className="flex items-center gap-2 mx-auto w-max max-md:hidden">
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/start'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
                            >
                                <Icon icon="playIcon" />
                                <span>Jugar</span>
                            </Link>
                        </div>
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/ranking'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
                            >
                                <Icon icon="rankingIcon" />
                                <span>Top jugadores</span>
                            </Link>
                        </div>
                        <div className="mx-2 max-lg:mx-0 font-bold">
                            <Link
                                to={'/us'}
                                className="flex items-center p-3 px-6 max-lg:px-3 rounded-xl transition-all hover:bg-primaryHover active:bg-primaryActive active:text-white text-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
                            >
                                <Icon icon="aboutIcon" />
                                <span>Nosotros</span>
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Menu
                            as="div"
                            className="inline-block text-left"
                        >
                            <Menu.Button className="w-12 h-12 relative flex items-center overflow-hidden justify-center gap-2 border border-gray-300 dark:border-transparent text-gray-700 dark:text-gray-300 dark:bg-bgItemDark dark:hover:bg-zinc-700 rounded-xl py-2 px-2 hover:shadow-md focus:shadow-md transition-shadow shadow-gray-300 dark:shadow-md">
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
                                <Menu.Items className="absolute left-1/2 transform -translate-x-1/2 w-60 flex flex-col z-10 rounded-xl shadow-md mt-2 py-4 bg-white dark:bg-bgMenuDark border border-gray-300 dark:border-transparent ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <div className="mb-4">
                                            <DarkMode />
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={'/start'}
                                                className={`${
                                                    active
                                                        ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                                        : 'text-gray-700 dark:text-gray-300'
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
                                                        : 'text-gray-700 dark:text-gray-300'
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
                                                to={'/us'}
                                                className={`${
                                                    active
                                                        ? 'bg-primaryHover text-white active:bg-primaryActive active:text-white'
                                                        : 'text-gray-700 dark:text-gray-300'
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
                <div className="flex min-w-fit w-64 justify-end gap-2">
                    <div className="flex items-center justify-center max-md:hidden">
                        <DarkMode />
                    </div>
                    <Dropdown />
                </div>
            </div>
        </header>
    );
}
