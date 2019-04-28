const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const tokenController =  require('../controllers/tokenController')
const cfScraper = require('../Scrapers/cfScraper')
const ccscraper = require('../Scrapers/codeChefscraper')
const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')

exports.dashboard = async function(req , res) {

    const user = req.user;
    
    var ret = { data : { user }};
    ret.data.user.password = '';

    //Send new token in headers of the response
    ret.token = tokenController.getToken(user._id);

    return res.json(ret);

}

async function getHandles (req,res) {

    try {
        const handles = await HandleModel.findOne({ userId : req.user});
        return res.json( {
            data : {
                handles : {
                    codeforcesHandle : handles.codeforcesHandle,
                    codechefHandle : handles.codechefHandle,
                    hackerearthHandle : handles.hackerearthHandle
                }
            }
        });
    }
    catch(error) {
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }
    
}

exports.getHandles = getHandles;

exports.addHandles = async function(req,res) {

    updateHandles = {
        
        codeforcesHandle : req.body.codeforcesHandle ,
        codechefHandle : req.body.codechefHandle ,
        hackerearthHandle : req.body.hackerearthHandle
    }

    try {
        await HandleModel.updateOne( { userId : req.user } , updateHandles);
        return res.json({ message : "success"});
    }
    catch(error) {
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }
}

exports.logout = async function(req,res) {
    try {
        await UserModel.updateOne( { _id : req.user } , { isLoggedIn : false });
        return res.json({message : "success"});
    }
    catch(error) {
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }

}

exports.fetchSubmissions = async function(req,res) {

    console.log("in fetch submissions")
    handles = {}
    let list = [];
    let list1 = []
    try {

        handles = await HandleModel.findOne({ userId : req.user});

        if(handles.codeforcesHandle)
            list = await cfScraper(handles.codeforcesHandle);

        // if(hand3les.codechefHandle)
        //     list1 = await ccscraper(handles.codechefHandle);
        
        for(i=0;i<list.length;i++) {

            let problem = await ProblemModel.findOne({link : list[i].problem});
            list[i].problem = problem._id;
            list[i].user = req.user;
            console.log(req.user);
            console.log(list[i]);
            try { 
                let submission = await SubmissionModel.create(list[i]);
                problem.submissions.push(submission._id);
                problem.save();
                await UserModel.update({ _id : req.user._id},{ $push: { submissions : submission._id } });
            }catch(error) {
                if(error.code == 11000) {
                    i = -1;
                    list = list1;
                }
                else
                    res.status(500).json( { error : "Some Error Occured"});
            }
        }
        
        return res.json({ message : "success"});
    }catch(error) {
        console.log(error.code);
        if(error.code == 11000)
            return res.json({ message : "success"});
        console.log(error);
        console.log("2nd error");
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }

}

exports.getSubmissions = async function(req,res) {

        console.log(req.params.userId);
        UserModel.findOne( {username : req.params.userId })
        .populate('submissions' , '-user')
        .exec((err,user) => {
            if(err)
                res.status(500).json( { error : "Some Error Occured"});

            UserModel.populate(user , { path : 'submissions.problem' , model : 'problems' , select : ['name','link'] } ,
                (err , user) => {
                    if(err)
                        res.status(500).json( { error : "Some Error Occured"});
                    //console.log(user.submissions);
                    res.status(200).json({ submissions : user.submissions});
                })
        });
}
exports.validate = async function (req,res,next) {

    const user = await UserModel.findOne({_id : req.user});
    console.log("Validate");
    if(user.isLoggedIn == false) {
        res.statusCode = 401;
        return res.json({error : "Unauthorized"});
    }
    next();
}