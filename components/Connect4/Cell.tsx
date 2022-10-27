import Image from "next/image";
import avatar from "../../public/static/images/Connect4/avatar-doge.png"
import styles from "../../styles/Connect4.module.css"

function Cell({ player }){
    return (
        <div>
            <div className={styles.cellTokenPlayer}>
                <Image className={styles.cellToken} src={avatar} width="100px" height="100px"/> 
            </div>
        </div>
    )
}

export default Cell;