var express = require('express');
var router = express.Router();
var path = require("path")
var jwt = require('jsonwebtoken');
var db_config = require('../secrets/db-config.json');
var conn = require("../services/dbconnection");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, db_config.password, (err, v) => {
                if (err)
                    reject(err)
                else
                    resolve(v)
            })
        } else {
            reject("Not signed in.");
        }
    })
}
var refreshToken = (t) => {
    return new Promise((resolve, reject) => {
        verifyToken(t).then(token => {
            const dateObj = new Date();
            if (token.exp - (dateObj.getTime() / 1000) < 600) {
                console.log("Token is refreshed: " + token.userid);
                jwt.sign({
                        userid: token.userid,
                        username: token.username,
                        email: token.email,
                        role: token.role,
                        create_time: token.create_time,
                    },
                    db_config.password, {
                        expiresIn: '1h',
                        subject: 'userInfo'
                    }, (err, token) => {
                        if (!err) {
                            resolve(token);
                        } else {
                            reject(err)
                        }
                    })
            } else {
                resolve(false)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

router.post('/signin', function(req, res) {
    conn.getConnection((err, connection) =>
        connection.query('SELECT userid, username, email, role, create_time from user WHERE userid = ? and password = ?;', [req.body.id, req.body.password],
            (err, rows) => {
                if (err) {
                    res.sendStatus(404);
                } else {
                    if (rows[0] == undefined) {
                        res.sendStatus(404);
                    } else {
                        var curTime = new Date(rows[0].create_time);
                        var month = curTime.getMonth();
                        var date = curTime.getDate();
                        jwt.sign({
                                userid: rows[0].userid,
                                username: rows[0].username,
                                email: rows[0].email,
                                role: rows[0].role,
                                create_time: curTime.getFullYear() + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + date).slice(-2) + " " + ("0" + curTime.getHours()).slice(-2) + ":" + ("0" + curTime.getMinutes()).slice(-2) + ":" + ("0" + curTime.getSeconds()).slice(-2)
                            },
                            db_config.password, {
                                expiresIn: '1h',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) {
                                    res.sendStatus(401);
                                } else {
                                    res.status(200).json({
                                        status: 200,
                                        token: token
                                    });
                                }
                            });
                    }
                }

                connection.release();
            }));

});

router.post('/check', function(req, res) {
    const token = req.body.headers['x-access-token'];
    verifyToken(token).then(decoded => {
        if (decoded) {
            res.status(200).send({
                decoded
            })
        } else {
            res.status(401);
        }
    }).catch(err => {
        res.status(401);
    })

});

router.post('/refresh', function(req, res) {
    var token = req.body.token;
    refreshToken(token).then(newToken => {
        if (newToken == null)
            res.sendStatus(401);
        else {
            if (newToken) {
                res.status(201).send({
                    token: newToken
                });
            } else {
                res.sendStatus(202);
            }
        }
    }).catch(err => {
        res.status(406).send({
            msg: "TokenExpiredError"
        });
    })
});

module.exports = router;