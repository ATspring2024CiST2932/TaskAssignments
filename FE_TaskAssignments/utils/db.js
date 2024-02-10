// Task_Assignments/taskassignments/utils/db.js
// First, run `npm install dotenv` to add the dotenv package to your project.
// npm install next react react-dom
// npm install mysql2
//rm -rf node_modules rm package-lock.json npm install
// npm run dev

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


// Setup MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'sesame80',
  database: process.env.DB_NAME || 'Demo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
