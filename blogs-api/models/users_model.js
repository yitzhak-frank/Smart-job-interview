const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type:     String,
        unique:   true,
        required: true
    },
    password: {
        type:     String,
        required: true
    },
    first_name: {
        type:     String,
        required: true
    },
    last_name: {
        type:     String,
        required: true
    },
    age: {
        type:     Number,
        min:      6,
        max:      120,
        required: true
    },
    birth_date: {
        type:     Date,
        required: true
    }
});

module.exports = mongoose.model('users', usersSchema);
