const express = require("express");
const app = express();
// env files
const dotenv = require("dotenv");
dotenv.config();
// import database
const db = require("./config/db");
const PORT = process.env.PORT || 5000;
// cors
const cors = require("cors");
app.use(cors());
// routes import
const userRoutes = require("./routes/userroutes");
const contactRoutes = require("./routes/contactroute");
const subscribeRoute = require("./routes/subscriberoute");
const campaignRoutes = require("./routes/campaignroute");
const newsRoutes = require("./routes/newsroutes");
const gallleryRoutes = require("./routes/galleryroutes");
// middleware
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", gallleryRoutes);
// home route
app.use("/", (req, res) => {
  res.json({ message: "Welcome to HomePage" });
});
//  listen port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
