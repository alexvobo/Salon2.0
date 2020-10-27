const express = require("express");
const Services = require("../models/model.js");
const router = express.Router();

// Get all Services
router.get("/services", async (req, res) => {
  const services = await Services.find({});
  res.send(services);
});
router.get("/services/headings", async (req, res) => {
  const services = await Services.aggregate(
    [{ $group: { _id: "$category" } }, { $sort: { _id: 1 } }],
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.send(result);
      }
    }
  );
});
router.put("/updateTitle/:id/:newTitle", async (req, res) => {
  Services.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.params.newTitle },
    function (err, result) {
      if (err) {
        console.log(req.params.id);
        console.log("rekt");
        res.json({ message: "Error", error: err });
      } else {
        console.log(req.params.serviceTitle, req.params.newTitle);
        res.json({ message: "Update success", data: result });
      }
    }
  );
});
router.put("/updateCategory/:category/:newName", async (req, res) => {
  Services.updateMany(
    { category: req.params.category },
    { category: req.params.newName },
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.json({ message: "Update success", data: result });
      }
    }
  );
});
// /* UPDATE PRODUCT */
// router.put("/:id", function (req, res, next) {
//   Services.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
module.exports = router;
