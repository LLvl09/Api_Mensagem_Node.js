const jwt = require('jsonwebtoken');

exports.check = function(req, res, next)  {
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).send({
            message: 'Acesso negado'
        });
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, function (error, decoded) {
            if (error) {
                res.status(401).send({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
}