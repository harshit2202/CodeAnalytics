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
        type : String , 
        enum : verdicts
    },

    time : {
        type : Date,
        default : Date.now
    }
});

const SubmissionModel = mongoose.model('submissions' , SubmissionSchema);
SubmissionModel.init().then( function(E) {
    console.log("Built Indexes on Submission Model");
});

module.exports = SubmissionModel;
