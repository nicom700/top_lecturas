import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './services/auth';

const UserContext = createContext(undefined);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        AuthService.getCurrentUser()
            .then((res) => res.json())
            .then((profile) => {
                if (!profile.error) {
                    console.log('profileInUserContext:', profile);
                    setUser({
                        _id: profile._id,
                        name: profile.name,
                        email: profile.email,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setReady(true);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
};

export const userContext = () => {
    const userContext = useContext(UserContext);

    if (userContext === undefined) {
        throw Error('Error: userContext is undefined');
    }

    return userContext;
};
