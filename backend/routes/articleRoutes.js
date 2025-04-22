const express = require("express");
const Article = require("../models/Article");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Route to get recent article
router.get("/get", async (req, res) => {
  try {
    // Găsim ultimul articol modificat (sortat descrescător după updatedAt)
    const article = await Article.findOne().sort({ updatedAt: -1 }).lean();

    // Dacă există o imagine, o convertim din buffer în Base64 pentru a putea fi afișată în frontend
    if (article?.image?.data) {
      const base64Image = article.image.data.toString("base64");
      article.image = `data:${article.image.contentType};base64,${base64Image}`;
    }

    res.status(200).json(article);
  } catch (err) {
    console.error("Error fetching recent article:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// Route to get by id
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const articles = await Article.find({ author: id }).lean();

    const processedArticles = articles.map((article) => {
      if (article.image?.data) {
        const base64Image = article.image.data.toString("base64");
        article.image = `data:${article.image.contentType};base64,${base64Image}`;
      }
      return article;
    });

    res.status(200).json(processedArticles);
  } catch (err) {
    console.error("Error fetching articles by author:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to add a new article
router.post("/upload", upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;

  const image = req.file
    ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    : null;

  try {
    const newArticle = new Article({ title, content, author, image });
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article added successfully", article: newArticle });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to update an article by ID
router.post("/edit/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updates = {
    title,
    content,
  };

  if (req.file) {
    updates.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article edited successfully",
      article: updatedArticle,
    });
  } catch (err) {
    console.error("Error editing article:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to delete an article by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({
      message: "Article deleted successfully",
      article: deletedArticle,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
