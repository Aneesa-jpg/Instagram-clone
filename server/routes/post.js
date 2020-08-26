const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const USER = require('../models/user');
require('../models/post');
const Post = mongoose.model("Post");

const requireLogin = require('../middleware/requireLogin')

router.get('/posts', requireLogin, (req,res) => {
    Post.find()
    .populate("comments.postedBy","_id name")
    .populate('postedBy','_id name')
    .then(savedPosts => {
        res.json({
            posts: savedPosts
        });
    })
})

router.post('/createPost', requireLogin, (req,res) => {
    const{ title, body, photo } = req.body;
    if(!title || !body){
        return res.status(422).json({
            error : "!No Title or Body!"
        });
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user
    });
    post.save()
    .then(savedPost => {
        console.log(req.user);
        res.json({
            message : "Post has been added successfully",
            post: savedPost
        });
    })
    .catch(error => {
        console.log(error);
    });
})

router.get('/myPost', requireLogin, (req,res) => {
    Post.find({postedBy: req.user._id})
    .populate('postedBy','_id name')
    .then(myPosts => {
        res.json({
            posts: myPosts
        });
    })
})

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}},
        {
            new : true
        })
        .populate("comments.postedBy","_id name")
        .exec((error,result) => {
        if(error){
            return res.status(422).json({
                error : error
            })
        }
        else{
            res.json(result)
        }
    })
    
})

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}},
        {
            new : true
        })
        .populate("comments.postedBy","_id name")
        .exec((error,result) => {
        if(error){
            return res.status(422).json({
                error : error
            })
        }
        else{
            res.json(result)
        }
    })
    
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate({_id : req.body.postId},{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            console.log(result);
            res.json(result)
        }
    })
})

router.delete('/deletePost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id : req.params.postId})
    .populate("postedBy", "_id")
    .exec((error, result) => {
        if(error || !result){
            res.status(422).json({
                error : error
            })
        }
        if(result.postedBy._id.toString() === req.user._id.toString()){
            result.remove()
            .then(deletedPost => {
                res.json(deletedPost)
            })
            .catch(error => {
                console.log(error);
            })
        } 
    })
})
router.delete('/deletePostComment/', requireLogin, (req, res) => {
    console.log(req.body.postId, req.body.commentId);
    Post.findByIdAndUpdate( req.body.postId,{$pull: {comments : {_id: req.body.commentId}} } ,{new : true})
    .populate("comments.postedBy","_id name")
    .populate('postedBy','_id name')
    .exec((error,result) => {
        if(error){
            return res.status(422).json({
                error : error
            })
        }
        else{
            console.log(result);
            res.json(result)
        }
    })
    
})

module.exports = router;