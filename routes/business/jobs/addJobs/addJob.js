const {Job} = require('../../../../database/db');

module.exports = async (req, res) => {
    try{
        const {email} = req.body;
        const body = req.body; 
        delete body.email; 
        const newJob = new Job({...body, createdAt : new Date().toISOString(), createdBy: email});
        newJob.save(function (err, book) {
            if (err){ 
            return console.error(err);
            }
            console.log(newJob.jobTitle + " saved to job collection.");
          });
        res.status(201).json(newJob);
    } catch(err){
        res.status(404).json({message : err.message}); 
        console.error(err); 
    }
}; 




