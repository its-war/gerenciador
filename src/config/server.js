const express = require('express');
const app = express();
const cors = require('cors');
const clienteRoutes = require('../app/routes/cliente');
const produtoRoutes = require('../app/routes/produto');
const vendaRoutes = require('../app/routes/venda');
const loginRoute = require('../app/routes/login');

app.use(express.json());
app.use(cors());

app.use('/cliente', clienteRoutes);
app.use('/produto', produtoRoutes);
app.use('/venda', vendaRoutes);
app.use('/login', loginRoute);

module.exports = app;