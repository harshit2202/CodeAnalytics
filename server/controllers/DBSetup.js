const mongoose = require('mongoose');

//DB Setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/CodeAnalytics');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('../models/UserModel');
require('../models/HandleModel');
require('../models/ProblemModel');
require('../models/SubmissionModel');
