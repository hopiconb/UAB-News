import React, { useState } from "react";
import { MainBoxR } from "./Register.jsx";
import {
  Box,
  styled,
  TextareaAutosize,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import theme from "../Themes/theme.jsx";
import FileUploadMUI from "./Inputs/FileUploadMUI.jsx";
import MuiButton from "./Buttons/MuiButton.jsx";
import { useLocation } from "react-router-dom";
import { fetchArticleEdit } from "../Services/FetchArticle.js";
const CreatePostBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
});

const InformationInput = styled(TextareaAutosize)({
  width: "100%",
  height: "auto",
  minHeight: "3em",
  padding: "1em",
  outline: "none",
  resize: "none",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: ".6em",
  gap: "2em",
});

function EditPostPage() {
  const location = useLocation();
  const article = location.state?.article;

  const [title, setTitle] = useState(article.title);
  const [textareaInput, setTextareaInput] = useState(article.content);
  const [image, setImage] = useState(article.image);

  function getTextareaInput(e) {
    setTextareaInput(e.target.value);
  }

  const handleImageChange = (file) => {
    setImage(file);
  };

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  const handleSubmite = async (e) => {
    e.preventDefault();

    fetchArticleEdit(article._id, title, textareaInput, image).then(
      (result) => {
        if (result) {
          alert("Articolul a fost actualizat cu succes!");
        } else {
          alert("A apărut o eroare. Încearcă din nou.");
        }
      },
    );
  };

  return (
    <MainBoxR ismobile={isMobile ? "true" : undefined}>
      <CreatePostBox>
        <InformationInput
          maxRows={4}
          aria-label="maximum height"
          placeholder="Descriere"
          value={textareaInput}
          onChange={getTextareaInput}
        />

        <FileUploadMUI
          fileDB={article.image}
          onFileSelect={handleImageChange}
        />

        <MuiButton
          backgroundColor={theme.palette.success.main}
          backgroundColorHover={theme.palette.success.contrastText}
          color={theme.palette.primary.contrastText}
          fontWeight={"bold"}
          maxWidth={"10em"}
          value={"Edit"}
          border={"none"}
          outline={"none"}
          onClick={handleSubmite}
        />
      </CreatePostBox>
    </MainBoxR>
  );
}

export default EditPostPage;
