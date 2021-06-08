
const signupMassage = (info) => {
    return {
        ...info, 
        ownJobs: [],
        appliedJobs: []
    };
};

module.exports = signupMassage;
