const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ភ្ជាប់ទៅកាន់ MySQL Container
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'appdb'
});

// 1. API សម្រាប់ Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json({ success: true, message: "Login successful!" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials!" });
        }
    });
});

// 2. API សម្រាប់ទាញយកបញ្ជីសៀវភៅទាំងអស់ (GET /api/books)
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. API សម្រាប់បន្ថែមសៀវភៅ (POST /api/books)
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Book added successfully!" });
    });
});

app.listen(5000, () => console.log('Backend running on port 5000'));