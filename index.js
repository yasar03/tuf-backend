const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
// app.use(cors());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// const dbURL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

// const db = mysql.createConnection(dbURL);
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner WHERE id = 1', (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

app.post('/api/banner', (req, res) => {
    const { description, timer, link, is_visible } = req.body;
    const sql = `UPDATE banner SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1`;
    db.query(sql, [description, timer, link, is_visible], (err, result) => {
        if (err) throw err;
        res.send('Banner updated successfully');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
