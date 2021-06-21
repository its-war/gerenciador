const routes = require('express').Router();
const listarProdutos = require('../controllers/listarProdutos');
const listarProduto = require('../controllers/listarProduto');
const salvarProduto = require('../controllers/salvarProduto');
const alterarProduto = require('../controllers/alterarProduto');
const auth = require('../../config/autorizar');

routes.get('/listar', auth.verificarToken, listarProdutos);
routes.get('/listar/:id', auth.verificarToken, listarProduto);
routes.post('/salvar', auth.verificarToken, salvarProduto);
routes.put('/alterar', auth.verificarToken, alterarProduto);

module.exports = routes;