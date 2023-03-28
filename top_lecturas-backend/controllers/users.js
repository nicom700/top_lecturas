import { findByIdRepository, loginRepository, registerRepository, updateUserRepository, updateUserAvatarRepository } from '../repositories/users.js';
import config from '../config.js';
import helper from '../helpers/helpers.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(403).send({ error: 'Complete todos los campos requeridos.' });
        //if (!helper.validateEmail(email) || !helper.validatePassword(password)) return res.status(403).json({ error: 'El email o la contraseña no son correctas.' });

        const user = await loginRepository(email);

        if (user && bcrypt.compareSync(password, user.password)) {

            const userData = { _id: user._id, name: user.name, email: user.email, avatar: user.avatar };

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
            res.status(403).json({ error: 'El email o la contraseña no son correctas.' });
        }

    } catch (error) {
        res.status(403).json(error);
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, passwordConfirmation } = req.body;
        const bcryptSalt = bcrypt.genSaltSync(10);

        if (!name || !email) return res.status(403).send({ error: 'Complete todos los campos requeridos.' });
        if (password !== '' && passwordConfirmation !== '') {
            if (password !== passwordConfirmation) return res.status(403).json({ error: 'Las contraseñas no coinciden.' });
        }
        if (!helper.validateEmail(email)) return res.status(403).json({ error: 'El email no es válido' });
        if (!helper.validateUsername(name)) return res.status(403).json({ error: 'El nombre de usuario debe tener (entre 3 y 24 caracteres). Puede contener "letras", "números", ".", "-" y "_". Los caracteres no pueden aparecer más de uno de forma consecutiva.' });
        if (!helper.validatePassword(password)) return res.status(403).json({ error: 'La contraseña debe tener al menos 8 caracteres, contener al menos una "letra mayúscula", una "letra minúscula" y un "número". También puede contener caracteres especiales.' });

        const user = await registerRepository({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        if (user.error) return res.status(403).json({ error: user.error });
        if (user) return res.status(200).json({ _id: user._id, name: user.name, email: user.email });

    } catch (error) {
        res.status(403).json(error);
    }
};

export const profile = async (req, res) => {
    const { user } = req;
    const { _id, name, email, avatar } = await findByIdRepository(user);

    return res.json({ _id, name, email, avatar });
};

export const logout = async (req, res) => {
    res.clearCookie('token');

    return res.status(200).send({ msg: 'Logout!' });
}

export const updateUser = async (req, res) => {
    try {
        const { user } = req;
        const { name, email, password, passwordConfirmation } = req.body;
        
        console.log('----------------------------------------------------------------');
        //console.log('body', req.body);
        //console.log('user del req', req.user);

        if (!name || !email) return res.status(403).send({ error: 'Complete todos los campos requeridos.' });
        if (!helper.validateUsername(name)) return res.status(403).json({ error: 'El nombre de usuario debe tener (entre 3 y 24 caracteres). Puede contener "letras", "números", ".", "-" y "_". Los caracteres no pueden aparecer más de uno de forma consecutiva.' });
        if (!helper.validateEmail(email)) return res.status(403).json({ error: 'El email no es válido.' });

        let userNewData = {
            name,
            email
        }

        if (password !== '' || passwordConfirmation !== '') {
            if (password !== passwordConfirmation) return res.status(403).json({ error: 'Las contraseñas no coinciden.' });
            if (!helper.validatePassword(password)) return res.status(403).json({ error: 'La contraseña debe tener al menos 8 caracteres, contener al menos una "letra mayúscula", una "letra minúscula" y un "número". También puede contener caracteres especiales.' });
            const bcryptSalt = bcrypt.genSaltSync(10);
            userNewData = {
                ...userNewData,
                password: bcrypt.hashSync(password, bcryptSalt)
            }
        }


        const userWillUpdate = await findByIdRepository(user);
        console.log('userWillUpdate:', userWillUpdate);
        console.log('userNewData:', userNewData);

        const userUpdated = await updateUserRepository(
            userWillUpdate,
            userNewData
        );
        console.log('userUpdated:', userUpdated);

        if (userUpdated.error) return res.status(403).json({ error: userUpdated.error });
        if (userUpdated) return res.status(200).json({ _id: userUpdated._id, name: userUpdated.name, email: userUpdated.email, avatar: userUpdated.avatar });

        //return res.status(200).json({ _id: user._id, name: user.name, email: user.email, avatar: user.avatar });
        
    } catch (error) {
        res.status(403).json(error);
    }
}

export const updateAvatar = async (req, res) => {
    try {
        const { user } = req;
        const userWillUpdate = await findByIdRepository(user);

        if (req.body.topType
            && req.body.accessoriesType
            && req.body.hatColor
            && req.body.hairColor
            && req.body.facialHairType
            && req.body.facialHairColor
            && req.body.clotheType
            && req.body.clotheColor
            && req.body.graphicType
            && req.body.eyeType
            && req.body.eyebrowType
            && req.body.mouthType
            && req.body.skinColor) { //update avatar
            const avatar = {
                topType: req.body.topType,
                accessoriesType: req.body.accessoriesType,
                hatColor: req.body.hatColor,
                hairColor: req.body.hairColor,
                facialHairType: req.body.facialHairType,
                facialHairColor: req.body.facialHairColor,
                clotheType: req.body.clotheType,
                clotheColor: req.body.clotheColor,
                graphicType: req.body.graphicType,
                eyeType: req.body.eyeType,
                eyebrowType: req.body.eyebrowType,
                mouthType: req.body.mouthType,
                skinColor: req.body.skinColor
            }


            console.log('----------------------------------------------------------------');
            console.log('avatar', avatar);

            const updatedUserAvatar = await updateUserAvatarRepository(
                userWillUpdate,
                avatar
            );

            if (updatedUserAvatar.error) return res.status(403).json({ error: updatedUserAvatar.error });

            return res.status(200).send({ _id: user._id, name: user.name, email: user.email, avatar });
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
}