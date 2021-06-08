const {Job, User} = require('../../../../database/db'); 


module.exports = async function(req, res) {
    try{
       const {id} = req.params; 
       const {userId} = req.body;
       const dbJob = await Job.findById(id); 
       const dbUser = await User.findById(userId);
       
       if (!dbUser || !dbUser){
       return res.status(404).json({message : "user or job were not found please enter proper Id!"});

       } else {
        const userEmail = dbUser.email; 
        const jobApplicants = dbJob.applicants; 
        const userAppliedJobs = dbUser.appliedJobs;
        const filteredUserAppliedJobs = findJobInUser(userAppliedJobs, id);
        const filteredJobApplicants = findUserInJob(jobApplicants, userEmail);

        if (filteredJobApplicants === false && filteredUserAppliedJobs === false){
           return res.status(400).json({message: "bad request, this user has not applied to this job!"});
        } else if (filteredJobApplicants === false){
            return  res.status(404).json({message: "user was not found in job applicants collection!"});
        } else if (filteredUserAppliedJobs === false){
            return res.status(404).json({message: "this job was not found in this user's jobs collection!"});
        }

        dbUser.appliedJobs = filteredUserAppliedJobs;
        dbJob.applicants = filteredJobApplicants; 
 
       } 

    
       await Promise.all([dbJob.save(), dbUser.save()]);
   
       res.status(201).json({message : "application withdrawn!"}) 
    
    } 
    catch (err){
        console.log(err)
        res.status(500).json({message : err.message}); 
    }
}; 


function findUserInJob(jobApplicants, userEmail){
    const starterLength = jobApplicants.length; 
    const newJobApplicants = []; 

    for (const jobApp of jobApplicants){
        const {applicantEmail} = jobApp; 
        if (userEmail !== applicantEmail) newJobApplicants.push(jobApp); 
    };

    return starterLength === newJobApplicants.length ? false : newJobApplicants; 
}; 

function findJobInUser(userAppliedJobs, jobId){
    const starterLength = userAppliedJobs.length; 
    const newUserAppliedJobs = []; 

    for (const jobApp of userAppliedJobs){
        const {id} = jobApp;
         
        if (id.toString() !== jobId) newUserAppliedJobs.push(jobApp); 
    };

    return starterLength === newUserAppliedJobs.length ? false : newUserAppliedJobs; 
}; 
