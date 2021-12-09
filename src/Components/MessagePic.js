import React from "react";
import styled from "styled-components";
import { friend} from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";

function MessagePic({ data, message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  return (
    <Container className={`${isSelfMess ? "checkMessage" : ""}`}>
      {!isSelfMess && <img src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <img src={`https://api.chatngay.xyz/files/${data}`} alt="" />
    </Container>
  );
}

export default MessagePic;

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
