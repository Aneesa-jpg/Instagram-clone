const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model("User");


module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            error: "You must be logged in"
        });
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,process.env.JWT_SECRET_KEY, (error, payload) => {
        if(error){
            return res.json({
                error: error
            });
        }
        const {_id} = payload;
        User.findById(_id)
        .then(signedInUser => {
            req.user = signedInUser;
            next();
        });  
    });
    
}