import { YellowLight } from "./constants/globalStyle";
import styled from "styled-components";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import Footer from "./components/Footer";

import { useEffect } from "react";

import { connect } from "react-redux";

const TodolistWrap = styled.div`
  width: 100%;
  text-align: center;
  box-shadow: 0px 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: ${YellowLight};
  max-width: 700px;
  min-width: 600px;
  margin: 50px auto;
`;

function App({ todos, activeFilter }) {
  // todos 變動就儲存
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  todos = todos.filter((todo) => {
    if (activeFilter === "all") return true;
    return activeFilter === "uncompleted" ? !todo.isDone : todo.isDone;
  });

  return (
    <TodolistWrap>
      <Header />
      <AddTodo />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <Footer />
    </TodolistWrap>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoState.todos,
    activeFilter: state.visibilityFilter,
  };
};
export default connect(mapStateToProps, null)(App);
