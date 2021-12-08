import React from "react";
import styled from "styled-components";

import { FolderIcon } from "@heroicons/react/outline";

function Message() {
  return (
    <Container>
      <img src="/toc2.jpg" alt="" />
      <div>
        <FolderIcon />
        <div>file.txt</div>
      </div>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 10px;

  div:nth-child(2) {
    background-color: lightgray;
    padding: 4px 8px;
    max-width: 10rem;
    border-radius: 8px;
    display: flex;
    svg {
      width: 32px;
      height: 32px;
      margin-right: 4px;
    }
  }
  img {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-right: 4px;
  }
  /* div {
    /* padding: 4px 8px;
    background-color: lightgray;
    border-radius: 10px; */
`;
