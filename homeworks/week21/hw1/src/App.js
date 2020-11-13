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
  margin: 50px auto;
`;
const ErrorMessage = styled.div`
  padding-top: 25px;
  font-weight: 900;
  font-size: 18px;
  color: #de3c30;
  display: none;
`;

function App() {
  const {
    getToday,
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    getAmountOfLeft,
    handleImportInputClick,
    setTodos,
    render,
    renderStatus,
    handleDeleteAll,
  } = useTodos();

  return (
    <TodolistWrap>
      <Header />
      <ErrorMessage className="error">請輸入代辦事項！</ErrorMessage>
      <AddTodo getToday={getToday()} handleAddTodo={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
          handleImportInputClick={handleImportInputClick}
          renderStatus={renderStatus}
        />
      ))}
      <Footer
        getAmountOfLeft={getAmountOfLeft}
        todos={todos}
        setTodos={setTodos}
        render={render}
        handleDeleteAll={handleDeleteAll}
      />
    </TodolistWrap>
  );
}
export default App;
