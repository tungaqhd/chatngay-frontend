import React from "react";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import Message from "../Message";
import MessagePic from "../MessagePic";
import MessageFolder from "../MessageFolder";

function Content() {
  return (
    <Container>
      <ChatBox>
        <Title>
          <div>Group Chat</div>
          <span>Messages</span>
          <span>Participants</span>
        </Title>
        <div className="message">
          <Message />
          <Message />
          <Message />
          <MessagePic />
          <MessageFolder />
        </div>
        <Search>
          <input type="text" />
          <PaperAirplaneIcon />
        </Search>
      </ChatBox>
    </Container>
  );
}

export default Content;

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 1rem 0;
`;
const ChatBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #edf0f5;
  border-radius: 0.6rem;
  position: relative;

  .message {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-st;
  }
`;

const Search = styled.div`
  position: absolute;
  width: 100%;
  bottom: 4%;
  left: 4%;
  right: 0;

  svg {
    position: absolute;
    bottom: 10%;
    right: 9%;
    padding: 0.4rem;
    color: white;
    background-color: green;
    border-radius: 1rem;
    width: 22px;
    height: 22px;
  }

  input {
    width: 84%;
    padding: 1rem 2rem;
    border-radius: 0.8rem;
    border: none;
  }
`;
const Title = styled.div`
  display: flex;
  padding: 1.4rem 1rem;
  width: 100%;
  height: 36px;
  /* border-bottom: 2px solid lightgray; */

  div {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
  }
  span {
    padding: 0.2rem 1rem;
    border-radius: 0.6rem;
    margin-left: 1rem;
  }
  span:last-child {
    background-color: lightgreen;
  }
`;
