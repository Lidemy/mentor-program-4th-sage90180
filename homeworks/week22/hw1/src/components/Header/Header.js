import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

import { Link, useLocation, useHistory } from "react-router-dom";

const HeaderWrap = styled.div`
  background: black;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: black;
  color: white;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
`;

const LeftConntainer = styled.div`
  display: flex;
`;
const Brand = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin: 10px 10px 10px 0px;
  color: #ff7601;
  font-family: "Permanent Marker", cursive;
`;
const NavbarList = styled.div`
  display: flex;
  margin-left: auto;
`;
const Nav = styled(Link)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin: 10px 5px;
  cursor: pointer;
  border: solid 1px black;
  transition: 0.3s;
  color: white;
  text-directiom: none;
  white-space: nowrap;
  &:hover {
    border: solid 1px white;
  }
  ${(props) =>
    props.$active &&
    `
    border: solid 1px white;
  `}
`;

export default function Header() {
  const location = useLocation().pathname;
  const history = useHistory();
  const { user, setUser, isLoading } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LeftConntainer>
          <Brand>HiHi React</Brand>
          <NavbarList>
            <Nav to="/" $active={location === "/"}>
              首頁
            </Nav>
            <Nav to="/about" $active={location === "/about"}>
              有關於我
            </Nav>
            {user && (
              <Nav to="/new-post" $active={location === "/new-post"}>
                發布文章
              </Nav>
            )}
          </NavbarList>
        </LeftConntainer>
        {isLoading ? null : (
          <NavbarList>
            {!user && (
              <Nav to="/sign-up" $active={location === "/sign-up"}>
                註冊
              </Nav>
            )}
            {!user && (
              <Nav to="/login" $active={location === "/login"}>
                登入
              </Nav>
            )}
            {user && <Nav>你好！{user.nickname}</Nav>}
            {user && <Nav onClick={handleLogout}>登出</Nav>}
          </NavbarList>
        )}
      </HeaderContainer>
    </HeaderWrap>
  );
}
