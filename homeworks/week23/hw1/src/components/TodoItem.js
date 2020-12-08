import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { YellowLight, Gray } from "../constants/globalStyle";

import { useState } from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  todoIsDone,
  updateTodo,
  updateDate,
} from "../redux/actions";

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

function TodoItem({ todo, updateTodo, updateDate, todoIsDone, deleteTodo }) {
  const [todoContent, setTodoContent] = useState(todo.content);
  const [todoDate, setTodoDate] = useState(todo.date);
  const handleDateFocus = (e) => {
    e.target.type = "date";
    e.target.style.width = "180px";
    e.target.addEventListener("blur", (e) => {
      e.target.type = "text";
      e.target.style.width = "120px";
    });
  };

  return (
    <ItemWrap $isDone={todo.isDone}>
      <TodoCheckbox
        type={"checkbox"}
        checked={todo.isDone ? "checked" : ""}
        onClick={() => todoIsDone(todo.id)}
        readOnly
      />
      <TodoDate
        $isDone={todo.isDone}
        type="text"
        value={todoDate}
        onFocus={handleDateFocus}
        onChange={(e) => {
          setTodoDate(e.target.value);
          updateDate(todo.id, e.target.value);
        }}
        disabled={todo.isDone ? "disabled" : ""}
      />
      <TodoInput
        $isDone={todo.isDone}
        type="text"
        value={todoContent}
        onChange={(e) => {
          setTodoContent(e.target.value);
          updateTodo(todo.id, e.target.value);
        }}
        disabled={todo.isDone ? "disabled" : ""}
      />
      <StyleItemBtn
        icon={faTrashAlt}
        content="刪 除"
        onClick={() => deleteTodo(todo.id)}
      />
    </ItemWrap>
  );
}

export default connect(null, {
  updateTodo,
  updateDate,
  todoIsDone,
  deleteTodo,
})(TodoItem);
