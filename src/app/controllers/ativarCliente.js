module.exports = (req, res) => {
    const conn = require('../../config/database');
    let id = req.body.id;
    if(!isNaN(parseFloat(id)) && isFinite(id)){
        conn.query("update cliente set ativo=1 where id_cliente=?", id, (err, result, field) => {
            return res.send('');
        });
    }else{
        res.send("Tentando me trollar? :v");
    }
}