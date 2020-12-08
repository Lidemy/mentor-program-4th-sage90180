import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_ALL,
  TODO_IS_DONE,
  UPDATE_TODO,
  UPDATE_DATE,
} from "../actionTypes";

let todoData = JSON.parse(window.localStorage.getItem("todos"));
let todoId = 1;
let initalState = { todos: [] };

// 確認 localStorage 有無資料
if (todoData.length > 1) {
  todoId = todoData[todoData.length - 1].id + 1;
  initalState = { todos: todoData };
}

export default function todosReducer(state = initalState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            isDone: false,
            content: action.payload.content,
            date: action.payload.date,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case DELETE_ALL: {
      return { todos: [] };
    }
    case TODO_IS_DONE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            content: action.payload.content,
          };
        }),
      };
    }
    case UPDATE_DATE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            date: action.payload.date,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
}
