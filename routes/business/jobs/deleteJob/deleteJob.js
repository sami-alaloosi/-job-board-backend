const {Job} = require('../../../../database/db');

module.exports = async (req, res) => {
    try{
        const {id} = req.params; 
        await Job.findByIdAndRemove(id);
        res.status(201).json({message: `job with id : ${id} is removed`}); 
    } catch(err){
        res.status(404).json({message : err.message}); 
        console.error(err); 
    }
}; 



