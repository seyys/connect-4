import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Board from '../components/Board';
import Socket from '../components/Socket';
import { UserContext } from '../context/UserContext';

const ENDPOINT: string = "ws://127.0.0.1:8080";

function Connect4Page(){
  const router = useRouter();
  const { username, setUsername } = useContext(UserContext);
  // Check if user is logged in
  if(!username){
    router.push("/login");
  }

  const socket = Socket(ENDPOINT);
  socket.connect();

  if(socket.disconnected){
    return(
      <div>
        <main>
          Can't connect to server!
        </main>
      </div>
    )
  }
  
  return(
    <>
      <Head>
        <title>Connect 4</title>
      </Head>
      <main>
        <h1>Connect 4 with real time multiplayer with sockets</h1>
        <Board />
        <button onClick={() => setUsername(null)}>Logout</button>
      </main>
    </>
  )
}

export default Connect4Page
