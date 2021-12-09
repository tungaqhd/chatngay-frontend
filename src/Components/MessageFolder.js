import React from "react";
import styled from "styled-components";
import { friend} from "../features/messageSlice";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/messageSlice";

import { FolderIcon } from "@heroicons/react/outline";

function Message({ data, message }) {
  const profile = useSelector(selectProfile);
  const friendData = useSelector(friend)
  const isSelfMess = message.from === profile._id;
  return (
    <Container className={`${isSelfMess ? "checkMessage" : ""}`}>
      {!isSelfMess && <img src={`https://api.chatngay.xyz/avatars/${friendData.avatar}`} alt="" />}
      <a href={`https://api.chatngay.xyz/files/${data.fileName}`}>
        <div>
          <FolderIcon />
          <div>{data.originalFilename}</div>
        </div>
      </a>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 10px;

  div:nth-child(2) {
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
  img {
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-right: 4px;
  }
  /* div {
    /* padding: 4px 8px;
    background-color: lightgray;
    border-radius: 10px; */
`;
