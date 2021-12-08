import React, { useEffect } from "react";
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
