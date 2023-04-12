import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Avatar } from 'avataaars';

export default function TableRanking({ ranking }) {
    const [avatarComponent, setAvatarComponent] = useState(null);

    useEffect(() => {
        // if (!ranking) return;
        // //if (!ranking || (ranking.user.hasOwnProperty('avatar') && ranking.user.avatar === undefined)) return setAvatarComponent(null);
        // setAvatarComponent(
        //     <Avatar
        //         style={{ width: '48px', height: '48px' }}
        //         avatarStyle="Circle"
        //         {...ranking.user.avatar}
        //     />
        // );
    }, []);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full my-8 max-md:px-2 px-8 shadow-md">
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-gray-700 px-4 py-2 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                            <span>Nombre de usuario</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-2 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                            <span>Puesto</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-2 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                            <span>Mejor racha</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-2 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                            <span>Puntos totales</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ranking && ranking.map( (item, index) => (
                        <tr key={item._id}>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                                {/* <Avatar
                                    style={{ width: '48px', height: '48px' }}
                                    avatarStyle="Circle"
                                    {...item.user.avatar}
                                /> */}
                                {/* <Avatar
                                    style={{ width: '48px', height: '48px' }}
                                    avatarStyle="Circle"
                                    {...item.user.avatar}
                                /> */}
                                {/* {avatarComponent ? avatarComponent : <Loading />} */}
                                {item.user.name}
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                                {index + 1}
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                                {item.total_win_streaks}
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600">
                                {item.total_points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
