import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function IndexPage(){
  const { username } = useContext(UserContext);
  return(
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <main>
        <h1>Home Page</h1>
        <ul>
          <Link href="/connect4">
            <a>Connect 4</a>
          </Link>
        </ul>
      </main>
    </div>
  )
}
  
  export default IndexPage
  