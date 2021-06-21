const routes = require('express').Router();
const efetuarLogin = require('../controllers/efetuarLogin');
const loggout = require('../controllers/loggout');
const verificarLogin = require('../controllers/verificarLogin');

routes.post('/efetuarLogin', efetuarLogin);
routes.get('/loggout', loggout);
routes.get('/verificarLogin', verificarLogin);

module.exports = routes;