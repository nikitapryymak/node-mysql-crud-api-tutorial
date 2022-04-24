import "dotenv/config";
import mysql from "mysql2";

const db = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
  })
  .promise();

export default db;
