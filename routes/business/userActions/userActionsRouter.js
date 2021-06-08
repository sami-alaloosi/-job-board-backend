const 
express = require('express'),
router = express.Router(),
deleteAccount = require("./deleteAccount"),
getAccount = require("./getAccount"),
updateAccount = require("./updateAccount"),
updateResume = require("./updateResume"),
changePassword = require("./changePassword");



router.patch('/resume', async (req, res) => {
    updateResume(req, res);
}); 

router.get('/:id', async (req, res)=>{
    getAccount(req, res); 
});

router.patch('/', async (req, res) => {
    updateAccount(req,res); 
}); 


router.delete('/', async (req,res) =>{
    deleteAccount(req,res);
}); 

router.patch('/password', async (req, res) =>{
    changePassword(req, res); 
});

module.exports = router; 