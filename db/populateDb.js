const { Client } = require("pg");

require("dotenv").config();
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS category(
                                                    id SERIAL PRIMARY KEY , 
                                                    name VARCHAR(200) , 
                                                    category_img_path TEXT)`;

const createProductTableQuery = `CREATE TABLE IF NOT EXISTS product(
                                                            id SERIAL PRIMARY KEY,
                                                            name VARCHAR(200),
                                                            price NUMERIC(10,2),
                                                            stock INT,
                                                            unit VARCHAR(50),
                                                            category_id INT REFERENCES category(id) ON DELETE CASCADE,
                                                            product_img_path TEXT)`;

const insertCategoryQuery = `INSERT INTO category (name , category_img_path) VALUES
                            ('Fruits','/assets/category/fruits.png'),
                            ('vegetables','/assets/category/vegetables.png'),
                            ('Bakery&Bread','/assets/category/bakery&bread.png'),
                            ('Snacks&Beverages','/assets/category/snacks&bevarages.png'),
                            ('Dairy&Eggs' ,'/assets/category/dairy&eggs.png' ),
                            ('Household_Essentials' ,'/assets/category/household_essentials.png' )
                            `;

const insertProductQuery = `INSERT INTO product (name , price , stock , unit , category_id , product_img_path)
                                VALUES
                                ('banana',10,200,'kg',1,'/assets/products/banana.png'),
                                ('mango',10,300,'kg',1,'/assets/products/mango.png'),
                                ('potato',15,500,'kg',2,'/assets/products/potato.png'),
                                ('spinach',15,500,'kg',2,'/assets/products/spinach.png'),
                                ('croissant',200,100,'pcs',3,'/assets/products/croissant.png'),
                                ('muffin',150,200,'pcs',3,'/assets/products/muffin.png'),
                                ('chips',30,500,'pack',4,'/assets/products/chips.png'),
                                ('soda-bottle',30,500,'L',4,'/assets/products/soda-bottle.png'),
                                ('milk',25,200,'L',5,'/assets/products/milk.png'),
                                ('eggs',10,500,'dozen',5,'/assets/products/eggs.png'),
                                ('toilet-paper',100,500,'rolls',6,'/assets/products/toilet-paper.png'),
                                ('laundry-detergent',250,500,'L',6,'/assets/products/laundry-detergent.png');`;

async function seed() {
  try {
    await client.connect();
    console.log("Database Connected");

    await client.query(createCategoryTableQuery);
    await client.query(createProductTableQuery);

    await client.query(insertCategoryQuery);
    await client.query(insertProductQuery);

    console.log("seeding completed");
  } catch (err) {
    console.error("error seeding database", err);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

seed();
