const mongoose = require('mongoose');
const joi = require('joi');

// Validate the user before connecting to db.
exports.validUser = user => {
    const schema = joi.object({
        username:   joi.string().required(),
        password:   joi.string().required(),
        first_name: joi.string().required(),
        last_name:  joi.string().required(),
        age:        joi.number().min(6).max(120).required(),
        birth_date: joi.required()
    });
    return schema.validate(user);
}

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

exports.UsersModel = mongoose.model('users', usersSchema);
