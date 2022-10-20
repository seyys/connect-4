import { AppProps } from 'next/app'
import { useContext } from 'react'
import Layout from '../components/Layout'
import SocketContextComponent from '../context/Socket/Component';
import SocketContext from '../context/Socket/Context'

export default function App({ Component, pageProps }: AppProps) {
  const { socket, uuid, username } = useContext(SocketContext).SocketState;
  return (
    <SocketContextComponent>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SocketContextComponent>
  )
}