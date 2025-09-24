const express = require('express')
const router = express.Router();

const productController = require("../controllers/productController.js")

router.use('/',productController.showProducts)

module.exports = router;
