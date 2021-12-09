import React from "react";
import styled from "styled-components";
import {
  FolderIcon,
  ChevronLeftIcon,
  DotsVerticalIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { friend } from "../../features/messageSlice";

function Folder() {
  const friendData = useSelector(friend);
  return (
    <Container>
      <Right>
        <div>
          <ChevronLeftIcon />
          <h3>User profile</h3>
        </div>
        <UserInfo>
          <img src={`https://api.chatngay.xyz/avatars/${friendData?.avatar}`} alt="large user" />
          <h3>{friendData?.username}</h3>
          <span>{friend?.isOnline ? "Online": "Offline"}</span>
        </UserInfo>
        <Box>
          <div>
            <FolderIcon />
            <div>25 files</div>
          </div>
          <div>
            <FolderIcon />
            <div>25 files</div>
          </div>
        </Box>
        <p className="fileType">
          <span>File type</span>
          <DotsVerticalIcon />
        </p>
        <Card>
          <FolderIcon />
          <div>
            <span>Documents</span>
            <span>126 files, 193MB</span>
          </div>
          <ChevronRightIcon />
        </Card>
        <Card>
          <FolderIcon />
          <div>
            <span>Documents</span>
            <span>126 files, 193MB</span>
          </div>
          <ChevronRightIcon />
        </Card>
        <Card>
          <FolderIcon />
          <div>
            <span>Documents</span>
            <span>126 files, 193MB</span>
          </div>
          <ChevronRightIcon />
        </Card>
        <Card>
          <FolderIcon />
          <div>
            <span>Documents</span>
            <span>126 files, 193MB</span>
          </div>
          <ChevronRightIcon />
        </Card>
      </Right>
    </Container>
  );
}

export default Folder;

const Container = styled.div`
  display: flex;
  width: 380px;
  height: 100vh;
  position: sticky;
  top: 0;
  right: 0;
`;

const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;

  > div:first-child {
    display: flex;
    align-items: center;
    padding: 0.6rem 1rem;
    border-bottom: 2px solid lightgray;

    svg {
      width: 28px;
      height: 28px;
      padding: 0.4rem;
      background-color: #f0f1f3;
      border-radius: 30%;
      margin-right: 1rem;
    }
  }

  p {
    display: flex;
    align-items: center;
    color: gray;

    span {
      flex: 1;
      font-size: 17px;
      margin-left: 1rem;
      font-weight: 600;
    }

    svg {
      width: 22px;
      height: 22px;
      margin-right: 1rem;
    }
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.2rem;

  img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  span {
    margin-top: -0.4rem;
    font-size: 15px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  gap: 1rem;

  svg {
    width: 32px;
    height: 32px;
  }
  div {
    display: flex;
    align-items: center;
    flex: 1;
    background-color: lightgreen;
    padding: 0.8rem 0.6rem;
    border-radius: 1rem;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  color: gray;

  svg {
    width: 18px;
    height: 18px;
    border-radius: 0.8rem;
    &:first-child {
        padding: 0.8rem;
        background-color: lightgreen;
    }
  }

  div {
      display: flex;
      flex-direction: column;
  }
`;
