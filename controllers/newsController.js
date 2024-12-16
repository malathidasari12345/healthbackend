const News = require('../models/news');

// Add News
const addNews = async (req, res) => {
  try {
    const { title, description, date , author} = req.body;
    console.log(title, description, date , author)
    const image = req.file?.path || req.body.image;
    // Check if the news already exists
    const existingNews = await News.findOne({ title });
    if (existingNews) {
      return res.status(400).json({ message: 'News with this title already exists.' });
    }

   

    const newNews = new News({
      title,
      description,
      author,
      image,
      date, 
    });

    await newNews.save();
    res.status(201).json({ message: 'News added successfully', newNews });
  } catch (err) {
    res.status(500).json({ message: 'Error adding news', error: err.message });
  }
};

// Update News
const updateNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { title, description, date , author, image } = req.body;

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    news.title = title || news.title;
    news.description = description || news.description;
    news.date = date || news.date;
    news.author = author || news.author;
    news.image = image || news.image;
    await news.save();

    res.status(200).json({ message: 'News updated successfully', news });
    console.log(news)
  } catch (err) {
    res.status(500).json({ message: 'Error updating news', error: err.message });
  }
};

// Delete News
const deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;

    // Find and delete the news item by ID
    const result = await News.findByIdAndDelete(newsId);

    if (!result) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting news', error: err.message });
  }
};

// Get All News
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find(); // Retrieves all news articles

    if (newsList.length === 0) {
      return res.status(404).json({ message: 'No news found' });
    }

    res.status(200).json(newsList); // Return all news articles
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving news', error: err.message });
  }
};

// Get Single News by ID
const getNewsById = async (req, res) => {
  try {
    const { newsId } = req.params;

    const news = await News.findById(newsId); // Finds the news article by ID

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.status(200).json(news); // Return the found news article
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving news', error: err.message });
  }
};

module.exports = {
  addNews,
  updateNews,
  deleteNews,
  getAllNews,
  getNewsById,
};
