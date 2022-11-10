import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../context/Socket/Component";
import io, { Socket } from 'socket.io-client'
import { useEffect, useState, useRef } from "react";
import Board from "../../components/Connect4/Board"
import styles from "../../styles/Connect4.module.css"
import AvatarUploader from "../../components/Connect4/AvatarUploader";
import Image from "next/image"
import fallbackAvatar from "../../public/static/images/Connect4/avatar-doge.png"

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
  avatars: object;
  colour: object;
}

interface Avatars {
  avatars: object;
  colour: object;
}

interface SetAvatar {
  avatar: object;
  colour: string;
}

const NUM_PLAYERS = 2;
const initPlayerColours = {1: "#0000FF", 2: "#FF0000"};

function GamePage({ player }) {
  const socket = useRef<Socket>();
  const router = useRouter();
  const { slug } = router.query;
  const [board, setBoard] = useState<number[][] | undefined>(undefined);
  const [winMessage, setWinMessage] = useState<string | undefined>(undefined);
  const [playerTurn, setPlayerTurn] = useState<boolean>();
  const [winCoords, setWinCoords] = useState<number[][] | undefined>(undefined);
  const [thisPlayer, setThisPlayer] = useState<number>();
  const [avatars, setAvatars] = useState<object>();
  const [avatarChangedFlag, setAvatarChangedFlag] = useState<boolean>();
  const [playerColours, setPlayerColours] = useState<object>(initPlayerColours);
  const [colour, setColour] = useState<string>();

  useEffect(() => {
    socket.current = io(urlConnect4Backend);
    socket.current.emit("join_room", { roomUuid: slug }, (raw: string) => {
      const msg: InitialiseGame = JSON.parse(raw);
      setThisPlayer(msg.player_number);
      setPlayerCustomisation(msg);
    });

    socket.current.on("update_board", (raw: string) => {
      const msg: UpdateBoard = JSON.parse(raw);
      setBoard(msg.board);
      setPlayerTurn(msg.player_turn === slug);
    })

    socket.current.on("winner_found", (raw: string) => {
      const msg: WinnerInfo = JSON.parse(raw);
      if (msg.winner === slug) {
        setWinMessage("You win!");
      } else {
        setWinMessage("You lose!");
      }
      setWinCoords(msg.win_idx);
    })

    socket.current.on("update_avatar", (raw: string) => {
      const msg: Avatars = JSON.parse(raw);
      setPlayerCustomisation(msg);
    })
  }, [router.isReady])

  const setPlayerCustomisation = (msg) => {
    setAvatars(msg.avatars["avatar"]);
    setPlayerColours(msg.avatars["colour"]);
  }

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
    const avatar = JSON.parse(localStorage.getItem("avatar"));
    const colour = JSON.parse(localStorage.getItem("colour"));
    let msg: SetAvatar = { avatar: null, colour: null };
    if (avatar) {
      msg.avatar = avatar;
    }
    if (colour) {
      msg.colour = colour;
    }else{
      msg.colour = (thisPlayer === 1) ? "#0000FF" : "#FF0000";
    }
    socket.current.emit("set_avatar", JSON.stringify(msg));
  }, [avatarChangedFlag, thisPlayer]);

  const changeColour = (e) => {
    e.preventDefault();
    localStorage.setItem("colour", JSON.stringify(colour));
    socket.current.emit("set_avatar", JSON.stringify({ avatar: null, colour: colour }));
  }

  if (player) {
    return (
      <div>
        <div className={styles.gameContainer}>
          <Board avatars={avatars} playerColours={playerColours} board={board} winCoords={winCoords} move={connect4Move} />
          <div className={styles.winMessage} style={{ visibility: winMessage ? "visible" : "hidden" }}>{winMessage}</div>
          <div className={styles.playerTurn} style={{ visibility: winMessage ? "hidden" : "visible" }}>{playerTurn ? "Your turn" : "Opponent's turn"}</div>
          <AvatarUploader avatarChangedFlag={avatarChangedFlag} setAvatarChangedFlag={setAvatarChangedFlag}>
            <div className={styles.board} style={{ width: "64px" }}>
              <div className={styles.cellTokenPlayer} style={{ border: "5px solid", borderColor: playerColours[thisPlayer], backgroundColor: playerColours[thisPlayer] }}>
                <Image className={styles.cellToken} src={(avatars && avatars.hasOwnProperty(thisPlayer)) ? avatars[thisPlayer] : fallbackAvatar} width="50px !important" height="50px !important" />
              </div>
            </div>
          </AvatarUploader>
          <form onSubmit={(e) => {changeColour(e)}}>
            <input type="color" onChange={(e) => setColour(e.target.value)}/>
            <input type="submit" value="Confirm"/>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.gameContainer}>
        <Board avatars={avatars} playerColours={playerColours} board={board} winCoords={winCoords} />
      </div>
    )
  }
}

export default GamePage