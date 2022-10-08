import { UserContextProvider } from "../context/userContext"

function App({ Component, pageProps }){
    return (
        <UserContextProvider>
            {...pageProps}
        </UserContextProvider>
    )
}

export default App