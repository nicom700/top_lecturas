import Avatar from 'avataaars';

export default function TableRanking({ ranking }) {
    return (
        <div className="w-full mt-10 overflow-x-auto shadow-md">
            <table className="w-full table-auto max-md:px-2 px-8">
                <caption className="caption-top text-gray-700 dark:text-gray-300 mb-4">
                    Top 10: mejores jugadores
                </caption>
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-gray-700 px-4 py-4 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-700">
                            <span>Nombre de usuario</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-4 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-700">
                            <span>Puesto</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-4 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-700">
                            <span>Mejor racha</span>
                        </th>
                        <th className="border border-gray-300 text-gray-700 px-4 py-4 bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-700">
                            <span>Puntos totales</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ranking && ranking.map( (item, index) => (
                        <tr key={item._id}>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 font-bold text-start bg-white dark:bg-bgMenuDark dark:text-gray-300 dark:border-zinc-700">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        style={{ width: '48px', height: '48px' }}
                                        avatarStyle="Circle"
                                        {...item.user.avatar}
                                    />
                                    {item.user.name}
                                </div>
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgMenuDark dark:text-gray-300 dark:border-zinc-700">
                                {index + 1}
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 font-bold text-center bg-white dark:bg-bgMenuDark dark:text-gray-300 dark:border-zinc-700">
                                {item.total_win_streaks}
                            </td>
                            <td className="border border-gray-300 text-gray-700 px-4 py-2 text-center bg-white dark:bg-bgMenuDark dark:text-gray-300 dark:border-zinc-700">
                                {item.total_points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
