const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Secret_key = "AuthenticateUser";

//create
router.post('/create',async (req, res) => {
    try{
        const { title, body, geolocation} = req.body;
        const createdBy = req.User._id;
        const post = new Post({ title, body, geolocation, createdBy});
        await post.save();
        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.status(404).json({error: 'Internal Server Error'});
    }
});

router.get('/read' ,async (req, res) => {
    try{
        const posts = await Post.find({ createdBy: req.User._id });
        res.json(posts);
    }catch(error){
        console.log(error);
        res.status(404).json({ error: 'Internal server Error' });

    }
});
//update
router.put(':id', async (req, res) =>{
    try{
        const { title, body, geolocation } = req.body;
        const post = await Post.findOneAndUpdate(
            {_id: req.params.id, createdBy: req.user._id},
            { title, body, geolocation},
            { new: true}
        );
        if(!post){
            return res.status(404).json({error: 'Post not found'});
        }
        res.json(post);
    }catch(error){
        console.error(error);
        res.status(404).json({ error: 'internal error'});
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try{
        const post =await Post.finoneAndRemove({
            _id: req.params.id,
            createBy: req.User._id,
        });
        if (!post){
            return res.status(404).json({ error: "post not found" });
        }
        res.json({message: 'post deleted sucessfully'});
    }catch(error){
        console.error(error);
        res.status(404).json({ error: 'Internal server error'});
    }
});

module.exports = router;
