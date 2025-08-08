const getRanking = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/ranking',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            return data;
        })
        .catch(error => {
            if (error.message === 'Failed to fetch') throw new Error('Error fetching data');
            throw new Error(error.message || error);
        });
}

const RankingService = {
    getRanking,
};

export default RankingService;