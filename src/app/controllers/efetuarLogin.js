require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
    const tokenVF = req.headers['x-access-token'];
    const conn = require('../../config/database');
    jwt.verify(tokenVF, process.env.SECRET, (err, decoded) => {
        if(!err){
            return res.sendStatus(401);
        }
    });
    let usuario = req.body.usuario;
    let senha  = req.body.senha;
    let sql = "select chave from login_usuario where binary username = ? and binary senha = ?;";
    conn.query(sql, [usuario, senha], (err, result, field) => {
        if(result.length > 0){
            let chave = result[0].chave + Date.now().toString() + Math.random().toString();
            const token = jwt.sign({chave}, process.env.SECRET, {
                expiresIn: 1800 // quantidade de segundos até exigir login novamente
            });
            req.chave = chave;
            return res.json({auth: true, token: token});
        }else{
            return res.sendStatus(400);
        }
    });
}