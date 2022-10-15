import { createContext, SetStateAction, useState, Dispatch } from "react";

type UserContextType = {
    username: string | null;
    setUsername: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
    username: null,
    setUsername: () => {}
});

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState<string>();
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            { children }
        </UserContext.Provider>
    );
};

export default UserContextProvider;