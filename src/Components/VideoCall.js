import React, { useEffect, createRef, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { messageActions, selectProfile } from "../features/messageSlice";
import { friend } from "../features/messageSlice";
import Peer from "peerjs";
import fetchWithToken from "../hooks/useFetchToken";
import { useParams } from "react-router-dom";
function Message({ message, match }) {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const myVideo = createRef();
  const friendVideo = createRef();
  const friendId = useParams().friendId;

  let peer = useRef(null);
  let socket = useRef(null);

  async function fetchApi() {
    try {
      const resProfile = await fetchWithToken(
        `${process.env.REACT_APP_API_KEY}/user/me`
      );
      const userData = await resProfile.json();
      return userData;
    } catch (error) {
      console.log(error.message);
    }
  }

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.play();
  };
  const connectToNewUser = (userId, stream) => {
    const call = peer.current.call(userId, stream);
    call.on("stream", (userVideoStream) => {
      friendVideo.current.srcObject = userVideoStream;
      friendVideo.current.play();
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!socket.current) {
        console.count();
        socket.current = io(process.env.REACT_APP_SOCKET);
      }
      const profile = await fetchApi();
      const token = localStorage.getItem("token");
      if (!peer.current) {
        peer.current = new Peer(profile._id, {
          path: "/peerjs",
          host: "localhost",
          port: "5000",
        });
      }
      peer.current.on("open", (id) => {
        console.log(profile);
        console.log("join");
        socket.current.emit("join-room", friendId, profile._id, "user");
      });

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          addVideoStream(myVideo.current, stream);

          peer.current.on("call", (call) => {
            console.log("nhận call");
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              console.log("on call");
              addVideoStream(friendVideo.current, userVideoStream);
            });
          });

          if (profile._id === "61932b36a625dccac7eb6ca4") {
            connectToNewUser("61933a4ee06777e5bf25a226", stream);
          } else {
            connectToNewUser("61932b36a625dccac7eb6ca4", stream);
          }

          // socket.current.on("user-connected", (userId) => {
          //   console.log("connect to" + userId);
          //   connectToNewUser(userId, stream);
          // });
        });

      // const call = peer.call(friendId, stream);
      // peer.on("call", (call) => {
      //   call.answer(stream);
      //   const video = document.createElement("video");
      //   call.on("stream", (userVideoStream) => {
      //     addVideoStream(video, userVideoStream);
      //   });
      // });
    };
    init();

    return () => {
      socket.current.emit("forceDisconnect");
    };
  }, [dispatch, connectToNewUser, friendId, friendVideo, myVideo]);

  return (
    <Container>
      <video height={300} width={300} ref={myVideo}></video>
      <video height={300} width={300} ref={friendVideo}></video>
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
`;
