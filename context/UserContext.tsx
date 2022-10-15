import { createContext, SetStateAction, useState, Dispatch } from "react";

type UserContextType = {
    username: string | null;
    uuid: string | null;
    setUserInfo: (username) => void;
};

export const UserContext = createContext<UserContextType>({
    username: null,
    uuid: null,
    setUserInfo: () => {}
});

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState<string>();
    const [uuid, setUuid] = useState<string>();
    const setUserInfo = (username) => {
        setUsername(username);
        setUuid(crypto.randomUUID());
    }
    return (
        <UserContext.Provider value={{ username, uuid, setUserInfo }}>
            { children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;