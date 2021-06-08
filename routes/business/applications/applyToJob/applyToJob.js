const {Job, User} = require('../../../../database/db'); 

module.exports = async (req,res) => {
    try{       
        const job = await Job.findOne().where('_id').equals(req.params.id);
        const user = await User.findOne().where("_id").equals(req.body.applicantId);
        
        if (user !== null && job !== null){
            const userApplication = {
                fullname : user.firstName + ' ' + user.lastName, 
                applicantEmail : user.email,
                skills: user.resume.skills, 
                education: user.resume.education,
                certifications: user.resume.certifications,
                experience: user.resume.experience
            };
    
            const applicantEmails = job.applicants.map(app => app.applicantEmail); 
            
            // check to see if applicant has applied already
            if (!applicantEmails.includes(userApplication.applicantEmail) ){
            job.applicants.push(userApplication); 
            user.appliedJobs.push({title: job.jobTitle, id: job._id}); 
            await Promise.all([job.save(), user.save()]);
            res.status(200).json({message: `application submit success`});
            } 
            else {
                res.status(400).json({"message": "already applied"})
            }   
            
            // handling improper applicantEmail or Job Id 
        } else if (user === null && job !== null){
            res.status(404).json({message: "user not found!"});
        } else if (job === null && user !== null){
            res.status(404).json({message: "job not found!"})
        } else {
            res.status(404).json({message: "user and/or job not found!"});
        }

    } 
    catch(err){
        res.status(500).json({message : err.message}); 
    }
}; 


