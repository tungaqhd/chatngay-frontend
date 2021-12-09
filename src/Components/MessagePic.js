import React from "react";
import styled from "styled-components";
import { friend} from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";

function MessagePic({ data, message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  const classN = isSelfMess ? "checkMessage" : "friend-mess"
  return (
    <Container className={classN}>
      {!isSelfMess && <img className="avatar" src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <img className="img-msg" src={`https://api.chatngay.xyz/files/${data}`} alt='' />
    </Container>
  );
}

export default MessagePic;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  div {
    padding: 4px 8px;
    background-color: lightgray;
    border-radius: 10px;
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
