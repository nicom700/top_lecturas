import { getGameByUserRepository, createGameRepository, updateGameRepository } from '../repositories/playing.js';
import { getRankingByUserRepository, createRankingByUserRepository, resetWinStreakRepository } from '../repositories/ranking.js';
import helper from '../helpers/helpers.js';
import fetch from 'node-fetch';

export const startGame = async (req, res, next) => {
    try {
        const { user } = req;
        let { article1, article2, views1, views2, url1, url2 } = await getOrderedWikipediaArticles();
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
        console.log('Partida en db:', currentGamePlaying);

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
    catch (error) {
        next(error);
    }
}

const getPageViews = async (apiUrl) => {
    return await fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            return data.items[0].articles;
        });
}

const getImgArticle = async (apiUrl, article) => {
    return await fetch(apiUrl + article)
        .then(res => res.json())
        .then((data) => {
            //const imgUrl = ((Array.isArray(data.items) && data.items.length !== 0) && data.items[0].hasOwnProperty('srcset')) ? data.items[0].srcset[data.items[0].srcset.length - 1] : null; //large
            const imgUrl = ((Array.isArray(data.items) && data.items.length !== 0) && data.items[0].hasOwnProperty('srcset')) ? data.items[0].srcset[0] : null; //small
            if (!imgUrl) return 'No hay imagen';
            return 'https:' + imgUrl.src;
        });
}

const getOrderedWikipediaArticles = async () => {
    const ARTICLE_API_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/es.wikipedia/all-access/' + helper.getPreviousYearMonth() + '/all-days';
    const IMAGE_API_URL = 'https://es.wikipedia.org/api/rest_v1/page/media-list/';

    const pageViews = await getPageViews(ARTICLE_API_URL);
    const randomKeys = helper.shuffle(Object.keys(pageViews));

    return {
        article1: pageViews[randomKeys[0]].article,
        article2: pageViews[randomKeys[1]].article,
        views1: pageViews[randomKeys[0]].views,
        views2: pageViews[randomKeys[1]].views,
        url1: await getImgArticle(IMAGE_API_URL, pageViews[randomKeys[0]].article),
        url2: await getImgArticle(IMAGE_API_URL, pageViews[randomKeys[1]].article),
    }
}