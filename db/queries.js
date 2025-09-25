const pool = require("./pool");

// category-> (id , name , url)  product -> (id , name , price ,stock , unit , category )

async function getAllCategory(params) {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function getAllProducts(params) {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
}

async function getAllProductsWithCategory() {
  const { rows } = await pool.query(`
    SELECT 
      product.id,
      product.name,
      product.price,
      product.stock,
      product.unit,
      product.product_img_path,
      category.name AS category_name,
      category.tag_color
    FROM product
    INNER JOIN category 
    ON product.category_id = category.id
  `);
  return rows;
}

module.exports = {
  getAllCategory,
  getAllProducts,
  getAllProductsWithCategory,
};
