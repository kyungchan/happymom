var express = require('express');
var router = express.Router();
var path = require("path")
var jwt = require('jsonwebtoken');
var db_config = require('../secrets/db-config.json');
var conn = require("../services/dbconnection");

/* GET home page. */
router.post('/signin', function(req, res) {
    console.log(req.body.id);
    conn.query('SELECT userid, username, email, password from user WHERE userid = ?;', [req.body.id],
        (err, rows) => {
            console.log(rows);
            if (err) {
                console.log("1" + err);
                res.sendStatus(404);
            } else {
                if (rows[0] == undefined) {
                    res.sendStatus(401);
                } else {
                    jwt.sign({
                            userid: rows[0].userid,
                            username: rows[0].username,
                            email: rows[0].email,
                        },
                        db_config.password, {
                            expiresIn: '1h',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) {
                                console.log("2" + err);
                                res.sendStatus(404);
                            } else {
                                res.status(200).send({
                                    token
                                });
                            }
                        });
                }
            }
        });
});

router.get('/me', function(req, res) {});

router.get('/refresh', function(req, res) {});

module.exports = router;