import { getGameByUserRepository, createGameRepository, updateGameRepository } from '../repositories/playing.js';
import { getRankingByUserRepository, createRankingByUserRepository, resetWinStreakRepository } from '../repositories/ranking.js';

export const startGame = async (req, res) => {
    const { user } = req;

    //wikipedia api test
    const dataApi = [
        { article: 'Microscopio', views: 10, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Snow_crystals_2b.jpg/1280px-Snow_crystals_2b.jpg' },
        { article: 'Jorge_Luis_Borges', views: 50, url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Jorge_Luis_Borges.jpg' },
        { article: 'Marilyn_Monroe', views: 20, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Monroecirca1953.jpg/1280px-Monroecirca1953.jpg' },
        { article: 'Baloncesto', views: 5, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Kent_Benson_attempts_a_hook_shot_over_Ken_Ferdinand.jpg/1280px-Kent_Benson_attempts_a_hook_shot_over_Ken_Ferdinand.jpg' },
        { article: 'Ozzy_Osbourne', views: 15, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/OzzyChangingHands02-20-2010.jpg/320px-OzzyChangingHands02-20-2010.jpg' },
        { article: 'Black_Panther:_Wakanda_Forever', views: 38, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Black_Panther_Wakanda_Forever_logo.png/320px-Black_Panther_Wakanda_Forever_logo.png' },
    ];

    const randomKeys = shuffle(Object.keys(dataApi));
    let { article1, article2, views1, views2, url1, url2 } = getArticles(dataApi, randomKeys);

    let currentGamePlaying = await getGameByUserRepository(user);
    let ranking = await getRankingByUserRepository(user);

    if (currentGamePlaying) {
        currentGamePlaying = await updateGameRepository(currentGamePlaying, { article1, article2, views1, views2, url1, url2 });
    }
    else {
        currentGamePlaying = await createGameRepository(user, { article1, article2, views1, views2, url1, url2 });
        ranking = ranking ? await resetWinStreakRepository(ranking) : await createRankingByUserRepository(user);
    }

    console.log('----------------------------------------------------------------');
    console.log('Partida creada:', article1, article2);
    console.log('Partida existente:', currentGamePlaying);

    return res.json({
        options: [
            { id: 0, article: article1, url: url1 },
            { id: 1, article: article2, url: url2 }
        ],
        total_points: [ranking.total_points],
        total_win_streaks: [ranking.total_win_streaks],
        last_win_streak: [ranking.last_win_streak]
    });
}

const shuffle = (array) => { // Fisher-Yates
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[randomIndex];
        array[randomIndex] = array[currentIndex];
        array[currentIndex] = temporaryValue;
    }

    return array;
}

const getArticles = (dataApi, randomKeys) => {
    let articles = {
        article1 : dataApi[randomKeys[0]].article,
        article2 : dataApi[randomKeys[1]].article,
        views1 : dataApi[randomKeys[0]].views,
        views2 : dataApi[randomKeys[1]].views,
        url1 : dataApi[randomKeys[0]].url,
        url2 : dataApi[randomKeys[1]].url,
    }
    return articles;
}