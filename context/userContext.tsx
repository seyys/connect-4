import React, { useState, createContext } from "react";

export interface IUser{
    username?: string;
    secret?: string;
}

export type UserContextType = {
    state?: IUser;
    setState: (user: IUser) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<React.ReactNode> = ({children}) => {
    const [state, setState] = useState<IUser>();

    return(
        <UserContext.Provider value={{state, setState}}>
            {children}
        </UserContext.Provider>
    );
};