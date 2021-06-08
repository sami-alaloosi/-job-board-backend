const {User} = require('../../../../database/db'); 

 module.exports = async (req,res) => {
    try{
        const {id} = req.body; 

        if (!id) {
            res.send(400).json({message : "please provided the user Id"});
            return; 
        };

        const {skills, certifications, education, experience} = req.body; 
        const user = await User.findOne().where("_id").equals(id); 

        if (skills) user.resume.skills = skills; 
        if (certifications) user.resume.certifications = certifications; 
        if (education) user.resume.education = education; 
        if (experience) user.resume.experience = experience; 

        await user.save()

        res.status(200).json(user); 

    } 
    catch(err){
        res.status(404).json({error : err.message}); 
    }
}; 