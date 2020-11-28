import React, { useState, useContext } from "react";
import styled from "styled-components";
import { signUp, getMe } from "../../WebAPI";
import { setAuthToken, handleInputFocus } from "../../utils";
import { AuthContext } from "../../contexts";

import { useHistory } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;
const Form = styled.form`
  text-align: center;
  margin-top: 50px;
`;
const InputGroup = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: #333;
  margin-bottom: 15px;
  input {
    margin-left: 10px;
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 20px;
    border: solid 2px #888;
    box-shadow: 5px 5px 0px #ccc;
    background: white;
  }
`;
const Button = styled.button`
  border: solid 2px #888;
  border-radius: 30px;
  padding: 5px 10px;
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

export default function SignUpPage() {
  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessaged] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    signUp(nickname, username, password)
      .then((data) => {
        if (data.ok === 0) {
          return setErrorMessaged(data.message);
        }
        setAuthToken(data.token);
        getMe().then((res) => {
          if (res.ok !== 1) {
            setAuthToken(null);
            setIsLoading(false);
            return setErrorMessaged(res.toString());
          }
          setUser(res.data);
          history.push("/");
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessaged(err.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        暱 稱
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onFocus={() => handleInputFocus(setErrorMessaged, setIsLoading)}
          type="text"
        />
      </InputGroup>
      <InputGroup>
        帳 號
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => handleInputFocus(setErrorMessaged, setIsLoading)}
          type="text"
        />
      </InputGroup>
      <InputGroup>
        密 碼
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleInputFocus(setErrorMessaged, setIsLoading)}
          type="password"
        />
      </InputGroup>
      {errorMessage && <ErrorMessage>錯誤：{errorMessage}</ErrorMessage>}
      <Button>註 冊</Button>
    </Form>
  );
}
