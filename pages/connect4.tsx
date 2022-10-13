import Head from 'next/head';
import Board from '../components/Board';
import Socket from '../components/Socket';
import { UserContext } from '../context/UserContext';

const ENDPOINT: string = "ws://127.0.0.1:8080";

function Connect4Page(){
  const socket = Socket(ENDPOINT);
  socket.connect();
  socket.on("connect", () => console.log("Connected")); // Debug
  if(!socket.active){
    return(
      <div>
        <main>
          Can't connect to server!
        </main>
      </div>
    )
  }
  return(
    <div>
      <Head>
        <title>Connect 4</title>
      </Head>
      <main>
        <h1>Connect 4 with real time multiplayer with sockets</h1>
        <Board />
      </main>
    </div>
  )
}

export default Connect4Page
