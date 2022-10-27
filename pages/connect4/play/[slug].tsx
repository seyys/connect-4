import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../../context/Socket/Component";
import io, { Socket } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import Board from "../../../components/Connect4/Board"
import styles from "../../../styles/Connect4.module.css"

interface UpdateBoard {
  board: number[][];
  player_turn: string;
  winner?: string;
}

const play = () => {
  const socket = useRef<Socket>();
  const router = useRouter();
  const { slug } = router.query;
  const [board, setBoard] = useState<number[][] | undefined>(undefined);
  const [winMessage, setWinMessage] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<boolean>();

  const displayWinnerMessage = (winner: string) => {
    if(winner === slug){
      setWinMessage("You win!");
    }else{
      setWinMessage("You lose!");
    }
  }

  useEffect(() => {
    socket.current = io(urlConnect4Backend);
    socket.current.emit("join_room", { roomUuid: slug });

    socket.current.on("update_board", (raw: string) => {
      const msg: UpdateBoard = JSON.parse(raw);
      setBoard(msg.board);
      setPlayerTurn(msg.player_turn === slug);
      if(msg.winner) displayWinnerMessage(msg.winner);
    })

    socket.current.on("winner_found", (raw: string) => {
      displayWinnerMessage(JSON.parse(raw).winner);
    })
  }, [router.isReady])

  useEffect(() => {
    return () => {
      if (socket) socket.current.close();
    };
  }, [socket]);

  const connect4Move = (col: number) => {
    if (winMessage) {
      return;
    }
    socket.current.emit("move", { col });
  }

  return (
    <div className={styles.gameContainer}>
      <Board board={board} move={connect4Move} />
      <div className={styles.winMessage} style={{visibility: winMessage ? "visible" : "hidden"}}>{winMessage}</div>
      <div className={styles.playerTurn} style={{visibility: winMessage ? "hidden" : "visible"}}>{playerTurn ? "Your turn" : "Opponent's turn"}</div>
    </div>
  )
}

export default play