const getStats = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/dashboard', {
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

const DashboardService = {
    getStats,
};

export default DashboardService;