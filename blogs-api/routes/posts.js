const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const { PostsModel, validPost } = require('../models/posts_model');
const { authUser, authAuthor } = require('../auth/auth_middleware');

// The query to get post author info.
const aggQuery = { $lookup: { from: 'users', localField: 'author_id', foreignField: '_id', as: 'auther_info' } };

// Post fields to send back to the client.
const postFields = { _id: 1, author_id: 1, title: 1, body: 1, create_date: 1 };

router.get('/posts', (req, res) => {
    // Author fields to send back to the client.
    const auther_info = { first_name: 1, last_name: 1 };
    PostsModel
        .aggregate([ aggQuery, { $project: { ...postFields, auther_info } } ])
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});

router.get('/post/:id', (req, res) => {
    // Author fields to send back to the client.
    const auther_info =  {_id: 1, first_name: 1, last_name: 1, age: 1, birth_date: 1 };
    PostsModel
        .aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
            aggQuery,
            { $project: { ...postFields, auther_info } }
        ])
        .then(result => res.json(result[0]))
        .catch(err => res.status(400).json(err));
});

router.post('/post', authUser, (req, res) => {
    const post = { ...req.body, author_id: req.user.id };

    const { error } = validPost(post);
    if(error) return res.status(400).json(error.details);

    new PostsModel(post)
        .save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err));
});

router.put('/post/:id', authUser, authAuthor, (req, res) => {
    PostsModel.
        updateOne({_id: req.params.id}, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});

router.delete('/post/:id', authUser, authAuthor, (req, res) => {
    PostsModel
        .deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});

module.exports = router;
