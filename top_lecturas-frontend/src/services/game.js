const getArticles = () => {
    return fetch('http://localhost:3000/api/game/start', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.error) throw new Error(data.error);
        return data;
    }).catch(error => {
        if (error.message === 'Failed to fetch') throw new Error('Error fetching data');
        throw new Error(error);
    });
}

const sendOption = (article) => {
    return fetch('http://localhost:3000/api/game/continue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(article)
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.error) throw new Error(data.error);
        return data;
    }).catch(error => {
        if (error.message === 'Failed to fetch') throw new Error('Error fetching data');
        throw new Error(error);
    });
}

const GameService = {
    getArticles,
    sendOption
};

export default GameService;