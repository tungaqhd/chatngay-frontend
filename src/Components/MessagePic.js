import React from "react";
import styled from "styled-components";
import { friend } from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";
import moment from "moment";
function MessagePic({ data, message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend);
  const isSelfMess = message.from === profile._id;
  const timeClass = isSelfMess ? "self-time" : "friend-time";
  const classN = isSelfMess ? "checkMessage" : "friend-mess";
  return (
    <Container className={classN}>
      <div className='msg-data'>
        {!isSelfMess && (
          <img
            className='avatar'
            src={`${process.env.REACT_APP_SERVER}/avatars/${friendData.avatar}`}
            alt=''
          />
        )}
        <img
          className='img-msg'
          src={`${process.env.REACT_APP_SERVER}/files/${data}`}
          alt=''
        />
        <img src='/reply1.png' alt='s' className='reply' />
      </div>
      <p className={timeClass}>{moment(message.createdAt).format("hh:mm")}</p>
    </Container>
  );
}

export default MessagePic;

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
  .img-msg {
    max-width: 400px;
  }
`;
