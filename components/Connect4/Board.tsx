import styles from "../../styles/Connect4.module.css"
import Cell from "./Cell";

function Board({ board, move }) {
  if (board === undefined) {
    return <></>
  }

  return (
    <div className={styles.board}>
      {board.map((row, i) => {
        return (
          <>
            {row.map((cell, j) => {
              // 0 indexing breaks the grid
              return (
                <div className={styles.cell} style={{gridColumn: j+1, gridRow: i+1}} onClick={() => move(j)}>
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