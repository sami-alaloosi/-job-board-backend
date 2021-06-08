const 
express = require('express'),
router = express.Router(),
login = require('./authUtils/login.js'),
register = require('./authUtils/register.js');


router.post('/register', async (req,res)=>{
   register(req, res); 
});

router.post('/login', async (req,res)=>{
   login(req, res); 
});

module.exports = router;