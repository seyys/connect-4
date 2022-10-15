import Router from "next/router";
import { useContext, useState } from "react"
import UserContextProvider, { UserContext } from "../context/UserContext";

function LoginPage(){
    const { username, setUserInfo } = useContext(UserContext);
    const [ user, setUser ] = useState<string>('');

    const submit = (e) => {
        e.preventDefault();
        setUserInfo(user);
        Router.push('/');
    };

    return(
        <>
            <form onSubmit={submit}>
                <label onClick={() => console.log(username)}>User name</label>
                <input type="text" defaultValue={ username ? username : '' } onChange={(e) => setUser(e.target.value)} />
                <input type="submit" value="Set username" />
            </form>
        </>
    );
  }
  
  export default LoginPage;
  