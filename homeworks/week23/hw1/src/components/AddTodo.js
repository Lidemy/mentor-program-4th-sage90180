import { Yellow, Brown } from "../constants/globalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { useState } from "react";

import { addTodo } from "../redux/actions";
import { connect } from "react-redux";

const AddTodoWrap = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
`;
const TodoInput = styled.input`
  border: solid 3px ${Brown};
  padding: 2px 5px;
  width: 40%;
  font-size: 16px;
  &:hover {
    box-shadow: 0px 0px 0px 3px #ffe38c;
  }
  &:focus {
    outline: none;
    border: solid 3px ${Brown};
  }
`;
const AddBtn = styled.button`
  background: ${Brown};
  padding: 5px 10px;
  width: 100px;
  color: white;
  font-weight: 900;
  border: none;
  font-size: 16px;
  cursor: pointer;
  .icon {
    transition: 0.3s;
    margin-right: 5px;
  }
  &:hover {
    color: white;
    box-shadow: 0px 0px 0px 3px rgba(${Yellow}, 0.5);
    .icon {
      transform: scale(1.3);
    }
  }
`;
function AddTodo({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState("");
  const getToday = () => {
    var today = new Date();
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);
    return `${today.getFullYear()}-${month}-${day}`;
  };
  return (
    <AddTodoWrap>
      <TodoInput
        type="date"
        value={newDate ? newDate : getToday()}
        onChange={(e) => {
          setNewDate(e.target.value);
        }}
      />
      <TodoInput
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        type="text"
        name="newTodo"
        placeholder="請輸入代辦事項..."
      />
      <AddBtn
        onClick={() => {
          if (newTodo === "") {
            return;
          }
          addTodo(newTodo, newDate ? newDate : getToday());
          setNewTodo("");
        }}
        className="icon"
        icon={faPlus}
      >
        <FontAwesomeIcon icon={faPlus} /> 新 增
      </AddBtn>
    </AddTodoWrap>
  );
}

export default connect(null, { addTodo })(AddTodo);
