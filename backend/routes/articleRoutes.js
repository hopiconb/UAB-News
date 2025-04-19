const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// Route to get all articles or fetch by criteria
router.get('/', async (req, res) => {
  try {
    const criteria = req.query; // Use query parameters for filtering
    const articles = await Article.find(criteria).populate({
        path: 'author',
        select: 'username email'
      });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to add a new article
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newArticle = new Article({ title, content, author });
    await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', article: newArticle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to update an article by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to delete an article by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully', article: deletedArticle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;