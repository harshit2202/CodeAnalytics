const UserModel = require('../models/UserModel');
const tokenController =  require('../controllers/tokenController')

exports.dashboard = async function(req , res) {

    var user = await UserModel.findOne({_id : req.user});
    
    var ret = { data : { user }};
    ret.data.user.password = '';

    ret.token = tokenController.getToken(req.user);

    return res.json(ret);

}