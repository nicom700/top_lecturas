import { deleteGameRepository, getGameByUserRepository } from '../repositories/playing.js';
import { getRankingByUserRepository, updateWinStreakRepository, addPointInRankingRepository, resetWinStreakRepository } from '../repositories/ranking.js';
import helper from '../helpers/helpers.js';

export const continueGame = async (req, res, next) => {
    try {
        const { user } = req;
        let { article: answeredArticle } = req.body;
        answeredArticle = answeredArticle.replace(/ /g, '_');

        let currentGamePlaying = await getGameByUserRepository(user);
        if (!currentGamePlaying) return res.status(500).send({ error: 'No se encontro partida.' });

        let correctAnswer = helper.getCorrectAnswer(currentGamePlaying) ?? answeredArticle;

        console.log('Usted eligio:', answeredArticle);
        console.log('Respuesta correcta:', correctAnswer);

        let ranking = await getRankingByUserRepository(user);

        if (answeredArticle !== correctAnswer) {
            await deleteGameRepository(user);
            await resetWinStreakRepository(ranking);
            console.log('Perdiste...');
            //console.log('---> currentGamePlaying: ', currentGamePlaying);
            return res.json({ 
                'gameOver': 'gameOver',
                win: correctAnswer,
                total_points: [ranking.total_points],
                total_win_streaks: [ranking.total_win_streaks],
                last_win_streak: [ranking.last_win_streak],
                results: [
                    { id: 0, article: currentGamePlaying.article1, views: currentGamePlaying.views1, url: currentGamePlaying.url1 },
                    { id: 1, article: currentGamePlaying.article2, views: currentGamePlaying.views2, url: currentGamePlaying.url2 }
                ]
            });
            //return res.json({ 'gameOver': 'gameOver' });
        }

        // add point (total_points and last_win_streak)
        await addPointInRankingRepository(ranking);

        // update total_win_streaks if you make a new record
        if (ranking && ranking.last_win_streak > ranking.total_win_streaks) {
            await updateWinStreakRepository(ranking, ranking.last_win_streak);
        }

        return res.json({
            'keepGoing': 'keepGoing',
            win: correctAnswer,
            total_points: [ranking.total_points],
            total_win_streaks: [ranking.total_win_streaks],
            last_win_streak: [ranking.last_win_streak],
            results: [
                { id: 0, article: currentGamePlaying.article1, views: currentGamePlaying.views1, url: currentGamePlaying.url1 },
                { id: 1, article: currentGamePlaying.article2, views: currentGamePlaying.views2, url: currentGamePlaying.url2 }
            ]
        });

    } catch (error) {
        next(error);
    }
}

