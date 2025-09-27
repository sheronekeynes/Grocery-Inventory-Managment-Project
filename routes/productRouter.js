const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController.js");

router.get("/", productController.showProducts);
router.get("/:id", productController.showSingleProduct);

router.put("/:id",productController.updateProduct)

module.exports = router;
