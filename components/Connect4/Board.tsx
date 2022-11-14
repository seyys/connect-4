import styles from "../../styles/Connect4.module.css"
import Cell from "./Cell";
import fallbackAvatar from "../../public/static/images/Connect4/avatar-doge.png"

function Board({ avatars, playerColours, board, winCoords, setHoverCol = (_) => { }, move = (_) => { } }) {
  if (board === undefined) {
    return <></>
  }

  return (
    <div className={styles.board} onMouseOut={() => setHoverCol(null)}>
      {board.map((row, i) => {
        return (
          <>
            {row.map((cell, j) => {
              let winningCell: boolean = false;
              if (winCoords) {
                winningCell = winCoords.some((x: number[][]) => JSON.stringify(x) === JSON.stringify([i, j]));
              }
              return (
                <div className={styles.cell} style={{
                  gridColumn: j + 1,
                  gridRow: i + 1,
                  backgroundColor: winningCell ? "green" : "bisque"
                }}
                  onClick={() => move(j)}
                  onMouseOver={() => setHoverCol(j)}
                >
                  <Cell
                    avatar={(avatars && avatars.hasOwnProperty(cell)) ? avatars[cell] : fallbackAvatar}
                    colour={(playerColours && playerColours.hasOwnProperty(cell)) ? playerColours[cell] : "black"}
                    player={cell}
                  />
                </div>
              )
            })}
          </>
        )
      })}
    </div>
  );
}

export default Board;