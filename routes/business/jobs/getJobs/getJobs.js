const {Job} = require('../../../../database/db');

module.exports = async (req, res) => {
    try{
        if (req.query.page){
            const numberOfDocs = await Job.countDocuments();
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 5;
            const skip = (page - 1) * limit;
            const totalPages = numberOfDocs / limit;
            const jobs = await Job.find().skip(skip).limit(limit);
      
            res.status(200).json({jobs : jobs, pages:[page, totalPages]}); 
        }
        else {
            // gets all the jobs
            const jobs = await Job.find(); 
            res.status(200).json({jobs: jobs, pages: [1, 1]}); 
        }
    } catch(err){
        res.status(404).json({message : err.message}); 
        console.error(err); 
    }
}; 



