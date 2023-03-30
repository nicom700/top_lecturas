import config from '../config.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ error: 'Debe iniciar sesión.' });

    try {
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({error: 'El Token no es válido.'});
    }

}