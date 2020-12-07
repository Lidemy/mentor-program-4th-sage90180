import { YellowLight } from "./constants/globalStyle";
import styled from "styled-components";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import Footer from "./components/Footer";
import useTodos from "./useTodos";

const TodolistWrap = styled.div`
  width: 100%;
  text-align: center;
  box-shadow: 0px 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: ${YellowLight};
  max-width: 700px;
  min-width: 600px;
  margin: 50px auto;
`;
const ErrorMessage = styled.div`
  padding-top: 25px;
  font-weight: 900;
  font-size: 18px;
  color: #de3c30;
`;

function App() {
  const {
    getToday,
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    getAmountOfLeft,
    handleTodoInputChange,
    setTodos,
    render,
    renderStatus,
    handleDeleteAll,
    getErrorMessage,
    handleInputFocus,
    handleDateFocus,
    handleTodoDateChange,
  } = useTodos();

  return (
    <TodolistWrap>
      <Header />
      {getErrorMessage && (
        <ErrorMessage className="error">請輸入代辦事項！</ErrorMessage>
      )}
      <AddTodo
        getToday={getToday()}
        handleAddTodo={handleAddTodo}
        handleInputFocus={handleInputFocus}
      />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
          handleTodoInputChange={handleTodoInputChange}
          renderStatus={renderStatus}
          handleInputFocus={handleInputFocus}
          handleDateFocus={handleDateFocus}
          handleTodoDateChange={handleTodoDateChange}
        />
      ))}
      <Footer
        getAmountOfLeft={getAmountOfLeft}
        todos={todos}
        setTodos={setTodos}
        render={render}
        handleDeleteAll={handleDeleteAll}
        renderStatus={renderStatus}
      />
    </TodolistWrap>
  );
}
export default App;
