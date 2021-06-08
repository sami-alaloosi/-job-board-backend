const mongoose = require('mongoose');

const UserApplicationSchema = new mongoose.Schema({
    skills: {type: Array}, 
    education: {type: Array},
    experience: {type: Array}, 
    certifications: {type : Array},
    summary: {type: String, default: ""}
});



const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
    appliedJobs: {type: Array, default: []},
    resume: {type: UserApplicationSchema, default: {}, required: false}
});

const JobSchema = new mongoose.Schema({
    jobTitle: {type: String, required : true},
    salaryRange: {type: String},
    jobDescription: {type: String, required: true},
    requiredSkills: {type: Array, default: []},
    preferredSkills: {type: Array, default: []},
    createdAt: {type: String, required: true},
    createdBy: {type: String, required: true}, 
    applicants: {type:Array , default: []},
    companyName: {type: String, default: "anonymous"},
    jobResponsibility: {type: Array, default: []}
}); 

const Job = mongoose.model('job', JobSchema);
const User = mongoose.model('user', UserSchema);

module.exports = {
    Job, 
    User
};