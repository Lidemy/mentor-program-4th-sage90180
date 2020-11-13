import { Yellow, Brown } from "../constants/globalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useInput from "../useInput";

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
function AddTodo({ getToday, handleAddTodo }) {
  const {
    value: newTodo,
    setValue: setNewInput,
    handleChange: handleNewInput,
  } = useInput();
  const {
    value: date,
    setValue: setDate,
    handleChange: hadleDate,
  } = useInput();

  return (
    <AddTodoWrap>
      <TodoInput
        type="date"
        value={date ? date : getToday}
        onChange={hadleDate}
      />
      <TodoInput
        type="text"
        name="newTodo"
        value={newTodo}
        onChange={handleNewInput}
        placeholder="請輸入代辦事項"
      />
      <AddBtn
        onClick={() => {
          handleAddTodo(newTodo, date ? date : getToday, setNewInput);
        }}
      >
        <FontAwesomeIcon className="icon" icon={faPlus} /> 新 增
      </AddBtn>
    </AddTodoWrap>
  );
}
export default AddTodo;
