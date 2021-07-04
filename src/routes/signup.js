'use strict';
const Users = require('../auth/users');
const express = require('express');
const router = express.Router();
router.post('/signup', async(req, res) => {
    try {
        console.log(req.body)
        const user = new Users(req.body);
        console.log('user',user);
        const record = await user.save();
        console.log('record',record)
        res.status(201).json(user);
    } catch (e) { res.status(403).send(e); }
});


module.exports = router;