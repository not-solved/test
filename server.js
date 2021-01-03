const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect();


app.get('/api/todos', (req, res) => {
    let SQL = "SELECT * FROM TODAY";
    connection.query(SQL, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    })
});

app.post('/api/todos',  (req, res) => {
    let SQL = 'INSERT INTO TODAY VALUES (null, ?, ?, ?, false)';
    console.log(req.body);
    let title = req.body.title;
    let memo = req.body.memo;
    let deadline = req.body.deadline;
    let params = [title, memo, deadline];

    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    })
});

app.put('/api/todos/:daedline/:checked/:id', (req, res) => {
    let SQL = 'UPDATE TODAY SET deadline = ?, checked = ? WHERE id = ?';
    let title = [req.prarams.title];
    let memo = [req.params.memo];
    let deadline = [req.params.deadline];
    let checked = [req.params.checked];
    let id = [req.params.id];
    let params = [title, memo, deadline, checked, id];

    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    })
})

app.delete('/api/todos/:id', (req, res) => {
    let SQL = 'DELETE FROM TODAY WHERE id = ?';
    let params = [req.params.id];
    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});