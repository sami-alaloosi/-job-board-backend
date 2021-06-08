const { User } = require("../../../database/db"); 


module.exports = async function (req,res){
    try {
        const {id} = req.params; 
        if (!id) return res.status(400).json({error: "please provide id"});
    
        const user = await User.findOne().where("_id").equals(id);
        if (!user) res.status(404).json({error: "user with this id not found!"});
    
        res.send(user);

    } catch (err){
        res.status(500).json({error: err}); 
    }
};