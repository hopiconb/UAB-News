import React, { useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import MuiInput from "../components/Inputs/MuiInput.jsx";
import PersonIcon from "@mui/icons-material/Person";
import MuiButton from "../components/Buttons/MuiButton.jsx";
import EmailIcon from "@mui/icons-material/Email";
import theme from "../Themes/theme.jsx";

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

const RegisterBox = styled(Box)(({ display }) => ({
  width: "100%",
  height: "auto",
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
  display: display ? "flex" : "none",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "1em",
}));

function Authentication() {
  const [register, setRegister] = useState(false);

  return (
    <MainBox>
      <AuthBox flip={register}>
        <LoginBox display={register}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            Login
          </Typography>

          <MuiInput
            type={"text"}
            size={"small"}
            label={"Username"}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />
          <MuiInput
            type={"password"}
            size={"small"}
            label={"Password"}
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
            value={"Login"}
            fontWeight={"bold"}
          />

          <MuiButton
            height={"2em"}
            width={"100%"}
            outline={"none"}
            border={"none"}
            backgroundColor={theme.palette.success.dark}
            backgroundColorHover={theme.palette.success.light}
            color={theme.palette.primary.main}
            value={"Register"}
            fontWeight={"bold"}
            onClick={() => setRegister(!register)}
          />
        </LoginBox>
        <RegisterBox display={register}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5em",
            }}
          >
            Register
          </Typography>

          <MuiInput
            type={"text"}
            size={"small"}
            label={"Last name"}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />

          <MuiInput
            type={"text"}
            size={"small"}
            label={"First name"}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />

          <MuiInput
            type={"text"}
            size={"small"}
            label={"Username"}
            inputIcon={
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
            }
            borderColor={theme.palette.primary.main}
          />
          <MuiInput
            type={"text"}
            size={"small"}
            label={"Email"}
            inputIcon={<EmailIcon sx={{ color: theme.palette.primary.main }} />}
            borderColor={theme.palette.primary.main}
          />
          <MuiInput
            type={"password"}
            size={"small"}
            label={"Password"}
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
          />

          <MuiButton
            height={"2em"}
            width={"100%"}
            outline={"none"}
            border={"none"}
            backgroundColor={theme.palette.success.dark}
            backgroundColorHover={theme.palette.success.light}
            color={theme.palette.primary.main}
            value={"Login"}
            fontWeight={"bold"}
            onClick={() => setRegister(!register)}
          />
        </RegisterBox>
      </AuthBox>
    </MainBox>
  );
}

export default Authentication;
