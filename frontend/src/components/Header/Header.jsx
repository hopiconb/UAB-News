import React from "react";
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiButton from "../Buttons/MuiButton.jsx";
import { useNavigate } from "react-router-dom";
import theme from "../../Themes/theme.jsx";
import LogoUAB from "../../assets/logoUAB.png";
import { Logout, Login } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const MainBox = styled(Box)({
  width: "100%",
  height: "4em",
  background: theme.palette.secondary.dark,
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

const SecondBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "1em",
  alignItems: "center",
  gap: "1em",
});

function Header({ user }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  const value = isMobile ? (
    user ? (
      <Logout /> // Icon Logout pe mobil
    ) : (
      <Login />
    ) // Icon Login pe mobil
  ) : user ? (
    "Disconnect" // Text Disconnect pe desktop
  ) : (
    "Autentificare"
  );

  const valueArea = isMobile ? <AdminPanelSettingsIcon /> : "User panel";

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
      <SecondBox>
        <Box
          component="img"
          src={LogoUAB}
          alt={"Logo"}
          sx={{
            height: 40,
            width: "auto",
            maxWidth: isMobile ? "4em" : "15em",
          }}
        />

        <HeaderBox>
          <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
          <MuiButton
            display={user ? "flex" : "none"}
            value={valueArea}
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
            value={value}
            color={theme.palette.primary.main}
            border={"none"}
            outline={"none"}
            backgroundColor={theme.palette.primary.contrastText}
            fontWeight={"bold"}
            backgroundColorHover={theme.palette.success.main}
            onClick={handleAuth}
            height={"2.4em"}
          />
        </HeaderBox>
      </SecondBox>
    </MainBox>
  );
}

export default Header;
