const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

router.get("/", productController.showProducts);
router.get("/:id", productController.showSingleProduct);

module.exports = router;
