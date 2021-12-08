import React from 'react'
import styled from "styled-components";

function Message() {
    return (
        <Container>
            <img src="/toc2.jpg" alt="" />
            <div>this is message</div>
        </Container>
    )
}

export default Message

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 10px;
  div {
      padding: 4px 8px;
      background-color: lightgray;
      border-radius: 10px;
  }

  img {
      width: 42px;
      height: 42px;
      border-radius: 100%;
      margin-right: 4px;
  }
`;