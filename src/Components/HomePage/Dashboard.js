import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Folder from "./Folder";
import Content from "./Content";
import { useHistory } from "react-router";
import useToggle from "../../hooks/use-toggle";

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
  const [showFolder, setShowFolder] = useToggle(true);

  return (
    <Container className="main">
      <Sidebar setShowFolder={setShowFolder} />
      <Content />
      <Folder showFolder={showFolder} />
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;
