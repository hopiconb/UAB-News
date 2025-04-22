import React, { useEffect, useState } from "react";
import {
  fetchArticleDelete,
  fetchArticleGetById,
} from "../Services/FetchArticle.js";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MainBoxR } from "./Register.jsx";
import MuiButton from "./Buttons/MuiButton.jsx";
import theme from "../Themes/theme.jsx";
import { useNavigate } from "react-router-dom";

function EditPosts() {
  const [articles, setArticles] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllArticles = async () => {
      const userArticles = await fetchArticleGetById(userId);
      setArticles(userArticles);
    };
    getAllArticles();
  }, [articles]);
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  function deletePost(e) {
    fetchArticleDelete(e._id).then((result) => {
      if (result) {
        alert("Articol sters cu success!");
      } else {
        console.log("Eroare la stergere");
      }
    });
  }

  function editPost(e) {
    navigate("/admin/edit-post-page", { state: { article: e } });
  }

  return (
    <MainBoxR sx={{ height: "auto" }} ismobile={isMobile ? "true" : undefined}>
      <Typography variant="h4" gutterBottom>
        Editează postările tale
      </Typography>

      <Grid container spacing={3}>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <Grid sx={{ width: "14em" }} key={article._id}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {article.content}
                </Typography>

                {article.image && (
                  <Box
                    component="img"
                    src={article.image}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  />
                )}

                <Box display="flex" justifyContent="space-between">
                  <MuiButton
                    outline={"none"}
                    border={`1px solid ${theme.palette.success.dark}`}
                    backgroundColor={theme.palette.primary.contrastText}
                    color={theme.palette.success.dark}
                    backgroundColorHover={theme.palette.success.dark}
                    colorHover={theme.palette.primary.contrastText}
                    value={"Edit"}
                    onClick={() => {
                      editPost(article);
                    }}
                  />

                  <MuiButton
                    outline={"none"}
                    border={`1px solid ${theme.palette.error.main}`}
                    backgroundColor={theme.palette.primary.contrastText}
                    color={theme.palette.error.main}
                    borderHover={`1px solid ${theme.palette.error.main}`}
                    value={"Delete"}
                    backgroundColorHover={theme.palette.error.main}
                    colorHover={theme.palette.primary.contrastText}
                    onClick={() => {
                      deletePost(article);
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Nu ai articole momentan.</Typography>
        )}
      </Grid>
    </MainBoxR>
  );
}

export default EditPosts;
