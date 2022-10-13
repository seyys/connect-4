import { createContext, SetStateAction, useState, Dispatch } from "react";

type UserContextType = {
    username: string | null;
    setUsername: Dispatch<SetStateAction<string>> | null;
}

const IUserContextState = {
    username: null,
    setUsername: () => {}
}

export const UserContext = createContext<UserContextType>(IUserContextState);

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState<string|null>();
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            { children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;