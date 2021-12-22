import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  messageActions,
  selectProfile,
  selectReply,
} from "../features/messageSlice";
import { friend } from "../features/messageSlice";
import moment from "moment";

function Message({ message }) {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const reply = useSelector(selectReply);
  const friendData = useSelector(friend);
  const isSelfMess = message.from === profile._id;
  const timeClass = isSelfMess ? "self-time" : "friend-time";

  const storeReplyHandler = (replyId, replyContent) => {
    dispatch(messageActions.addReply({ replyId, replyContent }));
    console.log(reply);
  };
  return (
    <Container className={`${isSelfMess ? "checkMessage" : ""}`}>
      <div className="msg-data">
        {!isSelfMess && (
          <img
            src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`}
            alt=""
            className="avatar"
          />
        )}
        <div className="msg-content">{message.content}</div>
        <img
          src="/reply1.png"
          alt="s"
          className="reply"
          onClick={() => storeReplyHandler(message._id, message.content)}
        />
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
    position: relative;
    .reply {
      height: 18px;
      margin: 18px 0 0 12px;
    }
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

  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-right: 4px;
  }
`;
