import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import DashboardService from 'src/services/dahboard';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Icon from 'src/components/Icon';

export default function Dashboard() {
    const { user, ready } = useUserContext();

    const [totalPoints, setTotalPoints] = useState(null);
    const [totalWinStreaks, setTotalWinStreaks] = useState(null);
    const [lastWinStreak, setLastWinStreak] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setIsLoading(true);
        DashboardService.getStats()
            .then((data) => {
                setTotalPoints(data.total_points);
                setTotalWinStreaks(data.total_win_streaks);
                setLastWinStreak(data.last_win_streak);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (!ready && isLoading) {
        return <Loading />;
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    if(error){
        return (
            <div className="my-12 grow flex flex-col items-center">
                <TitleH1 text="Algo salio mal 😖" />
                <p className="mb-4 text-2xl text-center text-gray-700 dark:text-gray-300">No se pudo cargar la puntuación</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex gap-4 justify-center items-stretch max-sm:flex-col">
                <div className="w-48 max-h-48 max-sm:w-full max-sm:h-48 flex flex-col justify-center gap-2 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                    <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                        {lastWinStreak !== null ? <>{new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(lastWinStreak)}</> : <Loading />}
                    </div>
                    <div className="flex flex-col items-center gap-2 font-bold text-center text-gray-700 dark:text-gray-300">
                        <Icon icon="arrowUpIcon" />
                        Racha actual
                    </div>
                </div>
                <div className="w-48 max-h-48 max-sm:w-full max-sm:h-48 flex flex-col justify-center gap-2 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                    <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                        {totalWinStreaks !== null ? <>{new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(totalWinStreaks)}</> : <Loading />}
                    </div>
                    <div className="flex flex-col items-center gap-2 font-bold text-center text-gray-700 dark:text-gray-300">
                        <Icon icon="crownIcon" />
                        Tu mejor racha
                    </div>
                </div>
                <div className="w-48 max-h-48 max-sm:w-full max-sm:h-48 flex flex-col justify-center gap-2 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                    <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 text-center py-2 overflow-y-auto break-words">
                        {totalPoints !== null ? <>{new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(totalPoints)}</> : <Loading />}
                    </div>
                    <div className="flex flex-col items-center gap-2 font-bold text-center text-gray-700 dark:text-gray-300">
                        <Icon icon="coinIcon" />
                        Puntos totales
                    </div>
                </div>
            </div>
        </>
    );
}
