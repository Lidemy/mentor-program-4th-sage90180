import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { YellowLight, Gray } from "../constants/globalStyle";
import { useState } from "react";

const ItemWrap = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & + & {
    border-top: dashed 1px #ddd;
  }

   {
    /* 判斷要顯示哪些 */
  }
  ${(props) =>
    props.$renderStatus === "uncompleted"
      ? props.$isDone && "display: none"
      : ""}
  ${(props) =>
    props.$renderStatus === "completed"
      ? !props.$isDone && "display: none"
      : ""}
`;
const TodoCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;
const TodoDate = styled.input`
  border: solid 3px ${YellowLight};
  background: ${YellowLight};
  padding: 2px 5px;
  width: 120px;
  font-size: 16px;
  color: ${Gray};
  font-weight: 900;
  font-size: 18px;
  height: 31px;
  ${(props) =>
    props.$isDone &&
    `
  text-decoration: line-through;
  opacity: .6;
`}
  &:focus {
    outline: none;
    background: white;
    border: solid 3px white;
    width: 180px;
  }
  &.active {
    border: solid 3px #ffe38c;
    background: white;
  }
`;
const TodoInput = styled.input`
  border: solid 3px ${YellowLight};
  background: ${YellowLight};
  padding: 2px 5px;
  width: 60%;
  font-size: 16px;
  color: ${Gray};
  font-weight: 900;
  font-size: 18px;
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    opacity: .6;
  `}
  &:focus {
    outline: none;
    background: white;
    border: solid 3px white;
  }
  &.active {
    border: solid 3px #ffe38c;
    background: white;
  }
`;

const ItemBtn = ({ className, content, icon, onClick }) => (
  <div className={className} onClick={onClick}>
    <FontAwesomeIcon className="icon" icon={icon} />
    {content}
  </div>
);

const StyleItemBtn = styled(ItemBtn)`
  color: ${Gray};
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
  min-width: 65px;
  .icon {
    color: ${Gray};
    font-weight: 500;
    margin-right: 5px;
    transition: 0.3s;
  }
  &:hover {
    .icon {
      transform: scale(1.2);
    }
  }
`;

function TodoItem({
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
  handleTodoInputChange,
  renderStatus,
  handleInputFocus,
  handleDateFocus,
  handleTodoDateChange,
}) {
  const [itemEvent, setItemEvent] = useState(todo.content);
  const [dateInput, setDateInput] = useState(todo.date);

  return (
    <ItemWrap
      $data-id={todo.id}
      $isDone={todo.isDone}
      $renderStatus={renderStatus}
    >
      <TodoCheckbox
        type="checkbox"
        checked={todo.isDone ? "checked" : ""}
        onClick={() => handleToggleIsDone(todo.id)}
        readOnly
      />
      <TodoDate
        onFocus={handleDateFocus}
        $isDone={todo.isDone}
        type="text"
        value={todo.date}
        onChange={(e) => {
          handleTodoDateChange(e, dateInput, setDateInput, todo.id);
        }}
        disabled={todo.isDone ? "disabled" : ""}
      />
      <TodoInput
        type="text"
        $isDone={todo.isDone}
        value={itemEvent}
        onFocus={handleInputFocus}
        onChange={(e) => {
          handleTodoInputChange(e, itemEvent, setItemEvent, todo.id);
        }}
        disabled={todo.isDone ? "disabled" : ""}
      />
      <StyleItemBtn
        icon={faTrashAlt}
        content="刪 除"
        onClick={() => handleDeleteTodo(todo.id)}
      />
    </ItemWrap>
  );
}
export default TodoItem;
