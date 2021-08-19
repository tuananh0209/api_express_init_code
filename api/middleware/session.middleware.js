const uuidv4 = require('uuid').v4

module.exports = function (req, res , next){
    if (!req.signedCookies.sessionId){
        var sessionId = uuidv4()
        res.cookie('sessionId', sessionId ,{
            signed :true
        });
       
    }
    next();
}