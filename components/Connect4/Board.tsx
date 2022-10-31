import styles from "../../styles/Connect4.module.css"
import Cell from "./Cell";

function Board({ board, winCoords, move }) {
  if (board === undefined) {
    return <></>
  }

  return (
    <div className={styles.board}>
      {board.map((row, i) => {
        return (
          <>
            {row.map((cell, j) => {
              let winningCell: boolean = false;
              if(winCoords){
                winningCell = winCoords.some((x: number[][]) => JSON.stringify(x) === JSON.stringify([i, j]));
              }
              return (
                <div className={styles.cell} style={{
                    gridColumn: j+1,
                    gridRow: i+1,
                    backgroundColor: winningCell ? "green" : "bisque"
                  }} onClick={() => move(j)}>
                  <Cell player={cell}/>
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