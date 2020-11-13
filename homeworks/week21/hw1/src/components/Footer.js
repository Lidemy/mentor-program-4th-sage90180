import styled from "styled-components";
import { YellowLight, Brown } from "../constants/globalStyle";

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: dashed 3px #ccc;
`;
const LeftTodo = ({ className, content, count }) => (
  <div className={className}>
    {content}
    <span>{count}</span>
  </div>
);

const StyleLeftTodo = styled(LeftTodo)`
  color: ${Brown};
  font-weight: 700;
  font-size: 18px;
  width: 110px;
  text-align: justify;
`;
const FilterBtn = ({ className, content, onClick }) => (
  <div className={className} onClick={onClick}>
    {content}
  </div>
);
const FilterBtnsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyleFilterBtn = styled(FilterBtn)`
  color: ${Brown};
  font-weight: 700;
  font-size: 18px;
  padding: 5px 10px;
  margin: 0px 5px;
  border: solid 2px ${YellowLight};
  cursor: pointer;
  &:hover {
    border: solid 2px ${Brown};
    box-shadow: 0px 0px 0px 3px rgba(255, 190, 0, 0.5);
  }
  &.active {
    border: solid 2px ${Brown};
    box-shadow: 0px 0px 0px 3px rgba(255, 190, 0, 0.5);
  }
`;

function Footer({ getAmountOfLeft, render, handleDeleteAll }) {
  return (
    <Wrap>
      <StyleLeftTodo content="代辦事項：" count={getAmountOfLeft()} />
      <FilterBtnsWrap>
        <StyleFilterBtn
          className="active"
          content="顯示全部"
          onClick={(e) => render(e, "all")}
        />
        <StyleFilterBtn
          content="已完成"
          onClick={(e) => render(e, "completed")}
        />
        <StyleFilterBtn content="未完成" onClick={(e) => render(e, "active")} />
      </FilterBtnsWrap>
      <StyleFilterBtn content="全部刪除" onClick={handleDeleteAll} />
    </Wrap>
  );
}
export default Footer;
