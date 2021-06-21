const server = require('./src/config/server');
server.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
