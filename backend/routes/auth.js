var express = require('express');
var router = express.Router();
var path = require("path")
var jwt = require('jsonwebtoken');
var db_config = require('../secrets/db-config.json');
var conn = require("../services/dbconnection");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        console.log(token);
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
const refreshToken = async(t) => {
    let oldToken = await checkToken(t)
    jwt.sign({
            userid: oldToken.userid,
            username: oldToken.username,
            email: oldToken.email,
        },
        db_config.password, {
            expiresIn: '1h',
            subject: 'userInfo'
        }, (err, token) => {
            if (!err)
                return token
            else
                return null
        })
}

router.post('/signin', function(req, res) {
    conn.getConnection((err, connection) =>
        connection.query('SELECT userid, username, email, role from user WHERE userid = ? and password = ?;', [req.body.id, req.body.password],
            (err, rows) => {
                if (err) {
                    res.sendStatus(404);
                } else {
                    if (rows[0] == undefined) {
                        res.sendStatus(404);
                    } else {
                        jwt.sign({
                                userid: rows[0].userid,
                                username: rows[0].username,
                                email: rows[0].email,
                                role: rows[0].role
                            },
                            db_config.password, {
                                expiresIn: '1h',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) {
                                    res.sendStatus(400);
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
            res.status(403);
        }
    })

});

router.get('/refresh', function(req, res) {
    const token = req.headers['x-access-token'];
    const newToken = refreshToken(token);
    if (newToken) {
        res.status(200).send({
            token
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;