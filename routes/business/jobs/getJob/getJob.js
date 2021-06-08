const {Job} = require('../../../../database/db');

module.exports = async (req, res) => {
    try{
        const {id} = req.params; 
        const job = await Job.findById(id);
        res.status(200).json(job); 
    
    } catch(err){
        res.status(404).json({message : err.message}); 
        console.error(err); 
    }
}; 



