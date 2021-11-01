import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Folder from "./Folder";
import Content from "./Content";

function Dashboard() {
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
