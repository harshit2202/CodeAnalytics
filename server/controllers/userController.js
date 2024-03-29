const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const tokenController =  require('../controllers/tokenController')
const cfScraper = require('../Scrapers/cfScraper')
const ccscraper = require('../Scrapers/codeChefscraper')
const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')
const NewProblemScraper = require('../Scrapers/newProblemScraper')
const utility = require('../controllers/userUtility')
const cfrating = require('../Scrapers/codeforcesRatings')

exports.dashboard = async function(req , res) {

    rating_graph = null;
    await UserModel.findOne( {_id : req.user } , ['-password','-isLoggedIn','-__v'])
        .populate('submissions' , '-user')
        .exec((err,user) => {
            if(err)
                res.status(500).json( { error : "Some Error Occured"});
                
            UserModel.populate(user , { path : 'submissions.problem' , model : 'problems' , select : ['name','link','tags'] } ,
                async (err , user) => {
                    if(err)
                        res.status(500).json( { error : "Some Error Occured"});
                    
                    heat_graph = await utility.generate_heat_graph(user.submissions);
                    verdict_pie = await utility.generate_verdict_pie(user.submissions);
                    solved = await utility.generate_solved(user.submissions);
                    unsolved = await utility.generate_unsolved(user.submissions,solved);
                    tags_pie = await utility.generate_tags_pie(solved);

                    if(rating_graph) {

                    }
                    else {
                        const handles = await HandleModel.findOne({ userId : req.user});
                        if(handles.codeforcesHandle)
                            rating_graph = await cfrating(handles.codeforcesHandle);
                    }
                    var data = { user }

                    data.solved = solved;
                    data.unsolved = unsolved;
                    data.tags_pie = tags_pie;
                    data.verdict_pie = verdict_pie;
                    data.heat_graph = heat_graph;
                    data.rating_graph = rating_graph;

                    console.log(user.submissions.length);

                    user.submissions.sort((a,b) => {
                        ad = new Date(a.time);
                        bd = new Date(b.time);
                        return bd-ad;
                    });

                    data.token = tokenController.getToken(user._id);
                    res.status(200).json( { data });
                });
        });
}

exports.getHandles = async function (req,res) {

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


        if(list.length > 0)
            handles.lastCf = list[0].link;


        if(handles.codechefHandle)
             list1 = await ccscraper(handles.codechefHandle , handles.lastCc);


        if(list1.length > 0)
            handles.lastCc = list1[0].link;


        for(let i=0;i<list1.length;i++)
            list.push(list1[i]);


        console.log('list: ', list);
        
        

        await handles.save();


        
        for(let i=0; i<list.length; i++) {
            problem = await ProblemModel.findOne({link : list[i].problem});

            if(problem == null) {

                problem = await NewProblemScraper(list[i].problem);
                problem.link = list[i].problem;
                problem = await ProblemModel.create(problem);
            }
            
            list[i].problem = problem._id;
            list[i].user = req.user;
            list[i].time = await utility.get_date(list[i].time , list[i].link);
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

exports.displayUser = async function(req,res) {

    UserModel.findOne( { username : req.params.username} , ['-_id','-email','-password','-isLoggedIn','-__v'])
    .populate('submissions' , '-user')
    .exec((err,user) => {
        if(err)
            res.status(500).json( { error : "Some Error Occured"});

        UserModel.populate(user , { path : 'submissions.problem' , model : 'problems' , select : ['name','link','tags'] } ,
            (err , user) => {
                if(err)
                    res.status(500).json( { error : "Some Error Occured"});
                
                res.status(200).json( { user });
            });
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


utility.get_date("08:29 PM 19/04/19" , "codechef");
