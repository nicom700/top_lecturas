import { useEffect, useState } from 'react';
import MedalGold from 'src/components/MedalGold';
import MedalSilver from 'src/components/MedalSilver';
import MedalBronze from 'src/components/MedalBronze';
import Icon from './Icon';
import Avatar from 'avataaars';
import Loading from './Loading';

export default function Card({place, ranking, avatar, className}) {

    const [isLoading, setIsLoading] = useState(true);

    const images = {
        1: MedalGold,
        2: MedalSilver,
        3: MedalBronze,
    };

    const Image = images[place];

    useEffect(() => {
        if(!avatar) return;
        setIsLoading(false);
    }, [avatar]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={`${place === '1' ? 'w-1/3 min-h-[420px] max-h-[570px]' : 'w-1/4 grow min-h-[380px] max-h-[520px]'} flex flex-col items-center justify-center max-lg:w-full p-6 shadow-xl bg-white dark:bg-zinc-800 dark:text-gray-300 rounded-xl ${className}`}>
            <div className="w-full grow flex flex-col items-center">
                <h1 className="flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                    {place} ° Puesto
                </h1>
                <div className={`${place === '1' ? 'w-44 h-44' : 'w-32 h-32'} flex items-center justify-center m-4 relative`}>
                    <div className={`${place === '1' ? 'w-20 h-20 top-5' : 'w-14 h-14 top-4'} absolute`}>
                        <Avatar
                            style={{ width: '100%', height: '100%' }}
                            avatarStyle="Circle"
                            {...avatar}
                        />
                    </div>
                    <Image />
                </div>
                <div className="w-full max-h-32 overflow-y-auto break-words">
                    <h2 className={`${place === '1' ? 'text-5xl' : 'text-3xl'} items-center my-4 mx-auto font-bold text-center text-gray-700 dark:text-gray-300`}>
                        {ranking.user.name}
                    </h2>
                </div>
            </div>
            <div className="w-full flex gap-4 mt-4">
                <div className="w-1/2 flex flex-col items-center gap-1 font-bold text-sm text-center text-white bg-primary dark:bg-primaryDark rounded-xl p-4 overflow-hidden">
                    <div className="w-full text-xl max-h-20 overflow-y-auto break-words">
                        {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(ranking.total_win_streaks)}
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="">
                            <Icon icon="crownIcon" />
                        </div>
                        <div className="">Mejor racha</div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-1 font-bold text-sm text-center text-white bg-primary dark:bg-primaryDark rounded-xl p-4 overflow-hidden">
                    <div className="w-full text-xl max-h-20 overflow-y-auto break-words">
                        {new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(ranking.total_points)}
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="">
                            <Icon icon="coinIcon" />
                        </div>
                        <div className="">Puntos totales</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
