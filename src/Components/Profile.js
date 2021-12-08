import React from "react";
import styled from "styled-components";

import {
  ClockIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import Folder from "./HomePage/Folder";

function Profile() {
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

      <MainProfile>
        <div className="head">
          <img src="/cover-photo4.jpg" alt="cover" />
          <img src="/toc2" alt="" />
        </div>
      </MainProfile>
      <Folder />
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
const MainProfile = styled.div`
  position: relative;
  width: 100%;
  .head {
    img {
      width: 100%;
      height: 200px;
    }
  }
`;

const Left = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  padding: 1rem;
  height: 100vh;
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
