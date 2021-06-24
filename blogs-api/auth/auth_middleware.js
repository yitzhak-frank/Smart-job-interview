const { PostsModel } = require('../models/posts_model');

// Verify that user is logged in.
exports.authUser = (req, res, next) => {
    if(!req.isAuthenticated()) return res.status(401).json('Only registered users can access this route');
    next();
}

// Verify that the user is the author of the post.
exports.authAuthor = async (req, res, next) => {
    try {
        const { author_id } = await PostsModel.findById(req.params.id, { author_id: 1 });
        if(author_id.toString() !== req.user.id) return res.status(403).json('Only author can access this route');
        next();
    } catch(err) {
        res.status(400).json(err);
    }
}