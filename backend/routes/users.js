var express = require('express');
var router = express.Router();
var conn = require("../services/dbconnection");

/* GET users listing. */
router.post('/', function(req, res) {

    conn.getConnection((err, connection) => {
        connection.query('INSERT INTO user(userid, username, email, password) VALUES (?, ?,?,?)', [req.body.id, req.body.name, req.body.email, req.body.pass],
            (err, rows) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        res.sendStatus(409);
                    }
                } else {
                    res.sendStatus(201);
                }
            });
        connection.release();
    });
});

module.exports = router;