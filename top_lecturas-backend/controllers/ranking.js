import { getAllRankingsRepository } from '../repositories/ranking.js';

export const getAllRankings = async (req, res, next) => {
    try {
        
        let rankingsList = await getAllRankingsRepository();
        
        const rankings = rankingsList.map(({ _id, total_points, total_win_streaks, user }) => {
            return { _id, total_points, total_win_streaks, user };
        });
        
        return res.json(rankings);

    } catch (error) {
        next(error);
    }
}