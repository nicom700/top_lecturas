import { Router } from 'express';
import { getAllRankings } from '../controllers/ranking.js';

const rankingRoutes = Router();

rankingRoutes.get('/', getAllRankings);

export default rankingRoutes;