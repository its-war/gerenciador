const routes = require('express').Router();
const listarClientes = require('../controllers/listarClientes');
const listarCliente = require('../controllers/listarCliente');
const salvarCliente = require('../controllers/salvarCliente');
const alterarCliente = require('../controllers/alterarCliente');
const desativarCliente = require('../controllers/desativarCliente');
const ativarCliente = require('../controllers/ativarCliente');
const auth = require('../../config/autorizar');

routes.get('/listar', auth.verificarToken, listarClientes);
routes.get('/listar/:id', auth.verificarToken, listarCliente);
routes.post('/salvar', auth.verificarToken, salvarCliente);
routes.put('/alterar', auth.verificarToken, alterarCliente);
routes.put('/desativar', auth.verificarToken, desativarCliente);
routes.put('/ativar', auth.verificarToken, ativarCliente);

module.exports = routes;