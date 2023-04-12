import Ranking from '../schemas/ranking.js';

export const getRankingByUserRepository = async (user) => {
    try {
        return await Ranking.findOne({ user_id: user._id });
    } catch (error) {
        throw new Error('No se pudo obtener la puntuación del jugador');
    }
}

export const createRankingByUserRepository = async (user) => {
    try {
        return await Ranking.create({ user_id: user._id, total_points: 0, last_win_streak: 0, total_win_streaks: 0 });
    } catch (error) {
        throw new Error('No se pudo crear la puntuación del jugador');
    }
}

export const resetWinStreakRepository = async (ranking) => {
    try {
        ranking.last_win_streak = 0;
        return await ranking.save();
    } catch (error) {
        throw new Error('No se pudo restablecer la puntuación del jugador');
    }
}

export const updateWinStreakRepository = async (ranking, winStreak) => {
    try {
        ranking.total_win_streaks = winStreak;
        await ranking.save();
    } catch (error) {
        throw new Error('No se pudo actualizar la puntuación del jugador');
    }
}

export const addPointInRankingRepository = async (ranking) => {
    try {
        ranking.total_points++;
        ranking.last_win_streak++;
        await ranking.save();
    } catch (error) {
        throw new Error('No se pudo incrementar la puntuación del jugador');
    }
}

export const getAllRankingsRepository = async () => {
    try {
        return await Ranking.find().sort({total_win_streaks: -1}).limit(10).populate('user').select('-last_win_streak');
    } catch (error) {
        return new Error('No se pudo obtener los rankings');
    }
}