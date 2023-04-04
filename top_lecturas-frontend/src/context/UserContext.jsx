import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from 'src/services/auth';

const UserContext = createContext(undefined);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        AuthService.getCurrentUser()
            .then((profile) => {
                setUser({
                    _id: profile._id,
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.avatar,
                });
            })
            .catch((error) => {
                //console.log(error);
            })
            .finally(() => {
                setReady(true);
            });
    }, []);

    function updateAvatar(avatar){
        setUser({
            ...user,
            avatar: avatar
        });
    }

    return (
        <UserContext.Provider value={{ ready, user, setUser, updateAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const userContext = useContext(UserContext);

    if (userContext === undefined) {
        throw new Error(
            'useUserContext must be used within a UserContextProvider'
        );
    }

    return userContext;
};
