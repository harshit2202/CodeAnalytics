const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HandleSchema = new Schema( {

    userId : {
        type : Schema.Types.ObjectId ,
        ref : 'user',
    },
    codeforcesHandle : {
        type : String,
        required : false,
    },
    codechefHandle : {
        type : String,
        required : false,
    },

    hackerearthHandle : {
        type : String,
        required : false,
    },

    lastCf : {
        type : String
    },
  
    lastCc : {
        type : String
    }
});

  
const HandleModel = mongoose.model('handle',HandleSchema);
  
module.exports = HandleModel;