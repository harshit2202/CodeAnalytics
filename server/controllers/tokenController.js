const jwt = require('jsonwebtoken')

exports.getToken = function(_id) {

    let token = jwt.sign( { userId : _id} ,process.env.EXPRESS_SECRET , { expiresIn: '1h' });
    token = 'Bearer ' + token;
    return token;
}