const express = require("express");
const Services = require("../models/model.js");
const router = express.Router();
var mongoose = require("mongoose");
//! Create

// Create record
router.put(
  "/createRecord/:category/:title/:price/:type?/:other?",
  async (req, res) => {
    const cat = req.params.category;
    const title = req.params.title;
    const price = req.params.price;

    let type = req.params.type;
    let other = req.params.other;
    if (!type) type = "";
    if (!other) other = "";

    let doc = {
      category: cat,
      title: title,
      prices: [
        {
          price: price,
          serviceType: type,
        },
      ],
      other: other,
    };
    const services = await Services.create(doc, function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Created doc: ${doc}`,
          data: result,
        });
      }
    });
  }
);
// Create sub record
router.put("/createSubrecord/:id/:newPrice/:newType?", async (req, res) => {
  const newPrice = req.params.newPrice;
  let newType = req.params.newType;
  if (!newType) newType = "";
  const services = await Services.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: {
        prices: {
          price: newPrice,
          serviceType: newType,
        },
      },
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Added [${newPrice}, ${newType}] in id: ${req.params.id}`,
          data: result,
        });
      }
    }
  );
});
//! Read
// Get all Services
router.get("/services", async (req, res) => {
  const services = await Services.find({});
  res.send(services);
});
// Get categories
router.get("/services/headings", async (req, res) => {
  const services = await Services.aggregate(
    [
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});
// Get service by ID
router.get("/services/byID/:id", async (req, res) => {
  const services = await Services.findOne(
    {
      _id: req.params.id,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});
//Get services by category
router.get("/services/byCat/:category", async (req, res) => {
  const services = await Services.find(
    {
      category: req.params.category,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});
//Get services by title
router.get("/services/byTitle/:title", async (req, res) => {
  const services = await Services.findOne(
    {
      title: req.params.title,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
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

//! Update
// Update category name
router.put("/updateCategory/:category/:newName", async (req, res) => {
  const cat = req.params.category;
  const newName = req.params.newName;
  if (cat != newName) {
    const services = await Services.updateMany(
      {
        category: cat,
      },
      {
        category: newName,
      },
      function (err, result) {
        if (err) {
          res.json({
            message: "Error",
            error: err,
          });
        } else {
          res.json({
            message: `Updated ${cat} to ${newName}`,
            data: result,
          });
        }
      }
    );
  } else {
    res.json({
      message: `Identical items ${cat} and ${newName}`,
    });
  }
});
// Update title bound to ID
router.put("/updateTitle/:id/:newTitle", async (req, res) => {
  const newTitle = req.params.newTitle;
  const services = await Services.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      title: newTitle,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Updated title to ${newTitle}`,
          data: result,
        });
      }
    }
  );
});
// Update title by title
router.put("/updateTitleByName/:oldTitle/:newTitle", async (req, res) => {
  const oldTitle = req.params.oldTitle;
  const newTitle = req.params.newTitle;
  const services = await Services.findOneAndUpdate(
    {
      title: oldTitle,
    },
    {
      title: newTitle,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Updated title to ${newTitle}`,
          data: result,
        });
      }
    }
  );
});
// Update price bound to ID
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
          res.json({
            message: update,
            error: err,
          });
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
// Update type bound to ID
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
        "prices.serviceType": {
          $regex: /\s*(${oldType})?\s*/,
          $options: "ig",
        },
      },
      {
        $set: {
          "prices.$.serviceType": newType,
        },
      },
      function (err, result) {
        if (err) {
          res.json({
            message: update,
            error: err,
          });
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
// Update other text bound to ID
router.put("/updateOther/:id/:newOther?", async (req, res) => {
  let newOther = req.params.newOther;
  if (!newOther) {
    newOther = "";
  }
  const services = await Services.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      other: newOther,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Updated other to ${newOther}`,
          data: result,
        });
      }
    }
  );
});
//! Delete

// Remove record
router.put("/removeRecord/:id", async (req, res) => {
  const services = await Services.deleteOne(
    {
      _id: req.params.id,
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Removed doc with id: ${req.params.id}`,
          data: result,
        });
      }
    }
  );
});

// Remove sub record
router.put("/removePriceType/:id/:oldPrice/:oldType", async (req, res) => {
  const oldPrice = req.params.oldPrice;
  const oldType = req.params.oldType;
  const services = await Services.updateOne(
    {
      _id: req.params.id,
    },
    {
      $pull: {
        prices: {
          price: oldPrice,
          serviceType: oldType,
        },
      },
    },
    function (err, result) {
      if (err) {
        res.json({
          message: "Error",
          error: err,
        });
      } else {
        res.json({
          message: `Removed [${oldPrice}, ${oldType}] in id: ${req.params.id}`,
          data: result,
        });
      }
    }
  );
});
module.exports = router;
