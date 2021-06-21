require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.send({auth: false, msg: "Não autorizado."});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.send({auth: false, msg: "Token inválido."});
        return res.send({auth: true});
    });
}