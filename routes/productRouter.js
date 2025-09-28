const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");

const productController = require("../controllers/productController.js");

router.get("/", productController.showProducts);

router.get("/new", productController.showAddProductForm);
router.post("/new", upload.single("image"), productController.addProduct);

router.get("/:id", productController.showSingleProduct);
router.put("/:id", productController.updateProduct);

module.exports = router;
