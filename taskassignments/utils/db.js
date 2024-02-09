// Task_Assignments/taskassignments/utils/db.js
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'Joses-MacBook-Pro.local',
  user: 'root',
  password: 'sesame80',
  database: 'TaskTest'
});

export default connection;
