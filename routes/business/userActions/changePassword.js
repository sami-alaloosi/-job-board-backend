const bcryptjs = require('bcryptjs');
const {User} = require("../../../database/db");

module.exports = async function changePassword (req, res){
    try {
        const {newPassword} = req.body; 
        const {password} = req.body; 
        const {userId} = req.body; 
        if (!password) return res.status(400).json({error: "please provide password"}); 
        if (!userId) return res.status(400).json({error: "please provide userId"}); 
        if (!newPassword) return res.status(400).json({error: "pelase provide a new password"}); 

        const user = await User.findOne().where("_id").equals(userId); 
        if (!user) return res.status(404).json({error: "user with provided id was not found!"}); 
    
        if (bcryptjs.compareSync(password, user.password) && newPassword.length){
            const hash = bcryptjs.hashSync(newPassword, 4);
            user.password = hash;
            await user.save(); 
            res.status(200).json({message: "password was changed"}); 
        } else {
            res.status(401).json({error: "invalid credentials!"});
        }

    }
     catch(err){
        res.status(500).json({error: err}); 
    }
  
}; 