import { Yellow, Brown } from "../constants/globalStyle";
import styled from "styled-components";

const TodoTitle = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: ${Brown};
  background: ${Yellow};
  padding: 20px 0px;
  border-bottom: solid 5px ${Brown};
`;

function Header() {
  return <TodoTitle>To-Do-List</TodoTitle>;
}
export default Header;
