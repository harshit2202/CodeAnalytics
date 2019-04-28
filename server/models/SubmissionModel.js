const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const verdicts = require('../values/verdicts')

const SubmissionSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId ,
        ref : 'users'
    },

    problem : {
        type : Schema.Types.ObjectId ,
        ref : 'problems'
    },

    link : {
        type : String,
        required : true,
        unique : true
    },

    verdict : {
        type : String,
        enum : verdicts
    },

    time : {
        type : String
    },

    language : {
        type : String
    }
});

SubmissionSchema.pre('validate' , async function(next) {


    console.log("Inside pre hook");
    console.log(this.verdict);
    console.log(this.time);


    let verdict = this.verdict.toLowerCase();
    if(verdict.includes('wrong answer'))
        this.verdict = 'Wrong Answer';
    if(verdict.includes('time limit exceeded'))
        this.verdict = 'Time Limit Exceeded';
    if(verdict.includes('accepted'))
        this.verdict = 'Accepted';
    if(verdict.includes('runtime error'))
        this.verdict = 'Run Time Error';
    if(verdict.includes('compilation error'))
        this.verdict = 'Compilation Error';
    if(verdict.includes('memory limit exceeded'))
        this.verdict = 'Memory Limit Exceeded';
    if(verdict.includes('hacked'))
        this.verdict = 'Hacked';


    // let date = String(this.time);
    // if(this.link.includes('codeforces')){
    //     let s1 = date.slice(0,17) + ' ' + date.slice(18,24);
    //     this.date = new Date(s1);
    // }
    // else{
    //     let s = date.split(' ');
    //     if(s[1].includes('PM')){
    //         let hour = (s[0][0]-'0')*10 + (s[0][1]-'0');
    //         hour+=12;
    //         s[0][1]=hour%10+'0';
    //         hour/=10;
    //         s[0][0]=hour%10+'0';
    //     }

    //     let temp = s[2][0];
    //     s[2][0] = s[2][3];
    //     s[2][3] = temp;

    //     temp = s[2][1];
    //     s[2][1] = s[2][4];
    //     s[2][4] = temp;

    //     let s1 = s[2] + ' ' + s[0] + ' ' + 'UTC+5.5'; 
    //     this.time = new Date(s1);
    // }

    next();
})

const SubmissionModel = mongoose.model('submissions' , SubmissionSchema);
SubmissionModel.init().then( function(E) {
    console.log("Built Indexes on Submission Model");
});

module.exports = SubmissionModel;
