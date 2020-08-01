const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, 'qajsekretiprejenv');
        req.user = verified;
        next();
    } catch(err) {
        
    }
}

module.exports = auth;