import Loading from 'src/components/Loading';
import { useUserContext } from 'src/context/UserContext';
import Dashboard from './Dashboard';

export default function Index() {
    const { user, ready } = useUserContext();

    if (!ready) {
        return <Loading />;
    }

    return (
        <div className="my-8 max-md:px-6 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around">
                {user && <Dashboard />}
                <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                    <p className="">
                        ¡Bienvenido a Top Lecturas! El juego donde pondrás a
                        prueba tus conocimientos sobre la popularidad de los
                        artículos de Wikipedia.
                    </p>
                    <p className="mt-2">¿Estás listo para convertirte en el mejor jugador de Top Lecturas? ¡Comienza a jugar ahora!</p>
                </div>
                <div className="flex max-sm:flex-col gap-6 items-stretch">
                    <div className="w-1/2 max-sm:w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                        <h2 className="text-lg font-bold my-2">Reglas</h2>
                        <ul className="list-disc ml-6">
                            <li>Cada ronda cuenta con dos opciones de artículos.</li>
                            <li>Debes elegir el que crees que ha recibido más visitas en los últimos 30 días.</li>
                            <li>Si aciertas, acumularás puntos y avanzarás a la siguiente ronda.</li>
                            <li>Si fallas, perderás todos tus puntos y tendrás que empezar de nuevo.</li>
                        </ul>
                    </div>
                    <div className="w-1/2 max-sm:w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                        <h2 className="text-lg font-bold my-2">Puntuaciones</h2>
                        <ul className="list-disc ml-6">
                            <li><span className="font-semibold">Racha actual:</span> Muestra la cantidad de aciertos consecutivos que tienes en la partida actual.</li>
                            <li><span className="font-semibold">Tu mejor racha:</span> Es tu record, indica la cantidad máxima de aciertos consecutivos en una única partida, sin perder, y es el puntaje más importante para tu posición en el ranking de jugadores.</li>
                            <li><span className="font-semibold">Puntos totales:</span> Es la suma de todos tus aciertos, incluyendo partidas anteriores.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
