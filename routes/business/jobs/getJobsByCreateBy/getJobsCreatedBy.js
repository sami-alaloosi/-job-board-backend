const {Job} = require('../../../../database/db');

module.exports = async (req, res) => {
    try{
        const {createdBy} = req.params; 
        if (!createdBy) res.status(400).json({message: "please provude createby"});
        const jobs = await Job.find().where("createdBy").equals(createdBy);
        res.status(200).json({jobs}); 
        
    } catch(err){
        res.status(500).json({message : err.message}); 
        console.error(err); 
    }
}; 



