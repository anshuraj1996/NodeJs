const express = require('express');
const User = require('../model/users');
const router = express.Router()

router.get("/",async(req,res)=>{
    try{
    const users = await User.find();
    return res.json({
        status:"Success",
        users
    })
    } catch(e) {
        return res.status(404).json({
            status:"failed",
            message: e.message
        })
    }
})

module.exports = router