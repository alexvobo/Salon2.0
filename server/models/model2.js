var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema({
  category: String,
  services: [
    {
      id: mongoose.Types.ObjectId,
      title: String,
      prices: [
        {
          price: Number,
          serviceType: String,
        },
      ],
    },
  ],

  other: String,
});

//Export model
module.exports = mongoose.model(
  "Services",
  ServiceSchema,
  "AmericanBeautySalonsMenu"
);
