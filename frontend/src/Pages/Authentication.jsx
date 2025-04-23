import React, { useEffect, useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import MuiInput from "../components/Inputs/MuiInput.jsx";
import MuiButton from "../components/Buttons/MuiButton.jsx";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";
import theme from "../Themes/theme.jsx";
import { fetchLoginUser } from "../Services/FetchUser.js";
import { useNavigate } from "react-router-dom";

const MainBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  position: "absolute",
  top: 0,
  left: 0,
  padding: "1em",
});

const AuthBox = styled(Box, {
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

const LoginBox = styled(Box)(({ display }) => ({
  width: "100%",
  height: "auto",
  backfaceVisibility: "hidden",
  display: display ? "none" : "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "1em",
}));

const Exit = styled(Typography)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  cursor: "pointer",
});

function Authentication() {
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const [emailLoginInput, setEmailLoginInput] = useState("");
  const [passwordLoginInput, setPasswordLoginInput] = useState("");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally, you can verify the token with the backend
      console.log("User is already logged in");
      navigate("/"); // Redirect to the home page
    } else {
      navigate("/auth"); // Redirect to the login page
    }
  }, [navigate]);

  function getEmailLogin(e) {
    setEmailLoginInput(e.target.value);
  }
  function getPasswordLogin(e) {
    setPasswordLoginInput(e.target.value);
  }

  function handleLogin() {
    fetchLoginUser(emailLoginInput, passwordLoginInput).then((result) => {
      if (result.message === "User not found") {
        setDisplay(1);
      } else if (result.message === "Invalid credentials") {
        setDisplay(2);
      } else {
        navigate("/");
      }
    });
  }

  function handleRegister() {}

  return (
    <MainBox>
      <AuthBox flip={register}>
        <Exit>
          <MuiButton
            value={<ClearIcon />}
            border={"none"}
            outline={"none"}
            color={theme.palette.primary.main}
            onClick={() => {
              navigate("/");
            }}
          />
        </Exit>
        <LoginBox display={register}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            Login
          </Typography>
          <Typography
            sx={{ color: "red", display: display === 1 ? "flex" : "none" }}
          >
            Utilizator inexistent!
          </Typography>
          <Typography
            sx={{ color: "red", display: display === 2 ? "flex" : "none" }}
          >
            Parola gresita!
          </Typography>
          <MuiInput
            type={"text"}
            size={"small"}
            label={"Email"}
            fullWidth={true}
            onChange={getEmailLogin}
            inputIcon={<EmailIcon sx={{ color: theme.palette.primary.main }} />}
            borderColor={
              display === 0
                ? theme.palette.primary.main
                : theme.palette.error.main
            }
            value={emailLoginInput}
          />
          <MuiInput
            type={"password"}
            size={"small"}
            fullWidth={true}
            label={"Password"}
            onChange={getPasswordLogin}
            borderColor={
              display === 0
                ? theme.palette.primary.main
                : theme.palette.error.main
            }
            value={passwordLoginInput}
          />

          <MuiButton
            height={"2em"}
            width={"100%"}
            outline={"none"}
            border={"none"}
            backgroundColor={theme.palette.success.main}
            backgroundColorHover={theme.palette.success.contrastText}
            color={theme.palette.primary.main}
            value={"Login"}
            fontWeight={"bold"}
            onClick={handleLogin}
          />
        </LoginBox>
      </AuthBox>
    </MainBox>
  );
}

export default Authentication;
