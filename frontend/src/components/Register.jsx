import React, { useEffect, useState } from "react";
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiInput from "./Inputs/MuiInput.jsx";
import PersonIcon from "@mui/icons-material/Person";
import MuiButton from "./Buttons/MuiButton.jsx";
import EmailIcon from "@mui/icons-material/Email";
import theme from "../Themes/theme.jsx";
import { useNavigate } from "react-router-dom";
import { fetchRegisterUser } from "../Services/FetchUser.js";

export const MainBoxR = styled(Box)(({ ismobile }) => ({
  width: ismobile ? "calc(100% - 4em)" : "calc(100% - 15em)",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.contrastText,
  position: "absolute",
  top: 0,
  right: 0,
  padding: "1em",
  flexDirection: "column",
}));

const AuthBoxR = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flip",
})(({ flip }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: "2em",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  flexDirection: "column",
  gap: "1em",
  padding: "1em",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.8s",
  transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
  "@media (min-width:600px)": {
    width: "70%",
    height: "70%",
  },
  "@media (min-width:900px)": { width: "50%", height: "70%" },
  "@media (min-width:1200px)": { width: "30%" },
  "@media (min-width:1536px)": { width: "20%" },
}));

const RegisterBox = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1em",
  display: "flex",
}));

function Register() {
  const navigate = useNavigate();
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [display, setDisplay] = useState(0);

  function getEmail(e) {
    setEmailInput(e.target.value);
  }
  function getPassword(e) {
    setPasswordInput(e.target.value);
  }
  function getFirstName(e) {
    setFirstNameInput(e.target.value);
  }
  function getLastName(e) {
    setLastNameInput(e.target.value);
  }
  function getUsername(e) {
    setUsernameInput(e.target.value);
  }

  function handleRegister() {
    const nameInput = lastNameInput.concat(" ", firstNameInput);

    fetchRegisterUser(usernameInput, nameInput, emailInput, passwordInput).then(
      (result) => {
        if (result.message === "User already exists") {
          setDisplay(1);
        } else {
          setDisplay(2);
        }
      },
    );
  }

  return (
    <MainBoxR ismobile={isMobile ? "true" : undefined}>
      <AuthBoxR>
        <RegisterBox>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            Register
          </Typography>

          <Typography
            sx={{ color: "red", display: display === 1 ? "flex" : "none" }}
          >
            Utilizator existent!
          </Typography>
          <Typography
            sx={{ color: "green", display: display === 2 ? "flex" : "none" }}
          >
            Utilizator adaugat cu success!
          </Typography>

          <MuiInput
            type={"text"}
            size={"small"}
            label={"Last name"}
            value={lastNameInput}
            fullWidth={true}
            onChange={getLastName}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />

          <MuiInput
            type={"text"}
            size={"small"}
            label={"First name"}
            value={firstNameInput}
            fullWidth={true}
            onChange={getFirstName}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />

          <MuiInput
            type={"text"}
            size={"small"}
            label={"Username"}
            value={usernameInput}
            fullWidth={true}
            onChange={getUsername}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />
          <MuiInput
            type={"text"}
            size={"small"}
            label={"Email"}
            value={emailInput}
            fullWidth={true}
            onChange={getEmail}
            inputIcon={<EmailIcon sx={{ color: theme.palette.primary.main }} />}
            borderColor={theme.palette.primary.main}
          />
          <MuiInput
            type={"password"}
            size={"small"}
            label={"Password"}
            value={passwordInput}
            fullWidth={true}
            onChange={getPassword}
            borderColor={theme.palette.primary.main}
          />

          <MuiButton
            height={"2em"}
            width={"100%"}
            outline={"none"}
            border={"none"}
            backgroundColor={theme.palette.success.main}
            backgroundColorHover={theme.palette.success.contrastText}
            color={theme.palette.primary.main}
            value={"Register"}
            fontWeight={"bold"}
            onClick={handleRegister}
          />
        </RegisterBox>
      </AuthBoxR>
    </MainBoxR>
  );
}

export default Register;
