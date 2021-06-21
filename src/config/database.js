const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "warney",
    password: "27652765",
    port: 3306,
    database: "gerenciador"
});

module.exports = connection;