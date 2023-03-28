import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/context/UserContext';
import GameService from 'src/services/game';
import Button from 'src/components/forms/Button';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';

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

    useEffect(() => {
        if(!articles) startGame();
    }, [articles]);

    function startGame() {
        if (isLoading) return;

        setDisabledBtn(true);
        setIsLoading(true);

        GameService.getArticles()
            .then((data) => {
                setArticles(data.options);
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
                if (data.gameOver){
                    setStatus(data.gameOver);
                }else{
                    setStatus(data.keepGoing);
                    setArticles(null);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setDisabledBtn(false);
                setIsLoading(false);
            });
    }

    async function handleStartGame(e) {
        e.preventDefault();
        setDisabledBtn(true);
        startGame();
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
                <p className="mb-4 text-2xl text-center">{error}</p>
            </div>
        );
    }

    if (status === 'keepGoing') {
        return (
            <div className="my-8 w-full grow flex flex-col items-center justify-around">
                <div className="max-w-7xl w-full flex flex-col gap-4">
                    <TitleH1 text="Muy Bien, sigue asi 😁" />
                    <Loading />
                </div>
                <div className="m-4 text-3xl flex gap-8 justify-evenly">
                    <div>Racha actual: {lastWinStreak}</div>
                    <div>Tu mejor racha: {totalWinStreaks}</div>
                    <div>Puntos totales: {totalPoints}</div>
                </div>
            </div>
        );
    }

    if (status === 'gameOver') {
        return (
            <div className="my-12 grow flex flex-col items-center">
                <div className="max-w-md w-full bg-white p-6 shadow-md rounded-xl">
                    <p className="mb-4 text-2xl text-center">
                        Juego terminado: Perdiste
                    </p>
                    <Button
                        type="submit"
                        name="jugar_de_nuevo"
                        value="Jugar de nuevo"
                        disabled={disabledBtn}
                        onClick={handleStartGame}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="my-8 w-full grow flex flex-col items-center justify-around">
            <div className="max-w-7xl w-full flex gap-4 justify-around">
                {!articles && <Loading />}
                {articles && articles.map((item) => (
                    <div key={item.id} className="w-2/4">
                        <form>
                            <input
                                type="hidden"
                                name="option"
                                value={item.article}
                                readOnly
                            />
                            <Button
                                type="submit"
                                name={item.id}
                                value={item.article}
                                disabled={disabledBtn}
                                onClick={handleArticleSubmit}
                            />
                        </form>
                    </div>
                ))}
            </div>
            <div className="m-4 text-3xl flex gap-8 justify-evenly">
                <div>Racha actual: {lastWinStreak}</div>
                <div>Tu mejor racha: {totalWinStreaks}</div>
                <div>Puntos totales: {totalPoints}</div>
            </div>
        </div>
    );
}
