var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema({
  category: String,
  title: String,
  prices: [
    {
      price: Number,
      serviceType: String,
    },
  ],
  other: String,
});

//Export model
module.exports = mongoose.model("Services", ServiceSchema, "newAB");
