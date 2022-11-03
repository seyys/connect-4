import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../../context/Socket/Component";
import io, { Socket } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import Board from "../../../components/Connect4/Board"
import styles from "../../../styles/Connect4.module.css"
import AvatarUploader from "../../../components/Connect4/AvatarUploader";

interface UpdateBoard {
  board: number[][];
  player_turn: string;
}

interface WinnerInfo {
  winner: string;
  win_idx: number[][];
}

interface InitialiseGame {
  player_number: number;
}

const play = () => {
  const socket = useRef<Socket>();
  const router = useRouter();
  const { slug } = router.query;
  const [board, setBoard] = useState<number[][] | undefined>(undefined);
  const [winMessage, setWinMessage] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<boolean>();
  const [winCoords, setWinCoords] = useState<number[][] | undefined>(undefined);
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [avatars, setAvatars] = useState<object>();

  useEffect(() => {
    socket.current = io(urlConnect4Backend);
    socket.current.emit("join_room", { roomUuid: slug }, (raw: string) => {
      const msg: InitialiseGame = JSON.parse(raw);
      setThisPlayer(msg.player_number);
    });

    socket.current.on("update_board", (raw: string) => {
      const msg: UpdateBoard = JSON.parse(raw);
      setBoard(msg.board);
      setPlayerTurn(msg.player_turn === slug);
    })

    socket.current.on("winner_found", (raw: string) => {
      const msg: WinnerInfo = JSON.parse(raw);
      if(msg.winner === slug){
        setWinMessage("You win!");
      }else{
        setWinMessage("You lose!");
      }
      setWinCoords(msg.win_idx);
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

  useEffect(() => {
    const avatar = localStorage.getItem("avatar");
    if(avatar){
      setAvatars({ [thisPlayer]: JSON.parse(localStorage.getItem("avatar")) });
    }
  }, [thisPlayer]);

  return (
    <AvatarUploader>
      <div className={styles.gameContainer}>
        <Board avatars={avatars} board={board} winCoords={winCoords} move={connect4Move} />
        <div className={styles.winMessage} style={{visibility: winMessage ? "visible" : "hidden"}}>{winMessage}</div>
        <div className={styles.playerTurn} style={{visibility: winMessage ? "hidden" : "visible"}}>{playerTurn ? "Your turn" : "Opponent's turn"}</div>
      </div>
    </AvatarUploader>
  )
}

export default play