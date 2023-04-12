const getRanking = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/ranking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        const user = res.json();
        return user;
    }).then(data => {
        if (data.error) throw new Error(data.error);
        return data;
    }).catch(error => {
        if (error.message === 'Failed to fetch') throw new Error('Error fetching data');
        throw new Error(error);
    });
}

const RankingService = {
    getRanking,
};

export default RankingService;