import Avatar from 'avataaars';

export default function TableRanking({ ranking }) {
    return (
        <div className="w-full overflow-x-auto shadow-md rounded-t-xl">
            <table className="w-full table-auto max-md:px-2 px-8">
                <thead className="divide-y divide-primaryHover dark:divide-primary">
                    <tr className="divide-x divide-primaryHover dark:divide-primaryHoverDark bg-primary dark:bg-primaryDark">
                        <th className="text-white px-4 py-4">
                            <span>#</span>
                        </th>
                        <th className="text-white px-4 py-4">
                            <span>Nombre de usuario</span>
                        </th>
                        <th className="text-white px-4 py-4">
                            <span>Mejor racha</span>
                        </th>
                        <th className="text-white px-4 py-4">
                            <span>Puntos totales</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-zinc-700">
                    {ranking && ranking.map( (item, index) => (
                        <tr key={item._id} className="divide-x divide-gray-300 dark:divide-zinc-700">
                            <td className="text-gray-700 px-4 py-2 text-center bg-white dark:bg-zinc-800 dark:text-gray-300">
                                {index + 1}°
                            </td>
                            <td className="text-gray-700 px-4 py-2 font-bold text-start bg-white dark:bg-zinc-800 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        style={{ width: '48px', height: '48px' }}
                                        avatarStyle="Circle"
                                        {...item.user.avatar}
                                    />
                                    {item.user.name}
                                </div>
                            </td>
                            <td className="text-gray-700 px-4 py-2 font-bold text-center bg-white dark:bg-zinc-800 dark:text-gray-300">
                                {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(item.total_win_streaks)}
                            </td>
                            <td className="text-gray-700 px-4 py-2 text-center bg-white dark:bg-zinc-800 dark:text-gray-300">
                                {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(item.total_points)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
