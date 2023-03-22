import { findByIdRepository, loginRepository, registerRepository } from '../repositories/users.js';
import config from '../config.js';
import helper from '../helpers/helpers.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginRepository(email);

        if (user && bcrypt.compareSync(password, user.password)) {

            const userData = { _id: user._id, name: user.name, email: user.email };

            jwt.sign(userData, config.JWT_SECRET_KEY, { expiresIn: 604800 },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        secure: false,
                        httpOnly: true,
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    }).json(userData);
                }
            );

        } else {
            res.status(403).json({ error: 'Mail or Password not valid' });
        }

    } catch (error) {
        res.status(403).json(error);
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, passwordConfirmation } = req.body;
        const bcryptSalt = bcrypt.genSaltSync(10);

        if (password !== passwordConfirmation) return res.status(403).json({error: 'Las contraseñas no coinciden'});
        if(!helper.validateEmail(email)) return res.status(403).json({error: 'El email no es válido'});

        const user = await registerRepository({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        if (user.error) return res.status(403).json({error: user.error});
        if (user) return res.status(200).json({ _id: user._id, name: user.name, email: user.email });

    } catch (error) {
        res.status(403).json(error);
    }
};

export const profile = async (req, res) => {
    const { user } = req;
    const { _id, name, email } = await findByIdRepository(user);

    return res.json({ _id, name, email });
};

export const logout = async (req, res) => {
    res.clearCookie('token');

    return res.status(200).send({msg: 'Logout!'});
}