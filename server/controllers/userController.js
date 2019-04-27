const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const tokenController =  require('../controllers/tokenController')
const cfScraper = require('../Scrapers/cfScraper')
const ccscraper = require('../Scrapers/codeChefscraper')
const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')
const NewProblemScraper = require('../Scrapers/newProblemScraper')

exports.dashboard = async function(req , res) {

    const user = await UserModel.findOne( { _id : req.user } , ['-email','-password','-isLoggedIn','-__v']);
    var ret = { data : { user }};

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
    let list1 = [];
    let problems = [];
    try {

        handles = await HandleModel.findOne({ userId : req.user});
        if(handles.codeforcesHandle)
            list = await cfScraper(handles.codeforcesHandle , handles.lastCf);

        // if(handles.codechefHandle)
        //     list1 = await ccscraper(handles.codechefHandle);
        if(list.length > 0)
            handles.lastCf = list[0].problem;

        await handles.save();
        
        for(let i=0;i<10;i++) {
            problem = await ProblemModel.findOne({link : list[i].problem});

            if(problem == null) {

                problem = await NewProblemScraper(list[i].problem);
                problem.link = list[i].problem;
                problem = await ProblemModel.create(problem);
            }
            
            list[i].problem = problem._id;
            list[i].user = req.user;
            submission = await SubmissionModel.create(list[i]);
            problem.submissions.push(submission._id);
            await problem.save();
            await UserModel.update({ _id : req.user},{ $push: { submissions : submission._id } });
            console.log(i);
            
        }

        return res.json({ message : "success"});
    }catch(error) {
        console.log('error: ', error);
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
                    res.status(200).json({ submissions : user.submissions});
                })
        });
}

exports.displayUser = async function(req,res) {

    const user = await UserModel.findOne( { username : req.params.username} , ['-_id','-email','-password','-isLoggedIn','-__v']);
    return res.json( { user });
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