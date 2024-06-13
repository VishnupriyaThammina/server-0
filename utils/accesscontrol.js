const express = require('express')
const User = require('../models/User.js');


// end points only admin can access

const isAdmin = async(req,res,next)=>{
    const user = await User.findOne({username:req.username_d})
    if(!user || user.role!== 'admin'){
        return res.status(403).json({message:"you dont have access"})
    }
    next();
}

// end points user or admin can access 

const userORAdminAccess = async(req,res,next)=>{
    const user = await User.findOne({username:req.username_d})
    if(!user || (user.role!== 'admin' && user.role!=='user')){
        return res.status(403).json({message:"you dont have access"})
    }
    next();
}

module.exports={isAdmin,userAdminAccess}