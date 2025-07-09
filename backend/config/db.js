// backend/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your DB password
  database: 'medconnect_rwanda',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
