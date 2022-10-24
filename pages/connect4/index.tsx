import Head from 'next/head';
import Script from 'next/script';
import { useContext, useState, useEffect, useRef } from 'react';
import RoomList from '../../components/RoomList';
import { urlConnect4Backend } from '../../context/Socket/Component';
import SocketContext from '../../context/Socket/Context';
import { roomUuid } from '../../context/Socket/Types';
import io, { Socket } from "socket.io-client"

function Connect4Page(){
  const [roomUuid, setRoomUuid] = useState<roomUuid|undefined>(undefined);
  const socket = useRef<Socket>();

    useEffect(() => {
        socket.current = io(urlConnect4Backend);
    }, [])

    useEffect(() => {
        return () => {
            if (socket) socket.current.close();
        };
    }, [socket]);

  const makeNewRoom = () => {
    // Generate links for P1 P2 and spectator
    socket.current.emit("new_room", (msg: string) => {
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
        <button onClick={makeNewRoom}>New room</button>
        <RoomList roomUuid={roomUuid}/>
      </main>
    </>
  )
}

export default Connect4Page
