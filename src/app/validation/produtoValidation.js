const joi = require('joi');
const dados = joi.object({
    nome: joi.string().alphanum().min(1).max(250),
    quantidade: joi.number().min(1),
    valor: joi.number().min(1)
});
module.exports = dados;