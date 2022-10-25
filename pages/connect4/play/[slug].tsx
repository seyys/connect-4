import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../../context/Socket/Component";
import io, { Socket } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import Board from "../../../components/Connect4/Board"
import styles from "../../../styles/Connect4.module.css"

interface WinnerMessage {
  winner: string;
}

const play = () => {
  const socket = useRef<Socket>();
  const router = useRouter();
  const { slug } = router.query;
  const [board, setBoard] = useState<number[][] | undefined>(undefined);
  const [winnerFound, setWinnerFound] = useState<boolean>(false);
  const [winMessage, setWinMessage] = useState<string>("");

  useEffect(() => {
    socket.current = io(urlConnect4Backend);
    socket.current.emit("join_room", { roomUuid: slug });
    socket.current.on("update_board", (msg: string) => {
      setBoard(JSON.parse(msg));
    })
    socket.current.on("winner_found", (raw: string) => {
      const msg: WinnerMessage = JSON.parse(raw);
      setWinnerFound(true);
      if(msg.winner === slug){
        setWinMessage("You win!");
      }else{
        setWinMessage("You lose!");
      }
    })
  }, [router.isReady])

  useEffect(() => {
    return () => {
      if (socket) socket.current.close();
    };
  }, [socket]);

  const connect4Move = (col: number) => {
    if (winnerFound) {
      return;
    }
    socket.current.emit("move", { col });
  }

  return (
    <div className={styles.gameContainer}>
      <Board board={board} move={connect4Move} />
      <div className={styles.winMessage}>{winMessage}</div>
    </div>
  )
}

export default play