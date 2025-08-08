import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Loading from 'src/components/Loading';
import AvatarForm from 'src/components/forms/avatar/AvatarForm';
import ProfileForm from 'src/components/forms/avatar/ProfileForm';

export default function Profile() {
    const { user, ready } = useUserContext();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    if (!ready) {
        return <Loading />;
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className="my-8 max-md:px-6 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                <TabGroup className="flex flex-col gap-4">
                    <TabList className="flex space-x-1 border border-gray-300 dark:border-transparent rounded-full text-gray-700 dark:text-white bg-slate-100 dark:bg-bgDarkSecondary p-2 w-64 max-sm:w-52 m-auto">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-l-3xl rounded-r-lg py-2.5 text-sm font-semibold leading-5 transition-all',
                                    'hover:text-white hover:bg-primaryHover active:bg-primaryActive dark:hover:bg-DarkBtnHover dark:active:bg-DarkBtnActive',
                                    selected
                                        ? 'text-white bg-primary dark:bg-DarkBtn shadow'
                                        : ''
                                )
                            }
                        >
                            Perfil
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-r-3xl rounded-l-lg py-2.5 text-sm font-semibold leading-5 transition-all',
                                    'hover:text-white hover:bg-primaryHover active:bg-primaryActive dark:hover:bg-DarkBtnHover dark:active:bg-DarkBtnActive',
                                    selected
                                        ? 'text-white bg-primary dark:bg-DarkBtn shadow'
                                        : ''
                                )
                            }
                        >
                            Avatar
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ProfileForm />
                        </TabPanel>
                        <TabPanel>
                            <AvatarForm />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}
