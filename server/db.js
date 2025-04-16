const { Pool } = require("pg"); 

const pool = new Pool({
  user: "postgres",
  password: "taraji",
  host: "localhost",
  port: 5432,
  database: "myapppern"
});

module.exports = pool;
