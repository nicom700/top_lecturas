import { useState, useEffect } from 'react';
import RankingService from 'src/services/ranking';
import Loading from 'src/components/Loading';
import TitleH1 from 'src/components/TitleH1';
import Card from 'src/components/Card';
import TableRanking from 'src/components/TableRanking';

export default function Ranking() {
    const [ranking, setRanking] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        RankingService.getRanking()
            .then((data) => {
                setRanking(data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if(error){
        return (
            <div className="my-12 grow flex flex-col items-center">
                <TitleH1 text="Algo salio mal 😖" />
                <p className="mb-4 text-2xl text-center text-gray-700 dark:text-gray-300">No se pudo cargar el Top 10 Ranking</p>
            </div>
        );
    }

    return (
        <div className="my-4 max-md:px-6 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around mb-4">
                <TitleH1 text="Ranking de Jugadores" />
                {ranking ? (
                    <>
                        <div className="w-full max-lg:flex-col flex items-center justify-center gap-6 mx-auto">
                            <Card place={'2'} ranking={ranking[1]} avatar={ranking[1].user.avatar} className={'order-1 max-lg:order-2'} />
                            <Card place={'1'} ranking={ranking[0]} avatar={ranking[0].user.avatar} className={'order-2 max-lg:order-1'} />
                            <Card place={'3'} ranking={ranking[2]} avatar={ranking[2].user.avatar} className={'order-3 max-lg:order-3'} />
                        </div>
                        <h3 className="text-gray-700 dark:text-gray-300 mt-10 text-xl font-bold text-center">
                            Top 10: mejores jugadores
                        </h3>
                        <TableRanking ranking={ranking} />
                    </>
                ):(
                    <Loading />
                )}
            </div>
        </div>
    );
}
