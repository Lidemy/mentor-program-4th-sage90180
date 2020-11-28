import styled from "styled-components";

const AboutWrap = styled.div`
  max-width: 1200px;
  margin: auto;
  border: solid 2px #888;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 10px 10px 0px #ccc;
  padding: 20px;
  display: flex;
  font-size: 40px;
  color: #555;
`;
const Thumbnail = styled.div`
  width: 200px;
  height: 300px;
  border: solid 2px #888;
  margin-right: 20px;
`;

export default function AboutPage() {
  return (
    <AboutWrap>
      <Thumbnail></Thumbnail>
      修建中...
    </AboutWrap>
  );
}
