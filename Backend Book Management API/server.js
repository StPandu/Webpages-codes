const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});


db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'completed'))
    )
`);

const validStatuses = ['to-read', 'reading', 'completed'];


app.get('/books', (req, res) => {
    const { status } = req.query;

    let query = "SELECT * FROM books";
    let params = [];

    if (status) {
        query += " WHERE status = ?";
        params.push(status);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(row);
    });
});



app.post('/books', (req, res) => {
    const { title, author, year, status } = req.body;

    if (!title || !author || !status) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    const query = `
        INSERT INTO books (title, author, year, status)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [title, author, year, status], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Book created",
            id: this.lastID
        });
    });
});



app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, year, status } = req.body;

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    const query = `
        UPDATE books
        SET title = COALESCE(?, title),
            year = COALESCE(?, year),
            status = COALESCE(?, status)
        WHERE id = ?
    `;

    db.run(query, [title, year, status, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({ message: "Book updated" });
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({ message: "Book deleted" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});