import styled from "styled-components";

const SquareWrap = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 999;
  cursor: crosshair;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
  }
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    background: #777;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &:after {
    content: "";
    height: 100%;
    width: 1px;
    background: #777;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .white {
    width: 25px;
    height: 25px;
    background: radial-gradient(
      circle at 35% 25%,
      white 0%,
      #eee 30%,
      #ccc 60%,
      #bbb 80%,
      #aaa 95%,
      #999 100%
    );
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    z-index: 997;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
  .black {
    width: 23px;
    height: 23px;
    background: radial-gradient(
      circle at 35% 25%,
      #999 0%,
      #000 90%,
      #666 95%,
      #999 100%
    );
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    z-index: 998;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
`;

function Square({ value, handleClick }) {
  return (
    <SquareWrap onClick={handleClick}>
      <div className={value}></div>
    </SquareWrap>
  );
}
export default Square;
