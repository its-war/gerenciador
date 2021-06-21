module.exports = (req, res) => {
    const conn = require('../../config/database');
    const validation = require('../validation/clienteValidation');
    let sql = "update cliente set nome=?, telefone=? where id_cliente=?";
    let id = req.body.id;
    let nome = req.body.nome;
    let telefone = req.body.telefone;

    nome = nome.split(' ');
    if(nome.length < 2){
        return res.send("O campo 'nome' não obedece os requisitos. (Nome Completo)");
    }
    let novoNome = '';
    for(let i = 0; i < nome.length; i++){
        if(validation.validate({nome: nome[i]}).error !== undefined){
            return res.send("O campo 'nome' não obedece os requisitos. (Cada nome deve ter o mínimo de duas letras)");
        }else{
            novoNome = novoNome + nome[i].charAt(0).toUpperCase() + nome[i].substr(1) + " ";
        }
    }
    nome = novoNome.trim();

    telefone = telefone.replace(/[^0-9]/g,'');
    telefone = telefone.trim();
    if(validation.validate({telefone: telefone}).error !== undefined){
        return res.send("O campo 'telefone' não obedece os requisitos. (Telefone deve ter exatamente onze dígitos, ex: (11) 1 1111-1111)");
    }
    telefone = telefone.split('');
    let newTel = '';
    for(let i = 0; i < 11; i++){
        newTel = newTel + telefone[i];
    }
    const telefoneFormat = newTel.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, (matchDaRegex, g1, g2, g3, g4) => {
        telefone = "("+g1+") "+g2+" "+g3+"-"+g4;
    });

    conn.query("select id_cliente from cliente where telefone =?;", telefone, (err, result, field) => {
        if(result.length > 0){
            conn.query("select nome from cliente where telefone =? and id_cliente=?;", [telefone, id], (err, result, field) => {
                if(result.length > 0){
                    conn.query(sql, [nome, telefone, id], (err, result, field) => {
                        console.log(result);
                        return res.send("");
                    });
                }else{
                    return res.send("Telefone já está em uso.");
                }
            });
        }else{
            conn.query(sql, [nome, telefone, id], (err, result, field) => {
                console.log(result);
		        return res.send("");
            });
        }
    });
}