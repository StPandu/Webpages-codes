const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'app.db');
const modelPath = path.join(__dirname, 'model.sql');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;');

  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='artists'`,
    (err, row) => {
      if (err) {
        console.error('Failed to check schema:', err.message);
        return;
      }

      if (!row) {
        const sql = fs.readFileSync(modelPath, 'utf-8');
        db.exec(sql, (execErr) => {
          if (execErr) {
            console.error('Failed to run model.sql:', execErr.message);
          } else {
            console.log('Database initialized using model.sql');
          }
        });
      } else {
        console.log('Database already initialized.');
      }
    }
  );
});

module.exports = db;