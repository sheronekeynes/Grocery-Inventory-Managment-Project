const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");

router.get("/", categoryController.showCategory);

module.exports = router;
