import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import { Tab } from '@headlessui/react';
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
        <div className="my-8 max-md:px-2 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around bg-white p-6 shadow-md rounded-xl">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 border border-gray-300 rounded-full bg-slate-100 p-2 w-64 m-auto">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-l-3xl rounded-r-lg py-2.5 text-sm font-medium leading-5 text-gray-700  transition-all',
                                    'hover:bg-primaryHover hover:text-white active:bg-primaryActive active:text-white',
                                    selected
                                        ? 'bg-primary text-white shadow'
                                        : 'text-gray-400'
                                )
                            }
                        >
                            Perfil
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-r-3xl rounded-l-lg py-2.5 text-sm font-medium leading-5 text-gray-700  transition-all',
                                    'hover:bg-primaryHover hover:text-white active:bg-primaryActive active:text-white',
                                    selected
                                        ? 'bg-primary text-white shadow'
                                        : 'text-gray-400'
                                )
                            }
                        >
                            Avatar
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ProfileForm />
                        </Tab.Panel>
                        <Tab.Panel>
                            <AvatarForm />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}
