import { useEffect, useReducer, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import SocketContext, { defaultSocketContextState, SocketReducer } from "./Context";

export interface ISocketContextComponentProps {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = ({ children }) => {
    const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
    const [loading, setLoading] = useState(true);

    const socket = useSocket('http://0.0.0.0:8080', {
        autoConnect: false
    });

    useEffect(() => {
        // Connect to socket 
        socket.connect();
        // Save socket in context
        SocketDispatch({type: "update_socket", payload: socket});
        // Start event listeners
        StartListeners();
        // Send handshake
        SendHandshake();
        setLoading(false);
    }, []);

    const StartListeners = () => {
        // Reconnect
        socket.io.on("reconnect_failed", () => {
            console.info("Reconnection failure")
        });
    };

    const SendHandshake = () => {
        // socket.emit("handshake", (uuid: string, username: string) => {
        //     SocketDispatch({ type: "update_uuid", payload: uuid });
        //     SocketDispatch({ type: "update_username", payload: username });

        //     setLoading(false);
        // });
    };
    
    if (loading) return <p>Loading socket IO...</p>;

    return (
        <SocketContext.Provider value={{ SocketState, SocketDispatch }}>
            { children }
        </SocketContext.Provider>
    );
};

export default SocketContextComponent;