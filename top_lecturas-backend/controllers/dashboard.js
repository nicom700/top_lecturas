import { getRankingByUserRepository } from '../repositories/ranking.js';

export const dashboard = async (req, res, next) => {
    try {
        const { user } = req;
        let ranking = await getRankingByUserRepository(user);
        
        if(!ranking) {
            return res.json({
                total_points: 0,
                total_win_streaks: 0,
                last_win_streak: 0
            });
        }

        return res.json({
            total_points: [ranking.total_points],
            total_win_streaks: [ranking.total_win_streaks],
            last_win_streak: [ranking.last_win_streak]
        });

    }
    catch (error) {
        next(error);
    }
}