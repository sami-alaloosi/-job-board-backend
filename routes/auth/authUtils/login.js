const 
{User} = require('../../../database/db'),
bcryptjs = require('bcryptjs'),
makeJWT = require('./makeJWT.js');

module.exports = async (req , res)=>{
     const {email , password} = req.body; 
    if (!email || !password) res.status(401).json({message: "please enter email and password"}); 
    const user = await User.find().where('email').equals(email); 
    if (user.length && user[0].password  && bcryptjs.compareSync(password, user[0].password)){
        const token = makeJWT(user); 

        res.status(200).json({token, email: user[0].email, userId: user[0]._id, 
            appliedJobs: user[0].appliedJobs, resume: user[0].resume}); 
    } else {
        res.status(401).json({message: 'invalid credentials!'}); 
    }
};