const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HandleSchema = new Schema( {

    userId : {
        type : Schema.Types.ObjectId ,
        ref : 'user',
    },
    codeforcesHandle : {
        type : String,
        required : false
    }
});

  
const HandleModel = mongoose.model('handle',HandleSchema);
  
module.exports = HandleModel;