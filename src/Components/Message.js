import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProfile } from "../features/messageSlice";
import { friend} from "../features/messageSlice";

function Message({ message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  return (
    <Container className={`${isSelfMess ? "checkMessage" : ""}`}>
      {!isSelfMess && <img src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <div>{message.content}</div>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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