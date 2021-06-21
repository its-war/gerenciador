module.exports = (req, res) => {
    const conn = require('../../config/database');
    let sql = "select * from cliente where id_cliente = ? and ativo=1;";
    let id = req.params.id;
    if(!isNaN(parseFloat(id)) && isFinite(id)){
        conn.query(sql, id, (err, result, field) => {
            res.send(result);
        });
    }else{
        res.send("Tentando me trollar? :v");
    }
};