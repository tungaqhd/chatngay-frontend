import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import {
  ClockIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import Folder from "./HomePage/Folder";
import fetchWithToken from "../hooks/useFetchToken";

function Profile() {
  const [profile, setProfile] = useState();
  useEffect(() => {
    async function fetchApi() {
      try {
        const resProfile = await fetchWithToken(
          `${process.env.REACT_APP_API_KEY}/user/me`
        );
        const userData = await resProfile.json();
        setProfile(userData);
      } catch (error) {
        Swal.fire(`Login timeout. Please login again`);
      }
    }

    fetchApi();
  }, []);
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
          <img src="/toc2.jpg" alt="pic" />
        </div>
        <div className="info">
          <div>
            <span>Email: </span>
            <span>{profile?.email}</span>
          </div>
          <div>
            <span>User name:</span>
            <input type="text" value={profile?.username} />
          </div>
          <div>
            <span>Full name:</span>
            <input type="text" value={profile?.name} />
          </div>
          <button className="edit">Edit profile</button>
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
  height: 200px;
  .head {
    img {
      width: 100%;
      height: 200px;
    }
    img:nth-child(2) {
      width: 132px;
      height: 132px;
      border-radius: 100%;
      position: absolute;
      bottom: -66px;
      left: 1rem;
      border: 6px solid white;
      /* border-color: white; */
      overflow: hidden;
      object-fit: cover;
    }
  }
  .info {
    position: relative;
    margin-top: 5rem;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    margin: 6rem 20vw;
    padding: 2rem 4rem;

    .edit {
      padding: 10px 6px;
      border-radius: 4px;
      background-color: #add9e6;
    }

    > div {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;

      span {
        min-width: 6rem;
      }
    }
    input {
      padding: 0.4rem 0.6rem;
      margin-left: 1rem;
      width: 100%;
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
