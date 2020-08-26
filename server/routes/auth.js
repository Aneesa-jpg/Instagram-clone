const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model("User");

require('../models/post');
const Post = mongoose.model("Post");

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const requireLogin = require('../middleware/requireLogin')

router.get('/post', requireLogin, (req,res) => {
    res.json({
        message: "Hello user! welcome after doing all the token shit"
    })
})

router.get('/', (req,res) => {
    res.send("Hello love");
})

router.post('/signup', (req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({
            error : "Kindly fill all the fields"
        });
    }
    
    User.findOne({email:email})
    .then(savedUser => {
        if(savedUser){
            return res.status(422).json({
                error : "User already exists!"
            });
        }
        bcrypt.hash(password, 8)
        .then(encryptedPassword => {
            const user = new User({
                name,
                email,
                password : encryptedPassword
            });
        
            user.save()
            .then( user => {
                res.json({
                        message : "User added successfully"
                });
            })
            .catch(error => {
                console.log(error);
            })
            });     
    })
    .catch( error => {
        console.log(error);
    })
    
})

router.post('/signin', (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            error : "Kindly fill the required fields"
        })
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({
                error : "Invalid emailId and password"
            });
        }
        bcrypt.compare(password,savedUser.password)
        .then(result => {
            if(result){
                // res.json({
                //     message : "SignIn is successfull"
                // });
                var token = jwt.sign({_id : savedUser._id}, process.env.JWT_SECRET_KEY);
                const {_id ,name ,email} = savedUser;
                res.json({
                    token : token,
                    user : {
                        _id,
                        name,
                        email
                    }
                })

            }
            else{
                return res.status(422).json({
                    error : "Invalid emailId and password"
                }); 
            }
        })
        .catch(error => {
            console.log(error);
        })
    }) 
    .catch(error => {
        console.log(error);
    })
})


module.exports = router;