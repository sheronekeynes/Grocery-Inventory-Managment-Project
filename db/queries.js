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

async function filteredProducts(category, priceRange, sort) {
  let query = `SELECT 
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
  ON product.category_id = category.id WHERE product.price <= $1
  `;

  const params = [priceRange];

  if (category && category !== "All category") {
    query += ` AND category.name = $2`;
    params.push(category);
  }

  query += ` ORDER BY product.price ${sort === "lowtohigh" ? "ASC" : "DESC"}`;

  const { rows } = await pool.query(query, params);
  return rows;
}

async function getSingleProduct(id) {
  const query = `SELECT * FROM product WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getAllCategory,
  getAllProducts,
  getAllProductsWithCategory,
  filteredProducts,
  getSingleProduct,
};
