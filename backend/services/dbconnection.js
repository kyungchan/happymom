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
module.exports = conn;