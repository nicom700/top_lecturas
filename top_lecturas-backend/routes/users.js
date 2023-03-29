import { Router } from 'express';
import { updateUser, updateAvatar } from '../controllers/users.js';
const userRoutes = Router();

userRoutes.post('/edit', updateUser);
userRoutes.post('/avatar', updateAvatar);

export default userRoutes;