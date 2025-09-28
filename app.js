const express = require("express");
const path = require("node:path");

const app = express();

// Routes
const homeRouter = require("./routes/homeRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const productRouter = require("./routes/productRouter.js");

require("dotenv").config();

// middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use('/uploads', express.static('uploads'));


// set ejs as templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

port = process.env.PORT || 3000;

app.use("/", homeRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);

// initialize server
app.listen(port, (error) => {
  if (error) {
    console.log("Oops something went wrong:", error);
    return;
  }
  console.log("Server started successfully at port:", port);
});
