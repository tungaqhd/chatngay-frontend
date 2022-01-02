import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Cropper from "react-easy-crop";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@material-ui/core/Slider";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";

import {
  ClockIcon,
  EyeIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import fetchWithToken from "../hooks/useFetchToken";

function Profile() {
  const [profile, setProfile] = useState();
  const [image, setImage] = useState(null);
  const inputRef = useRef();

  const [newUserName, setNewUserName] = useState(profile?.username || "");
  const [newFullName, setNewFullName] = useState(profile?.name || "");

  useEffect(() => {
    setNewUserName(profile?.username);
    setNewFullName(profile?.name);
  }, [profile]);

  const [open, setOpen] = useState(true);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const triggerFileSelectPopup = () => inputRef.current.click();
  const onCropComplete = (croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const onSelectFile = (event) => {
    setOpen(true);
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setOpen(true);
      });
    }
  };
  const chooseImage = () => {
    console.log(croppedArea);
    console.log(image);
    setOpen(false);
    setImage(null);
  };

  const handleClose = () => {
    setOpen(false);
    // setOpenCropImage(false);
  };
  const updateProfile = () => {
    console.log(newUserName);
    console.log(newFullName);
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
          <img className="cover-photo" src="/cover-photo4.jpg" alt="cover" />
          <img className="profile-photo" src="/toc2.jpg" alt="pic" />
          <CameraEnhanceOutlinedIcon
            className="camera"
            onClick={triggerFileSelectPopup}
          />
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
        </div>
        <div className="info">
          <h1>Profile Information</h1>
          <div className="info_content">
            <span>Email</span>
            <input value={profile?.email} type="text" />
          </div>
          <div className="info_content">
            <span>User name</span>
            <input
              onChange={(e) => setNewUserName(e.target.value)}
              value={newUserName}
              type="text"
            />
          </div>
          <div className="info_content">
            <span>Full name</span>
            <input
              onChange={(e) => setNewFullName(e.target.value)}
              value={newFullName}
              type="text"
            />
          </div>
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </MainProfile>
      {image ? (
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ width: "100%", height: "60vh" }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              className="test"
            />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div style={{ position: "absolute", bottom: "4px", right: "4px" }}>
            <button
              type="button"
              // className="bg-white py-1 px-3 rounded-md"
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={chooseImage}
            >
              Choose
            </button>
          </div>
        </Dialog>
      ) : null}
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
