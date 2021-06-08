const express = require('express'); 
const mongoose = require('mongoose');
const app = express(); 
require('dotenv').config(); 
const cors = require('cors'); 
const helmet = require('helmet'); 
app.use(express.json());
const jobRouter = require('./routes/business/jobs/jobsRouter');
const entryRouter = require('./routes/auth/entry');
const applicationsRouter = require('./routes/business/applications/applicationsRouter');
const userActionsRouter = require("./routes/business/userActions/userActionsRouter");

app.use(helmet());
app.use(cors());

app.get('/' , (req,res)=>{
    res.send("hello")
});

app.use('/entry', entryRouter); 

app.use('/jobs', jobRouter);

app.use('/app', applicationsRouter);

app.use("/user", userActionsRouter);





(
    function(){
        mongoose.connect(`mongodb+srv://sam:QjeSbWuNClG1nyMq@cluster0.impxz.mongodb.net/app?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true
}, (err)=> {
    err ? console.log(err) : console.log("connection to db success!")
});
}
)();

app.listen(process.env.PORT || 5000, () => {
    console.log(`running on port [${5000}]`); 
});

