const queries = require("../db/queries.js");

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

module.exports = {
  showProducts,
  showSingleProduct,
  updateProduct,
};
