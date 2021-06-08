const 
{User} = require('../../../database/db'),
bcryptjs = require('bcryptjs'),
signupMassage = require('./signUpMassage.js'),
makeJWT = require('./makeJWT.js');
      

module.exports = async (req , res) =>{
     
     if (typeof req.body.password === 'string' && typeof req.body.email === 'string' &&
        req.body.firstName &&req.body.lastName){
    try {
         const body = signupMassage(req.body); 
         const hash = bcryptjs.hashSync(body.password, 4);
         // set the body to the hash result 
         body.password = hash; 
         const user = await User.create(body); 
         const token = makeJWT(user); 
        res.status(200).json({user, token});
    }catch(err){
        if (err.message.includes("duplicate key error")){
            res.status(403).json({message: "email already exists!"})
        } else {
            res.status(500).json({message: err.message}); 
        }
    }
    } else {
        res.status(400).json({message : "please provide a username & password firstName & lastName to register"}); 
    }
}