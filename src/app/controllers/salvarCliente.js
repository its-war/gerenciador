module.exports = (req, res) => {
    const conn = require('../../config/database');
    const validation = require('../validation/clienteValidation');
    const CPF = require('../validation/cpf');
    let sql = "insert into cliente values (default, ?,?,?,?)";
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let telefone = req.body.telefone;

    nome = nome.split(' ');
    if(nome.length < 2){
        return res.send("O campo 'nome' não obedece os requisitos.");
    }
    let novoNome = '';
    for(let i = 0; i < nome.length; i++){
        if(validation.validate({nome: nome[i]}).error !== undefined){
            return res.send("O campo 'nome' não obedece os requisitos.");
        }else{
            novoNome = novoNome + nome[i].charAt(0).toUpperCase() + nome[i].substr(1) + " ";
        }
    }
    nome = novoNome.trim();

    cpf = cpf.replace(/[^0-9]/g,'');
    if(validation.validate({cpf: cpf}).error !== undefined){
        return res.send("O campo 'cpf' não obedece os requisitos.");
    }
    cpf = cpf.split('');
    let newCpf = "";
    for (let i = 0; i < 11; i++){
        newCpf = newCpf + cpf[i];
    }
    if(!CPF.validarCpf(newCpf)){
        return res.send('CPF inválido.');
    }
    const cpfFormat = newCpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, function(matchDaRegex, grupo1, grupo2, grupo3, grupo4) {
        cpf = `${grupo1}.${grupo2}.${grupo3}-${grupo4}`;
    });

    telefone = telefone.replace(/[^0-9]/g,'');
    telefone = telefone.trim();
    if(validation.validate({telefone: telefone}).error !== undefined){
        return res.send("O campo 'telefone' não obedece os requisitos.");
    }
    telefone = telefone.split('');
    let newTel = '';
    for(let i = 0; i < 11; i++){
        newTel = newTel + telefone[i];
    }
    const telefoneFormat = newTel.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, (matchDaRegex, g1, g2, g3, g4) => {
        telefone = "("+g1+") "+g2+" "+g3+"-"+g4;
    });

    conn.query("select id_cliente from cliente where cpf = ?;", cpf, (err, result, field) => {
        if(result.length > 0){
            return res.send("CPF já está em uso.");
        }else{
            conn.query("select id_cliente from cliente where telefone =?;", telefone, (err, result, field) => {
                if(result.length > 0){
                    return res.send("Telefone já está em uso.");
                }else{
                    conn.query(sql, [nome, cpf, telefone, 1], (err, result, field) => {
                        console.log(result);
                        return res.send('');
                    });
                }
            });
        }
    });
};