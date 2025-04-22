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
import { fetchArticleUpload } from "../Services/FetchArticle.js";
import MuiButton from "./Buttons/MuiButton.jsx";

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

function CreatePost() {
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("Meniu");
  const [textareaInput, setTextareaInput] = useState("");
  const [author, setAuthor] = useState(userId);
  const [image, setImage] = useState(null);

  function getTextareaInput(e) {
    setTextareaInput(e.target.value);
  }

  const handleImageChange = (file) => {
    setImage(file);
  };

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchArticleUpload(
      title,
      textareaInput,
      author,
      image,
    );
    if (result) {
      alert("Articolul a fost creat cu succes!");
    } else {
      alert("A apărut o eroare. Încearcă din nou.");
    }
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

        <FileUploadMUI onFileSelect={handleImageChange} />

        <MuiButton
          backgroundColor={theme.palette.success.main}
          backgroundColorHover={theme.palette.success.contrastText}
          color={theme.palette.primary.contrastText}
          fontWeight={"bold"}
          maxWidth={"10em"}
          value={"Incarca"}
          border={"none"}
          outline={"none"}
          onClick={handleSubmit}
        />
      </CreatePostBox>
    </MainBoxR>
  );
}

export default CreatePost;
