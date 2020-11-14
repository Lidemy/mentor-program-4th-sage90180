import { useState, useRef, useEffect } from "react";

export default function useTodos() {
  // 時間設定
  const getToday = () => {
    var today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    return year + "-" + month + "-" + date;
  };

  // 載入 todos
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = JSON.parse(window.localStorage.getItem("todos"));
    if (todoData && todoData[0] !== undefined) {
      id.current = todoData[0].id + 1;
      return todoData;
    }
    return [];
  });

  // 資料寫進 localStorage
  const saveToLocalStorage = (todos) => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };
  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  // 新增
  const handleAddTodo = (newTodo, date, setNewInput) => {
    if (!newTodo) {
      document.querySelector(".error").style.display = "block";
      return;
    } else {
      document.querySelector(".error").style.display = "none";
    }
    setTodos([
      {
        id: id.current,
        isDone: false,
        date: date ? date : getToday,
        content: newTodo,
      },
      ...todos,
    ]);
    setNewInput("");
    id.current++;
  };

  // 刪除
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 按已完成
  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  // 代辦數目
  const getAmountOfLeft = () => {
    let sum = 0;
    for (let todo of todos) {
      if (todo.isDone === false) {
        sum += 1;
      }
    }
    return sum;
  };

  // 現有 todo 更新
  const handleTodoInputClick = (e, itemEvent, setItemEvent, id) => {
    setItemEvent(e.target.value);
    e.target.addEventListener("blur", (e) => {
      if (!e.target.value) {
        return (document.querySelector(".error").style.display = "block");
      }
    });
    setTodos(
      todos.map((importTodo) => {
        if (importTodo.id !== id) return importTodo;
        return {
          ...importTodo,
          content: itemEvent,
        };
      })
    );
    document.querySelector(".error").style.display = "none";
  };

  // 按鈕樣式改變
  const changeActiveBtnClass = (e) => {
    const sibilings = e.target.parentElement.childNodes;
    for (let sibiling of sibilings) {
      sibiling.classList.remove("active");
    }
    e.target.classList.add("active");
  };

  // 渲染畫面，全部 / 已完成 / 未完成
  const [renderStatus, setRenderStatus] = useState("");
  const render = (e, status) => {
    changeActiveBtnClass(e);
    setRenderStatus(status);
  };

  // 刪除全部
  const handleDeleteAll = () => {
    setTodos([]);
  };

  return {
    getToday,
    todos,
    setTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleIsDone,
    getAmountOfLeft,
    handleTodoInputClick,
    render,
    handleDeleteAll,
    renderStatus,
  };
}
