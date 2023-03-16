import { Router } from 'express';
import { startGame } from '../controllers/startGame.js';
import { continueGame } from '../controllers/continueGame.js';

const gameRoutes = Router();

gameRoutes.get('/start', startGame);
gameRoutes.post('/continue', continueGame);

export default gameRoutes;