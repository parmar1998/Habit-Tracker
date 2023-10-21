const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/habitTracker', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected !!!");
});

module.exports = db;