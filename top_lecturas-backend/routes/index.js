import { Router } from 'express';
import { login, register, profile } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import dashboardRoutes from './dashboard.js';
import userRoutes from './users.js';
import gameRoutes from './game.js';
import rankingRoutes from './ranking.js';

const apiRoutes = Router();

apiRoutes.post('/login', login);
apiRoutes.post('/register', register);
apiRoutes.get('/profile', auth, profile);

apiRoutes.use('/dashboard', auth, dashboardRoutes);
apiRoutes.use('/user', auth, userRoutes);
apiRoutes.use('/game', auth, gameRoutes);
apiRoutes.use('/ranking', auth, rankingRoutes);

export default apiRoutes;