import Head from 'next/head';
import Link from 'next/link';
import Board from '../components/Board';
import Socket from '../components/Socket';

const ENDPOINT: string = "ws://127.0.0.1:8080";

function IndexPage(){
  const socket = Socket(ENDPOINT);
  socket.connect();
  socket.on("connect", () => console.log("Connected")); // Debug
  return(
    <div>
      <Head>
        <h1>Connect 4</h1>
      </Head>
      <main>
        <Board />
      </main>
    </div>
  )
}

export default IndexPage
