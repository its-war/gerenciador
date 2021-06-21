module.exports = (req, res) => {
    const conn = require('../../config/database');
    let id = req.params.id;
    if(!isNaN(parseFloat(id)) && isFinite(id)){
        conn.query("select * from produto where id_produto = ?;", id, (err, result, field) => {
            res.send(result);
        });
    }else{
        res.send("Tentando me trollar? :v");
    }
}