import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPost } from "../../WebAPI";

import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

const PostWrap = styled.div`
  max-width: 1200px;
  margin: auto;
  border: solid 2px #888;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 10px 10px 0px #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const PostTitile = styled.div`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 15px;
`;

const CreatedAt = styled.div`
  color: #888;
  font-weight: bold;
  padding: 10px 0px;
  border-bottom: solid 1px #ddd;
`;
const PostContent = styled.div`
  padding: 15px 0px;
  border-bottom: solid 1px #ddd;
  line-height: 26px;
  color: #333;
`;

const Button = styled(Link)`
  border: solid 2px #888;
  border-radius: 20px;
  padding: 8px 10px;
  box-shadow: 5px 5px 0px #ccc;
  max-width: 100px;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    transform: translateX(-10px);
    box-shadow: 5px 5px 0px #888;
  }
`;

export default function PostPage() {
  let history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    getPost(id).then((post) => setPost(post[0]));
  }, [id]);
  return (
    <PostWrap>
      <PostTitile>{post.title}</PostTitile>
      <CreatedAt>{new Date(post.createdAt).toLocaleString()}</CreatedAt>
      <PostContent>{post.body}</PostContent>
      <Button onClick={() => history.goBack()}>上一頁</Button>
    </PostWrap>
  );
}
