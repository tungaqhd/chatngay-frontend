import React, { useState } from "react";
import styled from "styled-components";
import Message from "../Message";
import MessagePic from "../MessagePic";
import MessageFolder from "../MessageFolder";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessage,
  friendIdMessage,
  friend,
  selectReply,
  messageActions,
} from "../../features/messageSlice";
import fetchWithToken from "../../hooks/useFetchToken";
import axios from "axios";
function Content() {
  const messages = useSelector(selectMessage);
  const friendId = useSelector(friendIdMessage);
  const friendData = useSelector(friend);
  const [chat, setChat] = useState("");
  const [file, setFile] = useState();

  const reply = useSelector(selectReply);
  const dispatch = useDispatch();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!chat.trim()) return;

    const chatData = {
      msgType: "text",
      content: chat,
    };
    dispatch(messageActions.clearReply());
    await fetchWithToken(`${process.env.REACT_APP_API_KEY}/chat/${friendId}`, {
      method: "POST",
      body: JSON.stringify({ data: chatData }),
    });
    setChat("");
  };

  const typeMessageHandler = (e) => {
    setChat(e.target.value);
  };

  // const onFormSubmit = (e) => {
  //   e.preventDefault(); // Stop form submit
  // };
  const closeReply = () => {
    dispatch(messageActions.clearReply());
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_KEY}/chat/${friendId}/file`;
    const formData = new FormData();
    formData.append("uploadedFile", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    };
    axios.post(url, formData, config);
  };
  return (
    <Container>
      <ChatBox>
        <Title>
          <div>{friendData?.name}</div>
          <span>Messages</span>
          <button className="call-button">Video Call</button>
        </Title>
        <div className="message" id="messageList">
          {messages?.map((message) => {
            if (message.msgType === "text") {
              return <Message key={message._id} message={message} />;
            } else {
              if (
                message.fileId.originalFilename.endsWith(".png") ||
                message.fileId.originalFilename.endsWith(".jpg") ||
                message.fileId.originalFilename.endsWith(".jpeg")
              ) {
                return (
                  <MessagePic
                    key={message._id}
                    message={message}
                    data={message.fileId.fileName}
                  />
                );
              } else {
                return (
                  <MessageFolder
                    key={message._id}
                    message={message}
                    data={message.fileId}
                  />
                );
              }
            }
          })}
        </div>
        <Search>
          {reply?.id && reply?.content && (
            <div className="replyMessage">
              <div>
                Replying to
                <span>
                  {reply?.isSelfReply ? "Your self" : friendData?.name}
                </span>
              </div>
              <XIcon className="closeIcon" onClick={closeReply} />
              <div className="contentReply">{reply.content}</div>
            </div>
          )}
          <input type="text" value={chat} onChange={typeMessageHandler} />
          <img src="/send1.png" alt="send message" onClick={sendMessage} />
          <input type="file" onChange={onChange} className="inputFile" />
        </Search>
      </ChatBox>
    </Container>
  );
}

export default Content;

const Container = styled.div`
  /* overflow-x: hidden; */
  display: flex;
  flex-grow: 1;
  background-color: white;
  // padding: 1rem 0;
  height: calc(100vh-10px);
  /* overflow-y: auto;
  overscroll-behavior: contain;
  contain: paint; */
`;
const ChatBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #edf0f5;
  border-radius: 0.6rem;
  position: relative;

  .message {
    /* ::-webkit-scrollbar {
      display: block;
    }
    ::-webkit-scrollbar-thumb {
      background-color: red;
    } */

    height: calc(100vh - 80px - 4rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    /* margin-bottom: 4rem; */
    /* margin-bottom: 8rem; */
    overflow-y: scroll;
  }
`;

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin: 1rem;
  margin-left: 2rem;

  .closeIcon {
    height: 16px;
    position: absolute;
    right: 1rem;
    top: 0.6rem;
    color: lightgray;
  }
  .replyMessage {
    position: absolute;
    top: -4rem;
    padding: 0.2rem 1rem;
    background: white;
    width: 94%;
    /* max-width: 50vw; */
    border-radius: 8px;
    span {
      color: green;
      margin-left: 8px;
    }

    .contentReply {
      margin-top: 8px;
    }
  }
  img {
    position: absolute;
    bottom: 0;
    right: 1rem;
    padding: 0.4rem;
    width: 32px;
    height: 32px;
  }
  .inputFile {
    position: absolute;
    bottom: 0.4rem;
    right: 3.8rem;
    padding: 0.4rem;
    color: white;
    width: 100px;
    height: 22px;
  }

  input {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 0.8rem;
    border: none;
    outline: none;
  }
`;
const Title = styled.div`
  display: flex;
  margin: 1.4rem 1rem;
  height: 36px;
  /* border-bottom: 2px solid lightgray; */

  div {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
  }
  span {
    padding: 0.2rem 1rem;
    border-radius: 0.6rem;
    margin-left: 1rem;
  }
  span:last-child {
    background-color: lightgreen;
  }
  .call-button {
    background-color: #ff6f91;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    color: #fefefe;
  }
`;
