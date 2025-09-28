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

async function updateProduct(id, price, stock, categoryId) {
  const query = `UPDATE product SET 
                 price = $1,
                 stock = $2,
                 category_id = $3
                 WHERE id = $4
                 `;

  await pool.query(query, [price, stock, categoryId, id]);
}

async function checkDupName(productName) {
  const query = `SELECT 1 FROM product WHERE name = $1 LIMIT 1;`;
  const { rows } = await pool.query(query, [productName]);
  return rows.length > 0; // true if duplicate exists
}

async function createProduct(
  productName,
  price,
  stock,
  unit,
  categoryId,
  image
) {
  let imagePath = `/uploads/${image}`;
  const query = ` INSERT INTO product (name , price , stock , unit , category_id , product_img_path) 
                  Values ($1,$2,$3,$4,$5,$6);`;

  const { rows } = await pool.query(query, [
    productName,
    price,
    stock,
    unit,
    categoryId,
    imagePath,
  ]);

  return rows[0];
}

module.exports = {
  getAllCategory,
  getAllProducts,
  getAllProductsWithCategory,
  filteredProducts,
  getSingleProduct,
  updateProduct,
  checkDupName,
  createProduct,
};
