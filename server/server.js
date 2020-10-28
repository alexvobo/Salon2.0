var mongoose = require("mongoose");
const express = require("express");

var port = 4000;
const routes = require("./routes/routes");
var uri = "mongodb://localhost:27017/local";

// Connect to MongoDB database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () => {
      console.log("Server has started!");
    });
  });
