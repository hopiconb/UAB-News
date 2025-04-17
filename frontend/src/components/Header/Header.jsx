import React from "react";
import { Box, styled } from "@mui/material";
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
});

function Header() {
  const navigate = useNavigate();

  const openAuth = () => {
    navigate("/Auth");
  };

  return (
    <MainBox>
      <HeaderBox>
        <MuiButton
          value={"Autentificare"}
          border={"none"}
          outline={"none"}
          backgroundColor={theme.palette.primary.contrastText}
          fontWeight={"bold"}
          color={theme.palette.primary.main}
          backgroundColorHover={theme.palette.success.main}
          onClick={openAuth}
          height={"2em"}
        />
      </HeaderBox>
    </MainBox>
  );
}

export default Header;
