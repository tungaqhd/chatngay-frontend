import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  chatIdMessage,
  messageActions,
  friend,
} from "../../features/messageSlice";
import { io } from "socket.io-client";
import {
  ClockIcon,
  FolderIcon,
  UsersIcon,
  VideoCameraIcon,
  ChevronLeftIcon,
  SearchIcon,
  PlusIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";
import fetchWithToken from "../../hooks/useFetchToken";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import CallVideoDialog from "../common/CallVideoDialog";

function Sidebar({ setShowFolder }) {
  const [profile, setProfile] = useState();
  const chatId = useSelector(chatIdMessage);
  const frienData = useSelector(friend);
  const [listChat, setListChat] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [nameCall, setNameCall] = useState("");
  const [idCall, setIdCall] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchApi() {
      try {
        const resProfile = await fetchWithToken(
          `${process.env.REACT_APP_API_KEY}/user/me`
        );
        const userData = await resProfile.json();
        setProfile(userData);
        dispatch(messageActions.addProfile(userData));

        const resChat = await fetchWithToken(
          `${process.env.REACT_APP_API_KEY}/chat`
        );
        const listChat = await resChat.json();
        setListChat(listChat);
      } catch (error) {
        console.log(error.message);
        Swal.fire(`Login timeout. Please login again`);
      }
    }

    fetchApi();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET);
    const token = localStorage.getItem("token");
    socket.emit("initChat", token);
    socket.on("callReceived", (id, name) => {
      console.log(`${name} is calling you on ${id}`);
      setNameCall(name);
      setIdCall(id);
      setShowCallDialog(true);
    });
    socket.on("newMessages", async (message) => {
      if (message.chatId === chatId || (!chatId && frienData?._id)) {
        dispatch(messageActions.addMoreMessage(message));
        const scrollContainer = document.getElementById("messageList");
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }

      const resChat = await fetchWithToken(
        `${process.env.REACT_APP_API_KEY}/chat`
      );
      const listChat = await resChat.json();
      setListChat(listChat);
      const cloneListChat = _.cloneDeep(listChat);
      const updatedListChat = cloneListChat.map((chat) => {
        if (chat._id === message.chatId) {
          chat.messages[0] = message;
        }
        return chat;
      });
      setListChat(updatedListChat);

      return () => {
        socket.emit("forceDisconnect");
      };
    });
  }, [dispatch, chatId, frienData]);

  const getChatGroup = async (id, user) => {
    const res = await fetchWithToken(
      `${process.env.REACT_APP_API_KEY}/chat/${id}`
    );
    const messages = await res.json();

    dispatch(messageActions.addMessage({ messages, user, id }));
    const scrollContainer = document.getElementById("messageList");
    scrollContainer.scrollTo({
      top: scrollContainer.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  const setFriend = async (user) => {
    setSearchValue("");
    dispatch(messageActions.setFriend({ user }));
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    const res = await fetchWithToken(
      `${process.env.REACT_APP_API_KEY}/user?content=${searchValue}`
    );
    const searchData = await res.json();
    setSearchUser(searchData);
  };

  const inputSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);

    _.debounce(async () => {
      const res = await fetchWithToken(
        `${process.env.REACT_APP_API_KEY}/user?content=${e.target.value}`
      );
      const searchData = await res.json();
      setSearchUser(searchData);
    }, 500)();
  };

  return (
    <Container>
      <Left>
        <Logo>
          <img src='/logo.svg' alt='logo' />
        </Logo>
        <FolderIcon onClick={setShowFolder} style={{ cursor: "pointer" }} />
        <ClockIcon />
        <UsersIcon />
        <VideoCameraIcon />
        <div>
          <a href='/profile'>
            <img
              src={`${process.env.REACT_APP_SERVER}/avatars/${profile?.avatar}`}
              alt='user logo'
            />
          </a>
        </div>
      </Left>
      <Right>
        <div>
          <ChevronLeftIcon />
          <h3>Chat</h3>
        </div>
        <UserInfo>
          <img
            src={`${process.env.REACT_APP_SERVER}/avatars/${profile?.avatar}`}
            alt='large user'
          />
          <h3>{profile?.name}</h3>
        </UserInfo>

        <Search>
          <input
            type='text'
            value={searchValue}
            onChange={inputSearchChangeHandler}
            placeholder='search'
          />
          <SearchIcon className='searchIcon' onClick={searchHandler} />
        </Search>
        <p>
          <span>Last chats</span>
          <PlusIcon />
          <DotsVerticalIcon />
        </p>
        {/* onClick={() => getChatGroup(chat._id, _id)} */}
        {searchUser.length > 0 &&
          searchValue.length > 0 &&
          searchUser?.map((user) => (
            <Card onClick={() => setFriend(user)} key={user._id}>
              <img
                src={`${process.env.REACT_APP_SERVER}/avatars/${user.avatar}`}
                alt='user'
              />
              <div>
                <span>{user.username}</span>
                <span>{user.isOnline ? "Online" : "Offine"}</span>
              </div>
              <span>11:15</span>
            </Card>
          ))}
        {(searchUser.length === 0 || searchValue.length === 0) &&
          listChat?.map((chat) => {
            if (chat.user1[0]._id === profile._id) {
              const { avatar, username, isOnline, _id } = chat.user2[0];
              return (
                <Card
                  key={_id}
                  onClick={() => getChatGroup(chat._id, chat.user2[0])}
                >
                  <img
                    src={`${process.env.REACT_APP_SERVER}/avatars/${avatar}`}
                    alt='user'
                  />
                  <div>
                    <span>
                      {username} <sup>{isOnline ? "Online" : "Offine"}</sup>
                    </span>
                    <span>{chat?.messages[0]?.content}</span>
                  </div>
                  <span>
                    {moment(chat?.messages[0]?.createdAt).format("hh:mm")}
                  </span>
                </Card>
              );
            } else {
              const { avatar, username, isOnline, _id } = chat.user1[0];
              return (
                <Card
                  key={_id}
                  onClick={() => getChatGroup(chat._id, chat.user1[0])}
                >
                  <img
                    src={`${process.env.REACT_APP_SERVER}/avatars/${avatar}`}
                    alt='user'
                  />
                  <div>
                    <span>{username}</span>
                    <span>{isOnline ? "Online" : "Offine"}</span>
                  </div>
                  <span>11:15</span>
                </Card>
              );
            }
          })}
      </Right>
      <CallVideoDialog
        open={showCallDialog}
        setOpen={setShowCallDialog}
        callName={nameCall}
        idCall={idCall}
      />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  display: flex;
  width: 440px;
  height: 100vh;
  /* position: sticky;
  left: 0; */
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
  margin-bottom: 1rem;

  div {
    display: flex;
    flex-direction: column;
    span:last-child {
      margin-top: 4px;
      font-size: small;
    }
  }

  img {
    width: 38px;
    height: 38px;
    border-radius: 100%;
  }
`;
