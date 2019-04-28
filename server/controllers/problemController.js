const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')

exports.getProblem = async function(req , res) {

    console.log('req.query.plink: ', req.query.plink);
    ProblemModel.findOne({link : req.query.plink})
    .populate('submissions')
    .exec((error , problem) => {
        if(error)
            res.status(500).json({ error : "Some Error Occured"});
        
        ProblemModel.populate(problem , { path : 'submissions.user' , model : 'users' , select : 'username'} ,
            (error , problem) => {

                if(error)
                    res.status(500).json({ error : "Some Error Occured"});
                
                res.status(200).json( { problem });
            })
    });
}