const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tags = require('../values/tags');

var TagSchema = new Schema( {

    name : {
        type : String,
        enum : tags
    },

    problems : [{
        type : Schema.Types.ObjectId ,
        ref : 'problems'
    }],

});

const TagModel = mongoose.model('tags' , TagSchema);

TagModel.init().then(function (E) {
    console.log("Built Indexes on Tag Model");
});

module.exports = TagModel;