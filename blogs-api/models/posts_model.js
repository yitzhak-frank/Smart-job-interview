const mongoose = require('mongoose');
const joi = require('joi');

// Validate the post before connecting to db.
exports.validPost = post => {
    const schema = joi.object({
        title:     joi.string().required(),
        body:      joi.string().required(),
        author_id: joi.string().required()
    });
    return schema.validate(post);
}

const postsSchema = new mongoose.Schema({
    title: {
        type:     String,
        required: true
    },
    body: {
        type:     String,
        required: true
    },
    create_date: {
        type:      Date,
        default:   Date.now(),
        immutable: true 
    },
    author_id: {
        type:      mongoose.Schema.Types.ObjectId,
        ref:       'users',
        required:  true,
        immutable: true 
    }
});

exports.PostsModel = mongoose.model('posts', postsSchema);