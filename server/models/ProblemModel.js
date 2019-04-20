const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({

    link : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true,
    },

    submissions : [ {
        type : Schema.Types.ObjectId ,
        ref : 'submissions'
    }],

    tags : [ {
        type : String
    }]
});

const ProblemModel = mongoose.model('problems' , ProblemSchema);

ProblemModel.init().then(function (E) {
    console.log("Built Indexes on Problem Model");
});

module.exports = ProblemModel;
