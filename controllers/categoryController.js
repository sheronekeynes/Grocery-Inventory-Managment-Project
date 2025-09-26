const queries = require("../db/queries.js");

async function showCategory(req, res) {
  const categories = await queries.getAllCategory();
  categories.push({
    id: 7,
    name: "All category",
    category_img_path: "",
    tag_color: "#C5B0CD",
  });
  res.render("Category", {
    categories,
  });
}

module.exports = {
  showCategory,
};
