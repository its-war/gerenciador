const joi = require('joi');
const dados = joi.object({
    nome: joi.string().alphanum().min(2).max(250),
    cpf: joi.string().min(11),
    telefone: joi.string().min(11)
});
module.exports = dados;