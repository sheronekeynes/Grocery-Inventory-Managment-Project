const queries = require("../db/queries.js");
require("dotenv").config();

async function showProducts(req, res) {
  const { category, priceRange, sort } = req.query;
  const price = parseFloat(priceRange) || 1000;
  //const products = await queries.getAllProductsWithCategory();
  const categories = await queries.getAllCategory();
  const products = await queries.filteredProducts(category, price, sort);
  res.render("Product", { products, categories });
}

async function showSingleProduct(req, res) {
  const { id } = req.params;
  const productDetail = await queries.getSingleProduct(id);
  const categoryList = await queries.getAllCategory();
  res.render("EditProduct", { productDetail, categoryList });
}

async function updateProduct(req, res) {
  const price = parseFloat(req.body.price);
  const stock = parseInt(req.body.stock, 10);
  const categoryId = parseInt(req.body.categoryId, 10);

  const { id } = req.params;

  await queries.updateProduct(id, price, stock, categoryId);

  // back to product lise
  res.status(200);
  res.redirect("/products");
}

async function showAddProductForm(req, res) {
  const categoryList = await queries.getAllCategory();
  res.render("AddProduct", { categoryList });
}

async function addProduct(req, res) {
  const { productName, price, stock, unit, categoryId } = req.body;
  const image = req.file ? req.file.filename : null;

  const isDuplicate = await queries.checkDupName(productName);

  if (isDuplicate) {
    return res.status(400).send("Product name already exists");
  }

  await queries.createProduct(
    productName,
    price,
    stock,
    unit,
    categoryId,
    image
  );

  res.redirect("/products");
}

async function deleteProduct(req, res) {
  const { id, password } = req.body;

  const product = await queries.getSingleProduct(id);


  if (!product) {
    return res.status(404).send("Product not found");
  }

  if (product.is_protected) {
    if (!password) {
      return res.status(400).send("password required");
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send("invalid password");
    }
  }

  await queries.deleteProduct(id);

  res.redirect("/products");
}

module.exports = {
  showProducts,
  showSingleProduct,
  updateProduct,
  showAddProductForm,
  addProduct,
  deleteProduct,
};
