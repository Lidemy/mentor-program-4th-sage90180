import React, { useEffect, useState } from "react";
import Header from "../Header";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import AddPostPage from "../../pages/AddPostPage";
import PostPage from "../../pages/PostPage";
import AboutPage from "../../pages/AboutPage";
import SignUpPage from "../../pages/SignUpPage";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import styled from "styled-components";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Loading = styled.div`
  font-size: 60px;
  font-weight: 900;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMe().then((res) => {
      setIsLoading(true);
      if (res.ok) {
        setUser(res.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {isLoading && <Loading>Loading...</Loading>}
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/new-post">
            <AddPostPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/posts/:id">
            <PostPage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
