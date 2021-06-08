const {User} = require("../../../database/db");

module.exports = async function (req,res){
    try{
        const {firstName, lastName, email, userId} = req.body; 
    
        const user = await User.findOne().where("_id").equals(userId); 
        if (!user) return res.status(404).json({error: "user was not found"}); 
        user.firstName = firstName;
        user.lastName = lastName;
     
        if (email){
            const nonDupEmail = await User.findOne().where("email").equals(email);
            if (nonDupEmail) return res.status(400).json({error: "email is used by another user please try another email"}); 
            user.email = email;
        }
       
        await user.save();
        res.status(200).json(user); 

    } catch(err){
        res.status(500).json({error: err}); 
    }
};