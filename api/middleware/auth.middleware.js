const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

module.exports.auth = async function(req, res , next){
    var token
    try{
        token = req.headers["authorization"].split(" ")[1]
    }catch(e){
        res.status(403).send("Not authorize")
        return
    }

    if (!token){
        res.status(403).send("Not authorize")
        return
    }

    try {
        const tokenDecode = jsonwebtoken.decode(token, process.env.TOKEN)
        req['user'] = tokenDecode
    }catch (e) {
        res.status(401).send("Token invalid")
        return
    }
    next()
}