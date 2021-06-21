module.exports = (req, res) => {
    const conn = require('../../config/database');
    let idCliente = req.body.id_cliente;
    let itens = req.body.itens;
    let valorTotal = 0;

    if(!isNaN(parseFloat(idCliente)) && isFinite(idCliente)){
        for(let i =0; i < itens.length; i++){
            if(!isNaN(parseFloat(itens[i].id_produto)) && isFinite(itens[i].id_produto)){
                valorTotal = valorTotal + (itens[i].quantidade * itens[i].valor);
            }else{
                return res.send("Tentando me trollar? :v");
            }
        }
        valorTotal = valorTotal.toFixed(2);
        conn.query("insert into venda values (default,?,?)", [idCliente, valorTotal], (err, result, field) => {
            if(err !== null){
                return res.send(err);
            }
            let idVenda = result.insertId;
            let sql = "insert into item values (default,?,?,?);";
            conn.beginTransaction(err => {});
            for(let i = 0; i < itens.length; i++){
                conn.query(sql, [itens[i].id_produto, idVenda, itens[i].quantidade], (err, result, field) => {
                    if(err !== null){
                        conn.rollback(() => {});
                        return res.send(err);
                    }
                });
            }
            if(conn.commit()){
                return res.send('');
            }
        });
    }else{
        return res.send("Tentando me trollar? :v");
    }
}