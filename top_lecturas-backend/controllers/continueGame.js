import { deleteGameRepository, getGameByUserRepository } from '../repositories/playing.js';
import { getRankingByUserRepository, updateWinStreakRepository, addPointInRankingRepository } from '../repositories/ranking.js';
import helper from '../helpers/helpers.js';

export const continueGame = async (req, res, next) => {
    try {
        const { user } = req;
        let { article: answeredArticle } = req.body;
        answeredArticle = answeredArticle.replaceAll(' ', '_');

        let currentGamePlaying = await getGameByUserRepository(user);
        if (!currentGamePlaying) return res.status(500).send({ error: 'No se encontro partida.' });

        let correctAnswer = helper.getCorrectAnswer(currentGamePlaying) ?? answeredArticle;

        console.log('Usted eligio:', answeredArticle);
        console.log('Respuesta correcta:', correctAnswer);

        if (answeredArticle !== correctAnswer) {
            await deleteGameRepository(user);
            console.log('Perdiste...');
            return res.json({ 'gameOver': 'gameOver' });
        }

        let ranking = await getRankingByUserRepository(user);

        // add point (total_points and last_win_streak)
        await addPointInRankingRepository(ranking);

        // update total_win_streaks if you make a new record
        if (ranking && ranking.last_win_streak > ranking.total_win_streaks) {
            await updateWinStreakRepository(ranking, ranking.last_win_streak);
        }

        return res.json({ 'keepGoing': 'keepGoing' });

    } catch (error) {
        next(error);
    }
}

