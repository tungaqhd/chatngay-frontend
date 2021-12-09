import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProfile } from "../features/messageSlice";
import { friend} from "../features/messageSlice";
import moment from 'moment'

function Message({ message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  const timeClass = isSelfMess ? "self-time":"friend-time";
  return (
    <Container className={`${isSelfMess ? "checkMessage" : ""}`}>
      <div className="msg-data">
      {!isSelfMess && <img src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <div className="msg-content">{message.content}</div>
      </div>
      <p className={timeClass}>{moment(message.createdAt).format("hh:mm")}</p>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  .msg-data {
    display: flex;
  }
  .msg-content {
    padding: 4px 8px;
    background-color: lightgray;
    border-radius: 10px;
  }
  .friend-time {
    display: block;
    font-size: 10px;
    margin-left: 45px;
  }
  .self-time {
    display: block;
    font-size: 10px;
  }

  img {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-right: 4px;
  }
`;
