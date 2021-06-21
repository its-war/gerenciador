module.exports = (req, res) => {
    const conn = require('../../config/database');
    conn.query("select * from produto;", (err, results, fields) => {
        return res.send(results);
    })
}