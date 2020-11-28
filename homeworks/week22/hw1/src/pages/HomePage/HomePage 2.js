import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { getPosts, getTotalPages } from "../../WebAPI";

const Root = styled.div`
  padding: 20px 10px;
`;
const PostContainer = styled(Link)`
  max-width: 1200px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border: solid 2px #888;
  border-radius: 50px;
  margin-bottom: 15px;
  box-shadow: 5px 5px 0px #ccc;
  &:hover {
    transform: translateX(-15px);
    box-shadow: 5px 5px 0px #888;
  }
`;
const PostTitle = styled.div`
  font-size: 20px;
  color: #444;
  font-weight: 900;
  text-directiom: none;
`;
const PostDate = styled.div`
  color: #444;
  font-weight: 900;
`;

const ErrorMessage = styled.div`
  color: #f95757;
  font-size: 25px;
  text-align: center;
  font-weight: 900;
  line-height: 30px;
`;

const PageContainer = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
`;
const PageLink = styled(Link)`
  border: solid 2px #888;
  background: white;
  padding: 10px;
  font-size: 25px;
  font-weight: 900;
  padding: 7px 15px;
  box-shadow: 5px 5px 0px #ccc;
  color: #888;
  display: block;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 0px #888;
  }
  &:first-child {
    border-radius: 10px 0px 0px 10px;
  }
  &:last-child {
    border-radius: 0px 10px 10px 0px;
  }
`;

function Post({ post }) {
  return (
    <PostContainer to={`/posts/${post.id}`}>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.prototype = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const pageArr = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    getPosts(page)
      .then((posts) => setPosts(posts))
      .catch((err) => {
        console.log(err);
        setApiErrorMessage(err);
      });
    getTotalPages().then((number) => setTotalPages(number));
  }, []);

  useEffect(() => {
    getPosts(page)
      .then((posts) => setPosts(posts))
      .catch((err) => {
        console.log(err);
        setApiErrorMessage(err);
      });
  }, [page]);

  return (
    <Root>
      {apiErrorMessage && (
        <ErrorMessage>
          載入失敗...<br></br>
          {apiErrorMessage.toString()}
        </ErrorMessage>
      )}
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <PageContainer>
        {pageArr.map((page) => (
          <PageLink onClick={() => setPage(page)}>{page}</PageLink>
        ))}
      </PageContainer>
    </Root>
  );
}
