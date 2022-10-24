import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../../context/Socket/Component";
import io, { Socket } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import Board from "../../../components/Connect4/Board"

const play = () => {
    const socket = useRef<Socket>();
    const router = useRouter();
    const { slug } = router.query;
    const [board, setBoard] = useState<number[][]|undefined>(undefined);

    useEffect(() => {
        socket.current = io(urlConnect4Backend);
        socket.current.emit("join_room", {roomUuid: slug});
        socket.current.on("update_board", (msg: string) => {
            setBoard(JSON.parse(msg));
        })
    }, [router.isReady])

    useEffect(() => {
        return () => {
            if (socket) socket.current.close();
        };
    }, [socket]);

    const connect4Move = (col: number) => {
        socket.current.emit("move", {col});
    }

    return(
        <div>
            <Board board={board} move={connect4Move}/>
        </div>
    )
}

export default play