import { Box, Typography } from "@mui/material";
import Header from "../components/Header/Header.jsx";
import CanteenMenu from "./CanteenMenu.jsx";

function Home() {
  // Check if the user is already logged in
  const username = localStorage.getItem("username");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 0,
      }}
    >
      <Header user={username} />

      <CanteenMenu />
    </Box>
  );
}

export default Home;
