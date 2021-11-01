import React from "react";
import styled from "styled-components";
import {
  ClockIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
  ChevronLeftIcon,
  SearchIcon,
  PlusIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  return (
    <Container>
      <Left>
        <Logo>
          <img src="/logo.svg" alt="logo" />
        </Logo>
        <ClockIcon />
        <EyeIcon />
        <UsersIcon />
        <VideoCameraIcon />
        <div>
          <img src="/user2.jpg" alt="user logo" />
        </div>
      </Left>
      <Right>
        <div>
          <ChevronLeftIcon />
          <h3>Chat</h3>
        </div>
        <UserInfo>
          <img src="/user2.jpg" alt="large user" />
          <h3>Paine</h3>
        </UserInfo>

        <Search>
          <input type="text" placeholder="search" />
          <SearchIcon className="searchIcon" />
        </Search>
        <p>
          <span>Last chats</span>
          <PlusIcon />
          <DotsVerticalIcon />
        </p>
        <Card>
          <img src="/user2.jpg" alt="user" />
          <div>
            <p>Pearuss</p>
            <p>typing...</p>
          </div>
          <span>11:15</span>
        </Card>
        <Card>
          <img src="/user2.jpg" alt="user" />
          <div>
            <p>Pearuss</p>
            <p>typing...</p>
          </div>
          <span>11:15</span>
        </Card>
        <Card>
          <img src="/user2.jpg" alt="user" />
          <div>
            <p>Pearuss</p>
            <p>typing...</p>
          </div>
          <span>11:15</span>
        </Card>
        <Card>
          <img src="/user2.jpg" alt="user" />
          <div>
            <p>Pearuss</p>
            <p>typing...</p>
          </div>
          <span>11:15</span>
        </Card>
      </Right>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  display: flex;
  width: 440px;
  height: 100vh;
`;
const Left = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  padding: 1rem;
  border-right: 2px solid lightgray;

  svg {
    width: 36px;
    height: 36px;
    color: gray;
    padding-bottom: 3rem;
  }

  div:last-child {
    width: 48px;
    height: 48px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      margin-top: 10rem;
    }
  }
`;
const Logo = styled.div`
  width: 48px;
  height: 48px;
  padding-bottom: 7rem;
  width: 350px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;

  div:first-child {
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
`;

const Search = styled.div`
  position: relative;

  input {
    margin-left: 1rem;
    width: 70%;
    padding: 1rem 2rem;
    border-radius: 1rem;
    border: none;
    background-color: #f0f3f6;
    font-size: 18px;
    color: gray;
    &:focus {
      outline: none;
    }
  }
  .searchIcon {
    width: 24px;
    height: 24px;
    color: gray;
    position: absolute;
    right: 12%;
    top: 24%;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
  }
`;
