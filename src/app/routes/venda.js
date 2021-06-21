const routes = require('express').Router();
const efetuarVenda = require('../controllers/efetuarVenda');
const listarVendas = require('../controllers/listarVendas');
const listarVenda = require('../controllers/listarVenda');
const auth = require('../../config/autorizar');

routes.get('/listar', auth.verificarToken, listarVendas);
routes.get('/listar/:id', auth.verificarToken, listarVenda);
routes.post('/efetuarVenda', auth.verificarToken, efetuarVenda);

module.exports = routes;