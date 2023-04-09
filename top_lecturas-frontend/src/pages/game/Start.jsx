import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import GameService from 'src/services/game';
import Button from 'src/components/forms/Button';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Stats from 'src/components/Stats';
import Confetti from 'react-confetti'
import Icon from 'src/components/Icon';

export default function Start() {
    const { user, ready } = useUserContext();
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState();

    const [articles, setArticles] = useState(null);
    const [totalPoints, setTotalPoints] = useState();
    const [totalWinStreaks, setTotalWinStreaks] = useState();
    const [lastWinStreak, setLastWinStreak] = useState();
    const [results, setResults] = useState(null);
    const [win, setWin] = useState(null);

    useEffect(() => {
        if(!articles) startGame();
    }, [articles]);

    function startGame() {
        if (isLoading) return;

        setDisabledBtn(true);
        setIsLoading(true);

        GameService.getArticles()
            .then((data) => {
                setResults(null);
                setWin(null);

                const promises = Object.keys(data.options).map((key) => {
                    return orientation(data.options[key].url).then((result) => {
                        return {
                            key,
                            orientation: result,
                        }
                    });
                });

                Promise.all(promises)
                .then((results) => {
                    const updatedOptions = {};
                    results.forEach((result) => {
                        updatedOptions[result.key] = {
                            ...data.options[result.key],
                            orientation: result.orientation,
                        }
                    });
                    setArticles([updatedOptions[0], updatedOptions[1]]);
                })
                .catch((error) => {
                    console.error(error);
                });

                setTotalPoints(data.total_points);
                setTotalWinStreaks(data.total_win_streaks);
                setLastWinStreak(data.last_win_streak);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setStatus('');
                setDisabledBtn(false);
                setIsLoading(false);
            });
    }

    function handleArticleSubmit(e) {
        e.preventDefault();
        if (isLoading) return;

        setDisabledBtn(true);
        setIsLoading(true);

        GameService.sendOption({ article: e.target.textContent })
            .then((data) => {
                setResults(data.results);
                setWin(data.win);

                setTotalPoints(data.total_points);
                setTotalWinStreaks(data.total_win_streaks);
                setLastWinStreak(data.last_win_streak);

                if (data.gameOver){
                    setStatus(data.gameOver);
                    setDisabledBtn(false);
                }else{
                    setStatus(data.keepGoing);
                    setTimeout(() => {
                        setArticles(null);
                    }, 3000);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    async function handleStartGame(e) {
        e.preventDefault();
        setDisabledBtn(true);
        setArticles(null);
        setStatus('');
    }

    function orientation(urlImg){
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = urlImg;
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                if (width / height > 1) {
                    resolve('Horizontal');
                } else {
                    resolve('Vertical');
                }
            }
            img.onerror = () => {
                resolve('Empty');
                //reject(new Error('No se pudo cargar la imagen'));
            }
        });
    }

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
                <p className="mb-4 text-2xl text-center text-gray-700 dark:text-gray-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="my-4 max-md:px-2 px-8 w-full flex flex-col items-center justify-between gap-4 overflow-x-hidden">
            <div className="max-w-3xl w-full flex flex-col items-center grow">
                <div className="max-w-3xl w-full flex flex-col gap-4">
                    {status === 'keepGoing' ? (
                        <>
                            <Confetti
                                width={window.innerWidth}
                                height={window.innerHeight}
                                numberOfPieces={300}
                                tweenDuration={4000}
                                gravity={0.2}
                                recycle={false}
                            />
                            <TitleH1 text="Muy Bien, sigue asi 😁" />
                        </>
                    ): status === 'gameOver' ? (
                        <TitleH1 text="Juego terminado: Perdiste 😭" />
                    ):(
                        <TitleH1 text="¿Cuál tiene más visitas?" />
                    )}
                </div>
                <div className="max-w-3xl w-full gap-4 max-sm:gap-2 flex">
                    {articles ? articles.map((item) => (
                        <form key={item.id} className="w-2/4 flex flex-col gap-4 rounded-xl p-4 bg-white dark:bg-zinc-800 shadow-md mb-4" >
                            <div className={ 
                                status === 'gameOver' && win !== results[item.id].article ? 
                                    'blur-sm brightness-50 hue-rotate-15 saturate-200 transition-all mb-4'
                                    : status === 'keepGoing' && win !== results[item.id].article ? 
                                        'blur-sm brightness-50 hue-rotate-15 saturate-200 transition-all mb-4'
                                        : status === 'keepGoing' && win === results[item.id].article ? 
                                            'shadow-2xl transition-all scale-125 mb-4'
                                            : 'mb-4'
                            }>

                            
                            {item.orientation === 'Vertical' || item.orientation === 'Horizontal' ? (
                                <div className="relative overflow-hidden w-full max-sm:h-40 h-64 flex justify-center items-center bg-white border border-gray-300 dark:border-zinc-600">
                                    <div className="animate-spin absolute bg-gradient-to-r from-violet-700 to-fuchsia-500 w-[200%] h-[200%] opacity-100"></div>
                                    <div className="z-10 h-full flex flex-col justify-center items-center gap-2 p-2">
                                        <img src={item.url} className="object-contain w-full h-full m-auto" />
                                    </div>
                                </div>
                            ): (
                                <div className="relative overflow-hidden w-full max-sm:h-40 h-64 flex justify-center items-center bg-white border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300">
                                    <div className="animate-spin absolute bg-gradient-to-r from-violet-700 to-fuchsia-500 w-[200%] h-[200%]"></div>
                                    <div className="z-10 flex flex-col justify-center items-center gap-2 p-2 text-white">
                                        <Icon icon="emptyImageIcon" />
                                        <div className="font-bold text-center">Sin imágen</div>
                                    </div>
                                </div>
                            )}
                            </div>
                            <div className={ status === 'gameOver' && win !== results[item.id].article ? 'shake ease-in-out bg-red-500 rounded-md text-white grow flex': 'text-gray-700 dark:text-gray-300 grow flex'}>
                                {status !== 'gameOver' ? (
                                    <Button
                                        type="submit"
                                        name={item.id}
                                        value={item.article.replace(/_/g, ' ')}
                                        disabled={disabledBtn}
                                        spin={false}
                                        onClick={handleArticleSubmit}
                                    />
                                ): (
                                    <h2 className="font-semibold text-center p-2 m-auto">{item.article.replace(/_/g, ' ')}</h2>
                                )}
                            </div>
                            {results && (
                                <div className="m-auto h-full flex flex-col gap-1 justify-end items-end flex-1">
                                    <div className={ win === results[item.id].article ? 'bg-green-500 rounded-full': 'bg-red-500 rounded-full' }>
                                        <div className="py-1 px-4 overflow-y-auto break-words">
                                            <p className="text-base text-center text-white">{new Intl.NumberFormat('es-AR', { maximumSignificantDigits: 3 }).format(results[item.id].views)}</p>
                                        </div>                                    
                                    </div>
                                    <div className="m-auto justify-end items-end text-center text-gray-700 dark:text-gray-300">Vistas</div>
                                </div>
                            )}
                        </form>
                    )):(
                        <Loading />
                    )}
                </div>

                {status === 'gameOver' && (
                    <div className="max-w-3xl w-64">
                        <Button
                            type="submit"
                            name="jugar_de_nuevo"
                            value="Jugar de nuevo"
                            disabled={disabledBtn}
                            onClick={handleStartGame}
                        />
                    </div>
                )}
            </div>
            
            <div className="max-w-3xl w-full px-4 z-20 pt-4">
                {articles !== null && (
                    <Stats 
                        lastWinStreak={lastWinStreak}
                        totalWinStreaks={totalWinStreaks}
                        totalPoints={totalPoints}
                    />
                )}
            </div>
        </div>
    );
}
