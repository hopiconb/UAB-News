import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";

export default function FileUploadPreview({ onFileSelect, fileDB }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
      const imageUrl = URL.createObjectURL(file); // generează URL pt preview
      setImagePreview(imageUrl);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-image-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-image-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{ textTransform: "none", borderRadius: ".4em" }}
        >
          Alege o imagine
        </Button>
      </label>

      {imagePreview ? (
        <Box
          component="img"
          src={imagePreview} // Folosește preview-ul generat pentru fișierul selectat
          alt="Previzualizare"
          sx={{
            maxWidth: 200,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      ) : fileDB ? (
        <Box
          component="img"
          src={fileDB} // Folosește direct imaginea din baza de date (Base64)
          alt="Previzualizare din Baza de Date"
          sx={{
            maxWidth: 200,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nu ai ales niciun fișier
        </Typography>
      )}
    </Box>
  );
}
