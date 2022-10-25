import styles from "../../styles/Connect4.module.css"

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
              let ii = i + 1; // Need to do this because 0 indexing breaks the grid
              let jj = j + 1; // Need to do this because 0 indexing breaks the grid
              return (
                <div className={styles.cell} style={{gridColumn: jj, gridRow: ii}} onClick={() => move(j)}>
                  {cell}
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