const getArticles = async () => {
    const startResponse = await fetch('http://localhost:3000/api/game/start', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const articleData = await startResponse.json();
    console.log('getArticlesService:', articleData);

    if (startResponse.status !== 200) {
        console.log(articleData);
        throw new Error(articleData.error);
    }

    return articleData;
}

const sendOption = async (article) => {
    const continueResponse = await fetch('http://localhost:3000/api/game/continue', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(article)
    });

    const articleData = await continueResponse.json();
    console.log('sendOptionService:', articleData);

    if (continueResponse.status !== 200) {
        console.log(articleData);
        throw new Error(articleData.error);
    }

    return articleData;
}

const GameService = {
    getArticles,
    sendOption
};

export default GameService;