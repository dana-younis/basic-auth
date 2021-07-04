'use strict';

const Users = require('./users');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next('Wrong Authorization headers');
        return;
    }
    let basicHeader = req.headers.authorization.split(' ').pop();
    let decoded = base64.decode(basicHeader);
    let [username, password] = decoded.split(':');
    const user = await Users.findOne({username: username});
    const valid = await bcrypt.compare(password, user.password);
    console.log(decoded)
    console.log(user)
    console.log(valid)

    if(valid){
        req.user=user;
        next()
    }else{
        next('Wrong password')
    }
}
