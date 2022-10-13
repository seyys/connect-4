import Head from 'next/head'
import Link from 'next/link'

function IndexPage(){
    return(
      <div>
        <Head>
          <title>Home Page</title>
        </Head>
        <main>
          <h1>Home Page</h1>
          <Link href="/connect4">
            <a>Connect 4</a>
          </Link>
        </main>
      </div>
    )
  }
  
  export default IndexPage
  