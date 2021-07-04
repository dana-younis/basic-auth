'use strict';
const express=require('express');
const router = express.Router();
const basicAuth=require('../auth/auth-basic');
router.post('/signin',basicAuth,(req,res)=>{
    res.status(200).json({user: req.user})
})
module.exports=router;