import { deleteGameRepository, getGameByUserRepository } from '../repositories/playing.js';
import { getRankingByUserRepository, updateWinStreakRepository, addPointInRankingRepository } from '../repositories/ranking.js';

export const continueGame = async (req, res) => {
    try {
        const { user } = req;
        const { article: answeredArticle } = req.body;

        let currentGamePlaying = await getGameByUserRepository(user);
        if(!currentGamePlaying) return res.status(500).send('No se encontro partida.');
        
        let correctAnswer = getCorrectAnswer(currentGamePlaying) ?? answeredArticle;

        console.log('Usted eligio:', answeredArticle);
        console.log('Respuesta correcta:', correctAnswer);

        if (answeredArticle !== correctAnswer) {
            await deleteGameRepository(user);
            console.log('Perdiste...');
            return res.json({'gameOver':'gameOver'});
        }

        let ranking = await getRankingByUserRepository(user);

        // add point (total_points and last_win_streak)
        await addPointInRankingRepository(ranking);

        // update total_win_streaks if you make a new record
        if (ranking && ranking.last_win_streak > ranking.total_win_streaks) {
            await updateWinStreakRepository(ranking, ranking.last_win_streak);
        }
        
        return res.json({'keepGoing':'keepGoing'});

    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
}

const getCorrectAnswer = (currentGamePlaying) => {
    
    if (currentGamePlaying.views1 > currentGamePlaying.views2) {
        return currentGamePlaying.article1;
    } else if (currentGamePlaying.views1 < currentGamePlaying.views2){
        return currentGamePlaying.article2;
    }

    return false;

}