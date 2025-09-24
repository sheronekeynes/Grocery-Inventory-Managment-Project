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

module.exports = {
  getAllCategory,
  getAllProducts
};
