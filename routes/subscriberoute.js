
const express = require("express");
const { subscribeUser } = require("../controllers/subscribecontroller");
const router = express.Router();
const auth = require("../middlewares/auth")
const User = require("../middlewares/user")

// router.post("/", auth, User, subscribeUser); 
router.post("/",subscribeUser); 
module.exports = router;
