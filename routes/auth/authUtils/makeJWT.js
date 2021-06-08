
const jwt = require('jsonwebtoken')
module.exports = function makeJWT({_id, email}){
    const payload = {
        _id, 
        email
    };
    const config = {
        jwtsecret : process.env.JWT_SECRET || 'is it safe or are you exposed which is it?!'
    };
    return jwt.sign(payload, config.jwtsecret); 
}