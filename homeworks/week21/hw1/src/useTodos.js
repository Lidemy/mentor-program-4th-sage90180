import { useState, useRef, useEffect } from "react";

export default function useTodos() {
  // 時間設定
  const getToday = () => {
    var today = new Date();
    return today.toLocaleDateString().replace(/\//g, "-");
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
  const [getErrorMessage, setGetErrorMessage] = useState(null);
  const handleAddTodo = (newTodo, date, setNewInput) => {
    if (!newTodo) {
      setGetErrorMessage(true);
      return getErrorMessage;
    }
    setGetErrorMessage(false);
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

  // 編輯

  const handleTodoInputChange = (e, itemEvent, setItemEvent, id) => {
    setItemEvent(e.target.value);
    e.target.addEventListener("blur", (e) => {
      if (!e.target.value) {
        setGetErrorMessage(true);
        return;
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
  };

  // 編輯日期
  const handleTodoDateChange = (e, dateInput, setDateInput, id) => {
    setDateInput(e.target.value);
    setTodos(
      todos.map((importTodo) => {
        if (importTodo.id !== id) return importTodo;
        return {
          ...importTodo,
          date: dateInput,
        };
      })
    );
  };

  // inputFocus
  const handleInputFocus = (e) => {
    setGetErrorMessage(false);
  };

  // dateFocus
  const handleDateFocus = (e) => {
    e.target.type = "date";
    e.target.addEventListener("blur", (e) => {
      e.target.type = "text";
    });
    setGetErrorMessage(false);
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

  // 渲染畫面，全部 / 已完成 / 未完成
  const [renderStatus, setRenderStatus] = useState("all");
  const render = (e, status) => {
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
    handleTodoInputChange,
    render,
    handleDeleteAll,
    renderStatus,
    getErrorMessage,
    handleInputFocus,
    handleDateFocus,
    handleTodoDateChange,
  };
}
