const express = require("express");
const Services = require("../models/model.js");
const router = express.Router();
var mongoose = require("mongoose");

// Get all Services
router.get("/services", async (req, res) => {
  const services = await Services.find({});
  res.send(services);
});
// Get categories
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
router.get("/services/byID/:id", async (req, res) => {
  const services = await Services.findOne({ _id: req.params.id }, function (
    err,
    result
  ) {
    if (err) {
      res.json({ message: "Error", error: err });
    } else {
      res.send(result);
    }
  });
});
router.get("/services/byCat/:category", async (req, res) => {
  const services = await Services.find(
    { category: req.params.category },
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.send(result);
      }
    }
  );
});
router.get("/services/byTitle/:title", async (req, res) => {
  const services = await Services.findOne(
    { title: req.params.title },
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.send(result);
      }
    }
  );
});
// // Create ID for inner service objects. Dev use only
// router.put("/create-ids", async (req, res) => {
//   const services = await Services.updateMany(
//     {},
//     {
//       $set: {
//         "services.$[].id": new mongoose.mongo.ObjectId(),
//       },
//     },
//     { upsert: true },
//     function (err, result) {
//       if (err) {
//         res.json({ message: "Error", error: err });
//       } else {
//         res.json({ message: "Update success", data: result });
//       }
//     }
//   );
// });

router.put("/updateCategory/:category/:newName", async (req, res) => {
  const cat = req.params.category;
  const newName = req.params.newName;
  if (cat != newName) {
    const services = await Services.updateMany(
      { category: cat },
      { category: newName },
      function (err, result) {
        if (err) {
          res.json({ message: "Error", error: err });
        } else {
          res.json({
            message: `Updated ${cat} to ${newName}`,
            data: result,
          });
        }
      }
    );
  } else {
    res.json({ message: `Identical items ${cat} and ${newName}` });
  }
});
router.put("/updateTitle/:id/:newTitle", async (req, res) => {
  const newTitle = req.params.newTitle;
  const services = await Services.findOneAndUpdate(
    { _id: req.params.id },
    { title: newTitle },
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.json({
          message: `Updated title to ${newTitle}`,
          data: result,
        });
      }
    }
  );
});
router.put("/updatePrice/:id/:oldPrice/:newPrice", async (req, res) => {
  const oldPrice = req.params.oldPrice;
  const newPrice = req.params.newPrice;
  if (oldPrice != newPrice) {
    const services = await Services.findOneAndUpdate(
      {
        _id: req.params.id,
        "prices.price": oldPrice,
      },
      {
        $set: {
          "prices.$.price": newPrice,
        },
      },
      function (err, result) {
        if (err) {
          res.json({ message: update, error: err });
        } else {
          res.json({
            message: `Updated ${oldPrice} to ${newPrice}`,
            data: result,
          });
        }
      }
    );
  } else {
    res.json({
      message: `Identical items ${oldPrice} and ${newPrice}`,
    });
  }
});

router.put("/updateType/:id/:oldType?/:newType?", async (req, res) => {
  let oldType = req.params.oldType;
  let newType = req.params.newType;
  if (oldType != newType) {
    if (!oldType) {
      oldType = "";
    }
    if (!newType) {
      newType = "";
    }
    const services = await Services.findOneAndUpdate(
      {
        _id: req.params.id,
        "prices.serviceType": { $regex: /\s*(${oldType})?\s*/, $options: "ig" },
      },
      {
        $set: {
          "prices.$.serviceType": newType,
        },
      },
      function (err, result) {
        if (err) {
          res.json({ message: update, error: err });
        } else {
          res.json({
            message: `Updated ${oldType} to ${newType} `,
            data: result,
          });
        }
      }
    );
  } else {
    res.json({
      message: `Identical items ${oldType} and ${newType}`,
    });
  }
});
router.put("/updateOther/:id/:newOther?", async (req, res) => {
  let newOther = req.params.newOther;
  if (!newOther) {
    newOther = "";
  }
  const services = await Services.findOneAndUpdate(
    { _id: req.params.id },
    { other: newOther },
    function (err, result) {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.json({ message: `Updated other to ${newOther}`, data: result });
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
