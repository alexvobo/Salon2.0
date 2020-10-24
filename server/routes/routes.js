const express = require("express");
const Services = require("../models/model.js");
const router = express.Router();

// Get all posts
router.get("/services", async (req, res) => {
  const services = await Services.find({});
  res.send(services);
});

// // Get all posts
// router.get("/posts", async (req, res) => {
//   const posts = await Services.find();
//   res.send(posts);
// });

module.exports = router;
