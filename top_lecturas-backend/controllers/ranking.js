import { getAllRankingsRepository} from '../repositories/ranking.js';

export const getAllRankings = async (req, res) => {
    try {
        
        let rankings = await getAllRankingsRepository();
        
        return res.json({rankings});

    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
}