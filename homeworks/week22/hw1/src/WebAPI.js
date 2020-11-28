import { getAuthToken } from "./utils";
const Base_URL = "https://student-json-api.lidemy.me";

export const getPosts = (page) => {
  return fetch(
    `${Base_URL}/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
  ).then((res) => res.json());
};

export const getPost = (id) => {
  return fetch(`${Base_URL}/posts?id=${id}`).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${Base_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${Base_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${Base_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const signUp = (nickname, username, password) => {
  return fetch(`${Base_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getTotalPages = () => {
  return fetch(`${Base_URL}/posts`)
    .then((res) => res.json())
    .then((posts) => Math.ceil(posts.length / 5));
};
