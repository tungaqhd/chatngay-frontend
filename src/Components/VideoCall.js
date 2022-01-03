import React, { useEffect, createRef, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Peer from "peerjs";
import fetchWithToken from "../hooks/useFetchToken";
import { useParams } from "react-router-dom";
function Message({ message, match }) {
  const dispatch = useDispatch();
  const myVideo = createRef();
  const friendVideo = createRef();
  const chatId = useParams().chatId;

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

  useEffect(() => {
    const init = async () => {
      if (!socket.current) {
        socket.current = io(process.env.REACT_APP_SOCKET);
      }
      const profile = await fetchApi();

      const fr = await fetchWithToken(
        `${process.env.REACT_APP_API_KEY}/chat/friend/${chatId}`
      );
      const frData = await fr.json();
      const friend = frData.id;
      console.log(friend);
      if (!peer.current) {
        peer.current = new Peer(profile._id, {
          path: "/peerjs",
          host: "localhost",
          port: "5000",
        });
      }
      peer.current.on("open", (id) => {
        socket.current.emit("join-room", chatId, profile._id, "user");
      });

      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          addVideoStream(myVideo.current, stream);

          peer.current.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
              addVideoStream(friendVideo.current, userVideoStream);
            });
          });

          const call = peer.current.call(friend, stream);
          call.on("stream", (userVideoStream) => {
            friendVideo.current.srcObject = userVideoStream;
            friendVideo.current.play();
          });
        });
    };
    init();

    return () => {
      socket.current.emit("forceDisconnect");
    };
  }, [dispatch, chatId, friendVideo, myVideo]);

  return (
    <Container>
      <video className='my-video' ref={myVideo}></video>
      <video className='friend-video' ref={friendVideo}></video>
      <button></button>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  width: 100%;
  height: 100%;

  .my-video {
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }
  .friend-video {
    width: 420px;
    height: 260px;
    position: absolute;
    background-color: red;
    bottom: 0;
    right: 0;
    z-index: 100;
    border-radius: 4px;
  }
`;
