import User from '../schemas/users.js';

export const loginRepository = async (email) => {
    try{
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return error;
    }
}

export const registerRepository = async (userData) => {
    try {
        return await User.create(userData);
    } catch (error) {
        return {error: 'El email ya esta registrado'};
    }
}

export const findByIdRepository = async (user) => {
    try {
        return await User.findOne({ _id: user._id });
    } catch (error) {
        return {error: 'No se encuentra el usuario'};
    }
}
