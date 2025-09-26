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
  console.log(productDetail);
  res.send("single product page");
}

module.exports = {
  showProducts,
  showSingleProduct,
};
