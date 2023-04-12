import React, { useState } from 'react';
import { useEffect } from 'react';
import RankingService from 'src/services/ranking';
import Card from 'src/components/Card';
import TableRanking from 'src/components/TableRanking';
import TitleH1 from 'src/components/TitleH1';
import Loading from 'src/components/Loading';

function Ranking() {
    const [ranking, setRanking] = useState(null);
    const [rankingPlace1, setRankingPlace1] = useState(null);
    const [rankingPlace2, setRankingPlace2] = useState(null);
    const [rankingPlace3, setRankingPlace3] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        RankingService.getRanking()
            .then((data) => {
                setRanking(data);
                setRankingPlace1(data[0]);
                setRankingPlace2(data[1]);
                setRankingPlace3(data[2]);
                
                //console.log(data[0]);
                //console.log(data[0].user.avatar);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="my-8 max-md:px-6 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl">
                <TitleH1 text="Ranking de Jugadores" />
                {ranking ? (
                    <>
                        <div className="w-full max-lg:flex-col flex items-center justify-center gap-6 mx-auto">
                            <Card place={'2'} ranking={ranking[1]} className={'order-1 max-lg:order-2'} />
                            <Card place={'1'} ranking={ranking[0]} className={'order-2 max-lg:order-1'} />
                            <Card place={'3'} ranking={ranking[2]} className={'order-3 max-lg:order-3'} />
                        </div>
                        <TableRanking ranking={ranking} />
                    </>
                ):(
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default Ranking;
