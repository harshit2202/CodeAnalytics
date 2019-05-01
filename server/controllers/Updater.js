const cfScraper = require('../Scrapers/cfScraper')
const ccscraper = require('../Scrapers/codeChefscraper')
const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')
const NewProblemScraper = require('../Scrapers/newProblemScraper')
const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const utility = require('../controllers/userUtility');
require('../controllers/DBSetup');

async function fetch(req) {

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
    }catch(error) {
        console.log('error: ', error);
    }

}

async function looper() {

    console.log('print');
    req = {};
    let users = await UserModel.find();
    for(let i=0;i<users.length;i++) {
        req.user = users[i]._id;
        await fetch(req);
    }
}

looper();