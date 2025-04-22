import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { fetchArticleGetRecent } from "../Services/FetchArticle.js";
import theme from "../Themes/theme.jsx";

function CanteenMenu() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getRecentArticle = async () => {
      const recentArticle = await fetchArticleGetRecent();
      setArticle(recentArticle);
    };
    getRecentArticle();
  }, []);
  // console.log(article._id);
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={8}
      px={2}
      p={4}
    >
      {article ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor={theme.palette.background.paper}
          borderRadius={4}
          boxShadow={3}
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%", xl: "30%" }}
          p={3}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            {article.content}
          </Typography>

          {article.image && (
            <Box
              component="img"
              src={article.image}
              alt="Article"
              sx={{
                width: "100%",
                borderRadius: 2,
                objectFit: "contain",
                maxHeight: 400,
              }}
            />
          )}
        </Box>
      ) : (
        <Typography variant="body1">Loading recent article...</Typography>
      )}
    </Box>
  );
}

export default CanteenMenu;
