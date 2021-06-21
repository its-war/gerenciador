module.exports = (req, res) => {
    const conn = require('../../config/database');
    let sql = "select * from cliente where ativo=1;";
    conn.query(sql, (err, results, fields) => {
        res.send(JSON.parse(JSON.stringify(results)));
    });
}