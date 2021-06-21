module.exports = (req, res) => {
    const conn = require('../../config/database');
    conn.query('select venda.*, cliente.nome, cliente.cpf, cliente.ativo, CASE WHEN ativo = 1 THEN "Cliente Ativo" ELSE "Cliente Desativado" END as ativo_label from venda inner join cliente on venda.id_cliente = cliente.id_cliente;', (err, results, fields) => {
        return res.send(results);
    });
}