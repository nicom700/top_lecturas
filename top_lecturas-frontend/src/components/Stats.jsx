import Icon from 'src/components/Icon';

export default function Stats({ lastWinStreak, totalWinStreaks, totalPoints }) {
    return (
        <div className="max-w-3xl w-full flex gap-4 max-sm:gap-4 justify-center items-stretch max-sm:flex-col my-4 text-gray-700 dark:text-gray-300 ">
            <div className="max-sm:w-full max-sm:flex-row w-48 max-h-48 flex flex-col items-center justify-center gap-2 bg-white dark:bg-bgItemDark p-6 max-sm:py-2 max-sm:px-4 shadow-md rounded-xl">
                <div className="max-sm:w-1/2 text-2xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                    {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(lastWinStreak)}
                </div>
                <div className="max-sm:w-1/2 flex flex-col max-sm:flex-row items-center gap-4 font-bold text-center text-gray-700 dark:text-gray-300">
                    <div className="max-sm:justify-start">
                        <Icon icon="arrowUpIcon" />
                    </div>
                    <div className="max-sm:justify-end">Racha actual</div>
                </div>
            </div>
            <div className="max-sm:w-full max-sm:flex-row w-48 max-h-48 flex flex-col items-center justify-center gap-2 bg-white dark:bg-bgItemDark p-6 max-sm:py-2 max-sm:px-4 shadow-md rounded-xl">
                <div className="max-sm:w-1/2 text-2xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                    {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(totalWinStreaks)}
                </div>
                <div className="max-sm:w-1/2 flex flex-col max-sm:flex-row items-center gap-4 font-bold text-center text-gray-700 dark:text-gray-300">
                    <div className="max-sm:justify-start">
                        <Icon icon="crownIcon" />
                    </div>
                    <div className="max-sm:justify-end">Tu mejor racha</div>
                </div>
            </div>
            <div className="max-sm:w-full max-sm:flex-row w-48 max-h-48 flex flex-col items-center justify-center gap-2 bg-white dark:bg-bgItemDark p-6 max-sm:py-2 max-sm:px-4 shadow-md rounded-xl">
                <div className="max-sm:w-1/2 text-2xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                    {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(totalPoints)}
                </div>
                <div className="max-sm:w-1/2 flex flex-col max-sm:flex-row items-center gap-4 font-bold text-center text-gray-700 dark:text-gray-300">
                    <div className="max-sm:justify-start">
                        <Icon icon="coinIcon" />
                    </div>
                    <div className="max-sm:justify-end">Puntos totales</div>
                </div>
            </div>
        </div>
    );
}
