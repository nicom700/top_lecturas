import Playing from '../schemas/playing.js';

export const getGameByUserRepository = async (user) => {
    try {
        return await Playing.findOne({ user_id: user._id });
    } catch (error) {
        throw new Error('No se pudo obtener la partida actual');
    }
}

export const createGameRepository = async (user, playingData) => {
    try {
        const { article1, article2, views1, views2, url1, url2 } = playingData;
        return await Playing.create({ user_id: user._id, article1, article2, views1, views2, url1, url2 });
    } catch (error) {
        throw new Error('No se pudo crear la partida');
    }
}

export const updateGameRepository = async (currentGamePlaying, playingData) => {
    try {
        const { article1, article2, views1, views2, url1, url2 } = playingData;
        currentGamePlaying.article1 = article1;
        currentGamePlaying.article2 = article2;
        currentGamePlaying.views1 = views1;
        currentGamePlaying.views2 = views2;
        currentGamePlaying.url1 = url1;
        currentGamePlaying.url2 = url2;
        return await currentGamePlaying.save();
    } catch (error) {
        throw new Error('No se pudo actualizar la partida actual');
    }
}

export const deleteGameRepository = async (user) => {
    try {
        await Playing.deleteOne({ user_id: user._id });
    } catch (error) {
        throw new Error('No se pudo eliminar la partida');
    }
}