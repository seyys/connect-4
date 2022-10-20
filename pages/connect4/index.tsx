import Head from 'next/head';
import { useContext, useState } from 'react';
import RoomList from '../../components/RoomList';
import SocketContext from '../../context/Socket/Context';
import { roomUuid } from '../../context/Socket/Types';

function Connect4Page(){
  const [roomUuid, setRoomUuid] = useState<roomUuid|undefined>(undefined);
  const { socket } = useContext(SocketContext).SocketState;

  if(socket.disconnected){
    return(
      <div>
        <main>
          Can't connect to server!
        </main>
      </div>
    )
  }

  const makeNewRoom = () => {
    // Generate links for P1 P2 and spectator
    socket.emit("new_room", (msg: string) => {
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
