import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts";
import { addPost } from "../../WebAPI";

import { useHistory } from "react-router-dom";

const Form = styled.form`
  max-width: 1200px;
  margin: auto;
  margin-top: 20px;
  padding: 10px 30px 30px 30px;
  display: flex;
  flex-direction: column;
`;

const TitleGroup = styled.div`
  display: flex;
  font-size: 25px;
  width: 100%;
  white-space: nowrap;
  align-items: center;
  input {
    width: 100%;
    height: 40px;
    border: solid 2px #888;
    border-radius: 10px;
    box-shadow: 7px 7px 0px #ccc;
    padding: 10px;
    font-size: 20px;
  }
`;

const CotentGroup = styled.div`
  display: flex;
  font-size: 25px;
  margin-top: 30px;
  width: 100%;
  white-space: nowrap;
  align-items: start;
  textarea {
    width: 100%;
    border: solid 2px #888;
    border-radius: 10px;
    box-shadow: 7px 7px 0px #ccc;
    padding: 10px;
    font-size: 20px;
  }
`;

const Button = styled.button`
  border: solid 2px #888;
  border-radius: 30px;
  padding: 8px 10px;
  box-shadow: 5px 5px 0px #ccc;
  width: 100px;
  text-align: center;
  margin: 20px auto;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    transform: translateX(10px);
    box-shadow: 5px 5px 0px #888;
  }
`;
const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;

export default function NewPostPage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessaged] = useState();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return setErrorMessaged("請先登入");
    }
    addPost(title, body).then((res) => {
      history.push("/");
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage>錯誤：{errorMessage}</ErrorMessage>}
      <TitleGroup>
        標 題：
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleGroup>
      <CotentGroup>
        內 容：
        <textarea
          rows="10"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </CotentGroup>
      <Button>送 出</Button>
    </Form>
  );
}
