import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import SideBar from "../components/Bars/SideBar.jsx";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const MainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  height: "100vh",
}));

const ContentBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "1em",
  overflow: "auto",
}));

function UserArea() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (!token) {
      // Optionally, you can verify the token with the backend
      navigate("/");
    } else {
    }
  }, [navigate]);

  return (
    <MainBox>
      <SideBar />
      <ContentBox>
        <Outlet />
      </ContentBox>
    </MainBox>
  );
}

export default UserArea;
