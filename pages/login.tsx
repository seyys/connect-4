import { useContext, useState } from "react"
import UserContextProvider, { UserContext } from "../context/UserContext";

function LoginPage(){
    const [ user, setUser ] = useState<string|undefined>(undefined);
    const { username, setUsername } = useContext(UserContext);
    console.log("1",username);
    const submit = (e) => {
        e.preventDefault();
        console.log("2",user);
        setUsername(user);
    };
    return(
        <UserContextProvider>
            <div>
            <main>
                <form onSubmit={submit}>
                    <label onClick={() => console.log(username)}>User name</label>
                    <input type="text" defaultValue={ username ? username : '' } onChange={(e) => setUser(e.target.value)} />
                    <input type="submit" value="Set username" />
                </form>
            </main>
            </div>
        </UserContextProvider>
    );
  };
  
  export default LoginPage;
  