import Image from "next/image";
import avatar from "../../public/static/images/Connect4/avatar-doge.png"
import styles from "../../styles/Connect4.module.css"

function Cell({ player }){
    const colour = player == 1 ? "blue" : "red";

    if(!player){
        return(
            <div style={{ padding: "32px" }} />
        )
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