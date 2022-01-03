import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import {
  ClockIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import fetchWithToken from "../hooks/useFetchToken";

function Profile() {
  const [profile, setProfile] = useState();
  const [avatar, setAvatar] = useState(null);

  const [newUserName, setNewUserName] = useState(profile?.username || "");
  const [newFullName, setNewFullName] = useState(profile?.name || "");

  useEffect(() => {
    setNewUserName(profile?.username);
    setNewFullName(profile?.name);
  }, [profile]);

  const onSelectFile = (e) => {
    setAvatar(e.target.files[0]);
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_KEY}/user/`;
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", newUserName);
    formData.append("name", newFullName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    };
    await axios.post(url, formData, config);

    try {
      const resProfile = await fetchWithToken(
        `${process.env.REACT_APP_API_KEY}/user/me`
      );
      const userData = await resProfile.json();
      setProfile(userData);
    } catch (error) {
      Swal.fire(`Login timeout. Please login again`);
    }
  };
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
          <img src='/logo.svg' alt='logo' />
        </Logo>
        <ClockIcon />
        <EyeIcon />
        <UsersIcon />
        <VideoCameraIcon />
        <div>
          <img
            src={`${process.env.REACT_APP_SERVER}/avatars/${profile?.avatar}`}
            alt='user logo'
          />
        </div>
      </Left>

      <MainProfile>
        <div className='head'>
          <img className='cover-photo' src='/cover-photo4.jpg' alt='cover' />
          <img
            className='profile-photo'
            src={`${process.env.REACT_APP_SERVER}/avatars/${profile?.avatar}`}
            alt='pic'
          />
        </div>
        <div className='info'>
          <h1>Profile Information</h1>
          <div className='info_content'>
            <span>Avatar</span>
            <input type='file' accept='image/*' onChange={onSelectFile} />
          </div>
          <div className='info_content'>
            <span>Email</span>
            <input value={profile?.email} type='text' disabled />
          </div>
          <div className='info_content'>
            <span>Username</span>
            <input
              onChange={(e) => setNewUserName(e.target.value)}
              value={newUserName}
              type='text'
            />
          </div>
          <div className='info_content'>
            <span>Full name</span>
            <input
              onChange={(e) => setNewFullName(e.target.value)}
              value={newFullName}
              type='text'
            />
          </div>
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </MainProfile>
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
  height: 280px;
  .head {
    .cover-photo {
      width: 100%;
      height: 280px;
    }
    .profile-photo {
      width: 158px;
      height: 158px;
      border-radius: 100%;
      position: absolute;
      bottom: -79px;
      left: 1.4rem;
      border: 6px solid white;
      overflow: hidden;
      object-fit: cover;
    }
    .camera {
      position: absolute;
      bottom: -11px;
      left: 96px;
      z-index: 120;
      color: white;
      opacity: 0.4;
    }
  }
  .info {
    display: flex;
    height: 100%;
    margin: 1rem auto;
    flex-direction: column;
    width: 60vw;
    h1 {
      margin: 2rem auto 3rem;
      color: #add9e6;
    }
    button {
      padding: 0.8rem 0.8rem;
      width: 10rem;
      font-weight: 600;
      margin-left: auto;
      border-radius: 4px;
      border: 2px solid #add9e6;
      border-color: #add9e6;
      background-color: white;
      color: #add9e6;
      cursor: pointer;
      font-size: 18px;
      :hover {
        background-color: #add9e6;
        color: white;
      }
    }
    .info_content {
      display: flex;
      width: 100%;
      align-items: center;
      color: rgba(113, 128, 150, 0.9);
      margin-bottom: 2.4rem;

      span {
        width: 12rem;
        font-weight: 500;
        justify-content: flex-end;
        font-size: 22px;
      }
      input {
        width: 100%;
        color: rgba(113, 128, 150, 0.9);
        font-size: 18px;
        padding: 1rem 1.4rem;
        outline: none;
        border-radius: 4px;
        margin-left: 2rem;
        border: 2px solid #add9e6;
        border-color: #add9e6;
      }
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
