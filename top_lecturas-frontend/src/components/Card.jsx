import MedalGold from 'src/components/MedalGold';
import MedalSilver from 'src/components/MedalSilver';
import MedalBronze from 'src/components/MedalBronze';
import Icon from './Icon';
import Loading from './Loading';

export default function Card({place, ranking,  className}) {

    const images = {
        1: MedalGold,
        2: MedalSilver,
        3: MedalBronze,
    };

    const Image = images[place];

    return (
        <div className={`${place === '1' ? 'w-1/3 min-h-[420px] max-h-[500px]' : 'w-1/4 min-h-[380px] max-h-[430px]'} flex flex-col items-center justify-center max-lg:w-full p-4 shadow-xl bg-white dark:bg-bgMenuDark dark:text-gray-300 border border-gray-300 dark:border-transparent rounded-xl ${className}`}>
            <div className="w-full grow flex flex-col items-center">
                <h1 className="flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                    {place} ° Puesto
                </h1>
                <div className={`${place === '1' ? 'w-24 h-24' : 'w-16 h-16'} flex items-center justify-center m-4`}>
                    <Image />
                </div>
                <div className="w-full break-words">
                    <h2 className={`${place === '1' ? 'text-5xl' : 'text-3xl'} items-center my-4 mx-auto font-bold text-center text-gray-700 dark:text-gray-300`}>
                        {ranking.user.name}
                    </h2>
                </div>
            </div>
            <div className="w-full flex gap-4 mt-4">
                <div className="w-1/2 flex flex-col items-center gap-1 font-bold text-sm text-center text-white bg-primary dark:bg-primaryHover rounded-xl p-4 overflow-hidden">
                    <div className="w-full break-words">
                        {ranking.total_points}
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="">
                            <Icon icon="coinIcon" />
                        </div>
                        <div className="">Puntos totales</div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center gap-1 font-bold text-sm text-center text-white bg-primary dark:bg-primaryHover rounded-xl p-4 overflow-hidden">
                    <div className="w-full break-words">
                        {ranking.total_win_streaks}
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="">
                            <Icon icon="crownIcon" />
                        </div>
                        <div className="">Mejor racha</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
