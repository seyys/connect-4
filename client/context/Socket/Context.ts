import React, { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketContextState {
    socket: Socket | undefined;
    uuid: string | null;
    username: string | null;
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    uuid: null,
    username: null
};

export type TSocketContextActions = "update_socket" | "update_uuid" | "update_username";

export type TSocketContextPayload = Socket | string;

export interface ISocketContextActions{
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    switch (action.type) {
        case "update_socket":
            return {...state, socket: action.payload as Socket};
        case "update_uuid":
            return {...state, uuid: action.payload as string};
        case "update_username":
            return {...state, username: action.payload as string};
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {}
});

export default SocketContext;