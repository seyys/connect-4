import Image from "next/image";
import fallbackAvatar from "../../public/static/images/Connect4/avatar-doge.png"
import styles from "../../styles/Connect4.module.css"

function Cell({ avatars, player }){
    const colour = player == 1 ? "blue" : "red";

    if(!player){
        return(
            <div style={{ padding: "32px" }} />
        )
    }
    
    let avatar: any;
    if(avatars && avatars.hasOwnProperty(player)){
        avatar = avatars[player].replace(/"/g,''); // Need to figure out why response is bracketted by "
        console.log("avatar",avatar);
    }else{
        avatar = fallbackAvatar;
    }

    return (
        <div>
            <div className={styles.cellTokenPlayer} style={{ border: "5px solid", borderColor: colour, backgroundColor: colour }}>
                <Image className={styles.cellToken} src={avatar} width="50px !important" height="50px !important"/> 
            </div>
        </div>
    )
}

export default Cell;