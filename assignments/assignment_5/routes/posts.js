const express = require('express');
const bodyParser = require('body-parser')
const Post = require('../model/post');
const router = express.Router()

router.use(bodyParser());
// ============================ FETCH POSTS =====================================
router.get("/posts", async (req, res) => {
    const posts = await Post.find({user:req.user});
    res.status(200).json({
        status: "success",
        posts
    })
})

// ============================ CREATE POSTS =====================================
router.post("/posts", async (req, res) => {
    try {
        const post = await Post.create({
            name: req.body.name,
            body: req.body.body,
            image: req.body.image,
            user: req.user
        })
        return res.status(200).json({
            status: "Post created",
            data: post
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// ============================ EDIT POSTS =====================================
router.put("/posts/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (post.user != req.user) {
            return res.status(401).json({
                status: "failed",
                message: "you are not authorized to edit this post"
            })
        } else {
            const updatedPost = await Post.updateOne({ _id: req.params.postId }, req.body)
            return res.status(200).json({
                status: "Success",
            })
        }

    } catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

// ============================ DELETE POSTS =====================================
router.delete("/posts/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        console.log(post.user);
        console.log(req.user);
        console.log(post.user!=req.user);
        if (post.user != req.user) {
            console.log("unauthorised");
            return res.status(401).json({
                status: "failed",
                message: "you are not authorized to edit this post"
            })
        } else {
            console.log("deleting post");
            const deletedPost = await Post.deleteOne({ _id: req.params.postId })
            return res.status(200).json({
                status: "Successfully deleted",
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router