import styles from "../../styles/Connect4.module.css"
import fallbackAvatar from "../../public/static/images/Connect4/avatar-doge.png"
import Cell from "./Cell";

function HoverRow({ board, avatars, playerColours, thisPlayer, playerTurn, hoverCol }) {
  if (board === undefined) {
    return <></>
  }

  const avatar = (avatars && avatars.hasOwnProperty(thisPlayer)) ? avatars[thisPlayer] : fallbackAvatar;
  const colour = (playerColours && playerColours.hasOwnProperty(thisPlayer)) ? playerColours[thisPlayer] : "black";

  return (
    <div className={styles.hoverRow}>
      {
        board[0].map((_, i) => {
          console.log(hoverCol)
          return (
            <div className={styles.cell} style={{
              gridColumn: i + 1,
              gridRow: 1
            }}>
              <Cell avatar={avatar} colour={colour} player={playerTurn && (i == hoverCol)} />
            </div>
          )
        })
      }
    </div>
  )
}

export default HoverRow;