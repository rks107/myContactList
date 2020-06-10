// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://mongo-common:rohit@cluster0-kc3ub.mongodb.net/myContactList?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true});

// acquire the connection ( to check it it is successful)
const dp = mongoose.connection;

// error
dp.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
dp.once('open', function(){
    console.log('successful connected to database');
});