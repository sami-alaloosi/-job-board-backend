const 
express = require('express'),
router = express.Router(),
addJob = require('./addJobs/addJob'),
getJobs = require('./getJobs/getJobs'),
deleteJob = require('./deleteJob/deleteJob'),
getJob = require('./getJob/getJob'),
getJobsCreatedby = require("./getJobsByCreateBy/getJobsCreatedBy")


router.post('/', async (req, res) =>{
    addJob(req,res);
}); 


router.get('/', async (req, res) => {
    getJobs(req,res);
}); 

router.get('/:id', async (req, res)=>{
    getJob(req, res); 
});

router.get("/recruiter/:createdBy", async (req, res) => {
    getJobsCreatedby(req,res);
}); 

router.delete('/:id', async (req,res) =>{
    deleteJob(req,res)
}); 


module.exports = router; 