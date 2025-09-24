const queries = require("../db/queries.js");

async function showProducts(req, res) {
  const products = await queries.getAllProducts();
  const categories = await queries.getAllCategory();
  res.render("Product", { products , categories});
}

module.exports = {
  showProducts,
};
