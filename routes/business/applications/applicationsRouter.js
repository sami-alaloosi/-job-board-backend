const 
express = require('express'),
router = express.Router(),
addResume = require('./addResume/addResume'),
applyToJob = require('./applyToJob/applyToJob'),
withdraw = require('./withDrawApplication/withdraw');

router.patch('/resume', (req, res) =>{
    addResume(req, res); 
}); 


router.patch('/:id', (req, res) => {
    applyToJob(req, res); 
}); 

router.put('/:id', (req, res) =>{
    withdraw(req , res);
}); 

module.exports = router; 