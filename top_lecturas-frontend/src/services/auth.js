const loginUser = async (user) => {
    const loginResponse = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });

    const userData = await loginResponse.json();
    console.log('loginUser:', userData);

    if (loginResponse.status === 403) {
        throw new Error(userData.error);
    }

    return userData;
}

const registerUser = async (user) => {
    const userResponse = await fetch('http://localhost:3000/api/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const userData = await userResponse.json();

    if (userResponse.status !== 200) {
        console.log(userData);
        throw new Error(userData.error);
    }

    return userData;
}

const logout = async () => {
    await fetch('http://localhost:3000/api/logout', {
        method: "GET",
        credentials: 'include',
    });
}

const getCurrentUser = async () => {
    return await fetch('http://localhost:3000/api/profile', {
        method: "GET",
        credentials: 'include',
    });
}

const AuthService = {
    loginUser,
    registerUser,
    logout,
    getCurrentUser,
};

export default AuthService;