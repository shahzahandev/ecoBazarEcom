const jwt = require('jsonwebtoken')

let suceMiddleWare = (req, res, next) => {
    let token = req.headers.authorization

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
       if(err){
        return res.send({message: "Unauthorization."})
       } else {
        next();
       }
    });
}

module.exports = suceMiddleWare