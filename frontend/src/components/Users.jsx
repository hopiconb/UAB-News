import React, { useEffect, useState } from "react";
import { fetchDeleteUser, fetchGetUsers } from "../Services/FetchUser.js";
import { MainBoxR } from "./Register.jsx";
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import theme from "../Themes/theme.jsx";
import MuiButton from "./Buttons/MuiButton.jsx";

const UsersBox = styled(Box)({
  width: "100%",
  flexDirection: "column",
  gap: "1em",
  display: "flex",
  height: "100%",
});

const UserCard = styled(Typography)({
  width: "100%",
  height: "auto",
  backgroundColor: theme.palette.secondary.dark,
  padding: "1em",
  borderRadius: "1em",
  gap: "1em",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ":hover": {
    fontSize: "1.1em",
  },
});

function Users() {
  const [users, setUsers] = useState([]);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  function deleteUser(e) {
    fetchDeleteUser(e._id).then((result) => {
      if (result) {
        alert("Utilizatorul a fost sters cu succes!");
      } else {
        alert("A apărut o eroare. Încearcă din nou.");
      }
    });
  }

  useEffect(() => {
    fetchGetUsers().then((result) => {
      if (!result) {
        console.log("Eroare la obtinerea userilor");
      } else {
        setUsers(result);
      }
    });
  }, [users]);

  return (
    <MainBoxR ismobile={isMobile ? "true" : undefined}>
      <UsersBox>
        {users
          .filter(
            (user) => user.username?.trim().toLowerCase() !== "administrator",
          )
          .map((user) => (
            <UserCard key={user._id}>
              {user.name}
              <MuiButton
                outline={"none"}
                border={`1px solid ${theme.palette.error.main}`}
                backgroundColor={theme.palette.secondary.dark}
                color={theme.palette.error.main}
                borderHover={`1px solid ${theme.palette.error.main}`}
                value={"Delete"}
                size={"small"}
                backgroundColorHover={theme.palette.error.main}
                colorHover={theme.palette.primary.contrastText}
                onClick={() => {
                  deleteUser(user);
                }}
              />
            </UserCard>
          ))}
      </UsersBox>
    </MainBoxR>
  );
}

export default Users;
