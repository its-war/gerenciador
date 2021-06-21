module.exports = (req, res) => {
    const conn = require('../../config/database');
    const validation = require('../validation/produtoValidation');
    let id = req.body.id;
    let nome = req.body.nome;
    let quantidade = req.body.quantidade;
    let valor = req.body.valor.toFixed(2);

    if(!isNaN(parseFloat(id)) && isFinite(id)){
    }else{
        res.send("Tentando me trollar? :v");
    }

    nome = nome.split(' ');
    let newNome = '';
    for(let i = 0; i < nome.length; i++){
        if(validation.validate({nome: nome[i]}).error !== undefined){
            return res.send("o campo 'nome' não obecede os requisitos.");
        }
        newNome = newNome + nome[i] + " ";
    }
    nome = newNome.trim();

    quantidade = quantidade.toString();
    quantidade = quantidade.replace(/[^0-9]/g,'');
    quantidade = Number.parseInt(quantidade);
    if(validation.validate({quantidade: quantidade}).error !== undefined){
        return res.send("o campo 'quantidade' não obecede os requisitos.");
    }

    if(validation.validate({valor: valor}).error !== undefined){
        return res.send("o campo 'valor' não obecede os requisitos.");
    }

    conn.query("update produto set nome=?, quantidade=?, valor=? where id_produto=?", [nome, quantidade, valor, id], (err, result, field) => {
        console.log(result);
        return res.send('');
    });
}