const UserModel = require('../models/UserModel');
const HandleModel = require('../models/HandleModel');
const tokenController =  require('../controllers/tokenController')
const cfScraper = require('../Scrapers/cfScraper')
const ccscraper = require('../Scrapers/codeChefscraper')
const ProblemModel = require('../models/ProblemModel')
const SubmissionModel = require('../models/SubmissionModel')
const NewProblemScraper = require('../Scrapers/newProblemScraper')

exports.generate_heat_graph = async function(submissions){

    var dict = {};

    for(let i=0; i<submissions.length; i++){
        var date = submissions[i].date;
        var ans;

        if(submissions[i].problem.link.includes("codeforces")){
            //Jan/22/2019
            var list = date.split(" ");
            var arr = list[0].split("/");

            var month;
            if(list[0]=='Jan')  month = "01";
            if(list[0]=='Feb')  month = "02";
            if(list[0]=='Mar')  month = "03";
            if(list[0]=='Apr')  month = "04";
            if(list[0]=='May')  month = "05";
            if(list[0]=='Jun')  month = "06";
            if(list[0]=='Jul')  month = "07";
            if(list[0]=='Aug')  month = "08";
            if(list[0]=='Sep')  month = "09";
            if(list[0]=='Oct')  month = "10";
            if(list[0]=='Nov')  month = "11";
            if(list[0]=='Dec')  month = "12";
            ans = arr[2] + "-" + arr[1] +  "-" + month;
        }

        else{
            //02:22 PM 20/04/19
            var list = date.split(" ");
            var arr = list[2].split("/");

            ans = "20" + arr[2] + "-" + arr[0] + "-" + arr[1];

        }
        ans = ans + "T00:00:00.000Z";

        if( ans in dict)
            dict[ans] = dict[ans] + 1;
        else
            dict[ans] = 1;
    }

}

exports.generate_verdict_pie = async function(submissions){

    var dict = {};

    for(let i=0; i<submissions.length; i++){
        var verdict = submissions[i].verdict;

        if ( verdict  in dict)
            dict[verdict] = dict[verdict] + 1;
        else
            dict[verdict] = 1;
    }

    return dict;
}

exports.generate_unsolved = async function(submissions,solved){

    var dict = [];

    for(let i=0;i<submissions.length;i++){
        let flag = 0;
        for(let j=0;j<solved.length; j++){
            if(solved[j].link == submissions[i].problem.link){
                flag=1;
                break;
            }
        }
        
        if(flag == 1)
            continue;
        
        for(let j=0;j<dict.length;j++)
            if(dict[j] == submissions[i].problem)
            {
                flag = 1;
                break;
            }
        
        if(flag==0)
            dict.push(submissions[i].problem);
    }

    return dict;
}

exports.generate_tags_pie = async function(problems){

    var dict = {};

    for(let i=0; i<problems.length; i++){

        for(let j=0; j<problems[i].tags.length; j++){

            var tag = problems[i].tags[j];

            if( tag in dict)
                dict[tag] = dict[tag] + 1;
            else
                dict[tag]=1;
            
        }
    }

    return dict;
}

exports.generate_solved = async function(submissions){

    var dict = [];

    for(let i=0;i<submissions.length;i++){
        if(submissions[i].verdict == 'Accepted'){

            if(submissions[i].problem in dict)
                continue;
            else
                dict.push(submissions[i].problem);
        }

    }

    return dict;

}