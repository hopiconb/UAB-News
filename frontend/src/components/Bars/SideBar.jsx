import React, { useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  Divider,
  useTheme,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoUAB from "../../assets/logoUAB.png";
import { useNavigate } from "react-router-dom";

const drawerWidth = "15em";

function SideBar({}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const icons = {
    "Creaza Postare": <PostAddIcon />,
    "Editeaza Postari": <EditIcon />,
    Utilizatori: <PeopleIcon />,
    "Adauga utilizator": <PersonAddIcon />,
    Acasa: <HomeIcon />,
  };

  const userName = localStorage.getItem("username");

  const handleNavigation = (text) => {
    switch (text) {
      case "creaza postare":
        navigate("/admin/create-post");
        break;

      case "editeaza postari":
        navigate("/admin/edit-posts");
        break;
      case "utilizatori":
        navigate("/admin/users");
        break;
      case "adauga utilizator":
        navigate("/admin/add-user");
        break;
      case "acasa":
        navigate("/");
        break;
      default:
    }
  };

  useEffect(() => {
    navigate("/admin/create-post");
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isMobile ? "4em" : drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-start",
          px: 2,
        }}
      >
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
      </Box>
      <Divider />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {[
            "Creaza Postare",
            "Editeaza Postari",
            "Utilizatori",
            "Adauga utilizator",
            "Acasa",
          ].map((text) => {
            // Ascunde "Utilizatori" și "Adauga utilizator" dacă userul nu e admin
            if (
              (text === "Utilizatori" || text === "Adauga utilizator") &&
              userName !== "administrator"
            ) {
              return null;
            }

            return (
              <ListItem
                button={"true"}
                key={text}
                onClick={() => handleNavigation(text.toLowerCase())}
                sx={{
                  cursor: "pointer",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isMobile ? 0 : 2 }}>
                  {icons[text] ?? <InboxIcon />}
                </ListItemIcon>
                {!isMobile && <ListItemText primary={text} />}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideBar;
