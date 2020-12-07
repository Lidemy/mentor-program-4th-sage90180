import styled from "styled-components";
import Square from "./Square";
import { useState } from "react";
import calculateWinner from "./calculateWinner";

const GameWrap = styled.div``;
const PlayerStatus = styled.div`
  font-size: 23px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .restart-btn {
    font-size: 20px;
    font-weight: 500;
    border: solid 2px white;
    padding: 5px 10px;
    letter-spacing: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }
`;
const BoardWrap = styled.div`
  width: 570px;
  height: 570px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 570px;
    height: 570px;
    border: solid 15px #777;
    z-index: 1;
  }
`;
function Game() {
  const [squares, setSquares] = useState(Array(19).fill(Array(19).fill(null)));
  const [xIsNext, setXisNext] = useState(true);
  // 計算是否有贏家
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "獲勝者：" + (winner === "black" ? "黑子" : "白子");
  } else {
    status = "下一位： " + (xIsNext ? "黑子" : "白子");
  }
  // 下棋
  const handleChessClick = (x, y, xIsNext) => {
    const newBoard = JSON.parse(JSON.stringify(squares));
    setSquares(newBoard);
    if (calculateWinner(newBoard)) {
      return;
    }
    if (newBoard[x][y] === null) {
      newBoard[x][y] = xIsNext ? "black" : "white";
      setXisNext((xIsNext = !xIsNext));
    }
  };
  // 開新局
  const restart = () => {
    setSquares(Array(19).fill(Array(19).fill(null)));
    setXisNext(true);
  };
  return (
    <GameWrap>
      <PlayerStatus>
        <div>{status}</div>
        <div className="restart-btn" onClick={restart}>
          開新局
        </div>
      </PlayerStatus>
      <BoardWrap>
        {squares.map((square, indexY) =>
          square.map((eachSquare, indexX) => (
            <Square
              key={indexX}
              value={squares[indexX][indexY]}
              handleClick={() => handleChessClick(indexX, indexY, xIsNext)}
            />
          ))
        )}
      </BoardWrap>
    </GameWrap>
  );
}
export default Game;
