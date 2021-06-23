const mongoose = require('mongoose');
const { mongoUser, mongoPass } = require('../config.json');

const dbUrl = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.hinbc.mongodb.net/smart`;

mongoose.connect(dbUrl, {
    useNewUrlParser:    true, 
    useUnifiedTopology: true,
    useCreateIndex:     true,
    useFindAndModify:   false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("mongo connected"));