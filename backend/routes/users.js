var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../secrets/db-config.json');

let conn;

var createConn = () => {
    conn = mysql.createConnection({
        host: db_config.host,
        user: db_config.user,
        port: db_config.port,
        password: db_config.password,
        database: db_config.database
    });

    conn.connect((error) => {
        console.log("Connecting...");
        if (error) {
            console.log("Connecting error: " + error);
            setTimeout(createConn, 2000);
        } else {
            console.log("Connecting Success!");
        }
    });

    conn.on('error', (error) => {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log(error);
            console.log("Re-Connecting...");
            return createConn();
        }
        throw error;
    });
};

createConn();

/* GET users listing. */
router.post('/', function(req, res) {
    console.log(req.body);
    conn.query('INSERT INTO user(userid, username, email, password) VALUES (?, ?,?,?)', [req.body.id, req.body.name, req.body.email, req.body.pass],
        (err, rows) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    console.log(err);
                    res.sendStatus(409);
                }
            } else {
                console.log.rows;
                res.sendStatus(201);
            }
        });
});

module.exports = router;