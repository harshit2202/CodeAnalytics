const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const tokenController =  require('../controllers/tokenController')
const cfScraper = require('../Scrapers/cfScraper')

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
        await UserModel.updateOne( { _id : req.user._id } , { isLoggedIn : false });
        return res.json({message : "success"});
    }
    catch(error) {
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }

}

exports.fetchSubmissions = async function(req,res) {

    handles = {}
    try {
        handles = await HandleModel.findOne({ userId : req.user});
    }
    catch(error) {
        console.log("In here");
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }
    try {
        let list = []
        if(handles.codeforcesHandle)
            list = await cfScraper('https://codeforces.com/submissions/' + handles.codechefHandle);
        return res.json(list);
    }catch(error) {
        console.log(error);
        console.log("2nd error");
        res.statusCode = 500;
        return res.json( { error : "Some Error Occured"});
    }
}

exports.validate = async function (req,res,next) {

    const user = await UserModel.findOne({_id : req.user});

    if(user.isLoggedIn == false) {
        res.statusCode = 401;
        return res.json({error : "Unauthorized"});
    }
    req.user = user;
    next();
}