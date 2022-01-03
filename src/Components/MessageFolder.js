import React from "react";
import styled from "styled-components";
import { friend } from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";

import { FolderIcon } from "@heroicons/react/outline";
import moment from "moment";
function Message({ data, message }) {
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
        <a href={`${process.env.REACT_APP_SERVER}/files/${data.fileName}`}>
          <div className='file-info'>
            <FolderIcon />
            <div>{data.originalFilename}</div>
          </div>
        </a>
        <img src='/reply1.png' alt='s' className='reply' />
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

  .file-info {
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
`;
