import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Folder from "./Folder";
import Content from "./Content";
import { useHistory } from "react-router";
// import useFetchToken from "../../hooks/useFetchToken";

/* eslint-disable */
function Dashboard() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return;
      // const token = JSON.parse(localStorage.getItem("token"));
      // const DEFAULT_OPTIONS = {
      //   "Content-Type": "application/json",
      //   authorization: `Bearer ${token}`,
      // };

      // async function getData() {
      //   const res = await fetch(
      //     `https://api.chatngay.xyz/api/user/me`,
      //     DEFAULT_OPTIONS
      //   );
      //   const dataUser = await res.json();
      //   setProfile(dataUser);
      // }
      // getData();
    } else {
      history.replace("/login");
    }
  }, [history]);

  return (
    <Container>
      <Sidebar />
      <Content />
      <Folder />
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  display: flex;
  max-width: calc(100vw);
  box-sizing: border-box;
`;
