import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import RoomList from '../../components/RoomList';
import { urlConnect4Backend } from '../../context/Socket/Component';
import { roomUuid } from '../../context/Socket/Types';
import io, { Socket } from "socket.io-client"

const DEFAULT_NUM_COLS = 7;
const DEFAULT_NUM_ROWS = 6;
const DEFAULT_NUM_MATCHES = 4;

function Connect4Page(){
  const [roomUuid, setRoomUuid] = useState<roomUuid|undefined>(undefined);
  const socket = useRef<Socket>();
  const [numCols, setNumCols] = useState<number>(DEFAULT_NUM_COLS);
  const [numRows, setNumRows] = useState<number>(DEFAULT_NUM_ROWS);
  const [numMatches, setNumMatches] = useState<number>(DEFAULT_NUM_MATCHES);

    useEffect(() => {
        socket.current = io(urlConnect4Backend);
    }, [])

    useEffect(() => {
        return () => {
            if (socket) socket.current.close();
        };
    }, [socket]);

  const makeNewRoom = (e) => {
    e.preventDefault();
    const msg = {num_cols: e.target.numCols.value,
                num_rows: e.target.numRows.value,
                num_matches: e.target.numMatches.value};
    // Generate links for P1 P2 and spectator
    socket.current.emit("new_room", JSON.stringify(msg), (msg: string) => {
      setRoomUuid(JSON.parse(msg));
    });
  }

  return(
    <>
      <Head>
        <title>Connect 4</title>
      </Head>
      <main>
        <h1>Connect 4 with real time multiplayer with sockets</h1>
        <form onSubmit={makeNewRoom} onReset={() => {setNumCols(DEFAULT_NUM_COLS); setNumRows(DEFAULT_NUM_ROWS); setNumMatches(DEFAULT_NUM_MATCHES);}}>
          <label>Columns</label><br/>
          <input id="numCols" type="range" min='1' max='20' defaultValue={DEFAULT_NUM_COLS} onChange={e => setNumCols(Number(e.target.value))}/>{numCols}<br/>
          <label>Rows</label><br/>
          <input id="numRows" type="range" min='1' max='20' defaultValue={DEFAULT_NUM_ROWS} onChange={e => setNumRows(Number(e.target.value))}/>{numRows}<br/>
          <label>Matches</label><br/>
          <input id="numMatches" type="range" min='3' defaultValue={DEFAULT_NUM_MATCHES} max={Math.min(numCols, numRows)} onChange={e => setNumMatches(Number(e.target.value))}/>{numMatches}<br/>
          <br/>
          <input type="submit" value="New Room"/>
          <input type="reset"/>
        </form>
        <RoomList roomUuid={roomUuid}/>
      </main>
    </>
  )
}

export default Connect4Page
