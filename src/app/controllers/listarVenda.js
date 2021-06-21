module.exports = (req, res) => {
    const conn = require('../../config/database');
    let id = req.params.id;
    if(!isNaN(parseFloat(id)) && isFinite(id)){
        conn.query("select v.id_venda, v.valor, i.id_item, i.quantidade, c.id_cliente, c.nome as nome_cliente, c.ativo, p.nome as nome_produto, p.id_produto, p.valor as valor_produto from venda as v inner join item as i on v.id_venda = i.id_venda inner join cliente as c on v.id_cliente = c.id_cliente inner join produto as p on i.id_produto = p.id_produto where v.id_venda=? order by i.id_item;", id, (err, result, field) => {
            res.send(result);
        });
    }else{
        res.send("Tentando me trollar? :v");
    }
}