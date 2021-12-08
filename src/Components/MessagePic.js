import React from 'react'
import styled from "styled-components";

function MessagePic() {
    return (
        <Container>
            <img src="/toc2.jpg" alt="" />
        </Container>
    )
}

export default MessagePic

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: auto;
  padding-right: 4px;
  /* div {
      padding: 4px 8px;
      background-color: lightgray;
      border-radius: 10px;
  } */

  img {
      width: 82px;
      height: 100px;
      border-radius: 4px;
      margin-right: 4px;
  }
`;