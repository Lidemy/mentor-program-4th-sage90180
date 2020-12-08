import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_ALL,
  TODO_IS_DONE,
  UPDATE_TODO,
  UPDATE_DATE,
  SET_FILTER,
} from "./actionTypes";

export function addTodo(content, date) {
  return {
    type: ADD_TODO,
    payload: {
      content,
      date,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function deleteAll() {
  return {
    type: DELETE_ALL,
    payload: {},
  };
}

export function todoIsDone(id) {
  return {
    type: TODO_IS_DONE,
    payload: {
      id,
    },
  };
}

export function updateTodo(id, content) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content,
    },
  };
}

export function updateDate(id, date) {
  return {
    type: UPDATE_DATE,
    payload: {
      id,
      date,
    },
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: { filter },
  };
}
