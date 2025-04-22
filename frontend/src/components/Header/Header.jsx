import React from "react";
import { Box, styled, Typography } from "@mui/material";
import MuiButton from "../Buttons/MuiButton.jsx";
import { useNavigate } from "react-router-dom";
import theme from "../../Themes/theme.jsx";

const MainBox = styled(Box)({
  width: "100%",
  height: "4em",
  background: theme.palette.secondary.main,
  position: "fixed",
  top: 0,
});

const HeaderBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "end",
  padding: "1em",
  alignItems: "center",
  gap: "1em",
});

function Header({ user }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  function handleAuth() {
    if (user) {
      localStorage.clear();
      location.reload();
    } else {
      navigate("/auth");
    }
  }
  return (
    <MainBox>
      <HeaderBox>
        <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
        <MuiButton
          display={user ? "flex" : "none"}
          value={"User area"}
          border={"none"}
          outline={"none"}
          backgroundColor={theme.palette.primary.contrastText}
          fontWeight={"bold"}
          color={theme.palette.primary.main}
          backgroundColorHover={theme.palette.success.main}
          onClick={() => {
            navigate("/admin");
          }}
          height={"2.4em"}
          width={"auto"}
        />

        <MuiButton
          value={user ? "Disconnect" : "Autentificare"}
          border={"none"}
          outline={"none"}
          backgroundColor={theme.palette.primary.contrastText}
          fontWeight={"bold"}
          color={theme.palette.primary.main}
          backgroundColorHover={theme.palette.success.main}
          onClick={handleAuth}
          height={"2.4em"}
        />
      </HeaderBox>
    </MainBox>
  );
}

export default Header;
