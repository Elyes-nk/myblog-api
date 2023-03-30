const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const token = req.headers.token;
    if (token == null) return res.status(401).send({auth:false,token:null,message:"You are not authenticated!"});
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
        if (err) return res.status(403).json({auth:false,token:null,error:err,message:"Token is not valid ! "})
        req.user = user;
        next();
    });
}

module.exports = verify;
