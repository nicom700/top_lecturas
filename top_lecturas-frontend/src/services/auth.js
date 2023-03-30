const loginUser = (user) => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
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

const registerUser = (user) => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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

const logout = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/logout', {
        method: 'GET',
        credentials: 'include',
    });
}

const getCurrentUser = () => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/profile', {
        method: 'GET',
        credentials: 'include',
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

const updateUser = (user) => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/user/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
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

const updateAvatar = (avatar) => {
    return fetch(import.meta.env.VITE_BACKEND_URL + '/user/avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(avatar)
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

const AuthService = {
    loginUser,
    registerUser,
    logout,
    getCurrentUser,
    updateUser,
    updateAvatar,
};

export default AuthService;