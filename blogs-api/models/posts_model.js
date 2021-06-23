const mongoose = require('mongoose');

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
        type:    Date,
        default: Date.now(),
        immutable: true 
    },
    author_id: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'users',
        required: true,
        immutable: true 
    }
});

module.exports = mongoose.model('posts', postsSchema);