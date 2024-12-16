const express = require("express");
const router = express.Router();
const {
  addNews,
  updateNews,
  deleteNews,
  getAllNews,
  getNewsById,
} = require("../controllers/newsController");

router.post("/add", addNews);
router.put("/update/:newsId", updateNews);
router.delete("/delete/:newsId", deleteNews);
router.get("/", getAllNews);
router.get("/:newsId", getNewsById);

module.exports = router;
