import config from '../config.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const user = jwt.verify(token, config.JWT_SECRET_KEY);
            req.user = user;
            next();
        } catch (error) {
            res.clearCookie('token');
            return res.status(403).send({error: 'Not logged in!'});
        }
    }
    else{
        return res.status(200).send({error: 'Not logged in!'});
    }
}