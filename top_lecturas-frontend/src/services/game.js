const getArticles = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/game/start', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
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
    return fetch(import.meta.env.VITE_BACKEND_URL + '/game/continue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
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