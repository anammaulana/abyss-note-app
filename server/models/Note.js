const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Kosongkan jika tidak ada password
  database: 'notes_db',  // Nama database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;
