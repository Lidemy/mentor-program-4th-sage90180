function calculateWinner (squares) {
  for (let x = 0; x < 19; x++) {
    for (let y = 0; y < 15; y++) {
      if (
        squares[0 + x][0 + y] !== null &&
        squares[0 + x][0 + y] === squares[0 + x][1 + y] &&
        squares[0 + x][0 + y] === squares[0 + x][2 + y] &&
        squares[0 + x][0 + y] === squares[0 + x][3 + y] &&
        squares[0 + x][0 + y] === squares[0 + x][4 + y]
        ) {
        return squares[0 + x][0 + y]
      }
    }
  }
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 19; y++) {
      if (
        squares[0 + x][0 + y] !== null &&
        squares[0 + x][0 + y] === squares[1 + x][0 + y] &&
        squares[0 + x][0 + y] === squares[2 + x][0 + y] &&
        squares[0 + x][0 + y] === squares[3 + x][0 + y] &&
        squares[0 + x][0 + y] === squares[4 + x][0 + y]
        ) {
        return squares[0 + x][0 + y]
      }
    }
  }
  // 斜線 1 
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      if (
        squares[0 + x][0 + y] !== null &&
        squares[0 + x][0 + y] === squares[1 + x][1 + y] &&
        squares[0 + x][0 + y] === squares[2 + x][2 + y] &&
        squares[0 + x][0 + y] === squares[3 + x][3 + y] &&
        squares[0 + x][0 + y] === squares[4 + x][4 + y]
        ) {
        console.log(squares[0 + x][0 + y])
        return squares[0 + x][0 + y]
      }
    }
  }
  // 斜線 2
  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      if (
        squares[0 + x][4 + y] !== null &&
        squares[0 + x][4 + y] === squares[1 + x][3 + y] &&
        squares[0 + x][4 + y] === squares[2 + x][2 + y] &&
        squares[0 + x][4 + y] === squares[3 + x][1 + y] &&
        squares[0 + x][4 + y] === squares[4 + x][0 + y]
        ) {
        return squares[0 + x][4 + y]
      }
    }
  }
  return null
}
export default calculateWinner;