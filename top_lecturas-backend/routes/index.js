import { Router } from 'express';
import { login, register, profile, logout } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import gameRoutes from './game.js';
import rankingRoutes from './ranking.js';

const apiRoutes = Router();

apiRoutes.post('/login', login);
apiRoutes.post('/register', register);
apiRoutes.get('/profile', auth, profile);
apiRoutes.get('/logout', auth, logout);

apiRoutes.use('/game', auth, gameRoutes);
apiRoutes.use('/ranking', auth, rankingRoutes);

export default apiRoutes;