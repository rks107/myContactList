const express = require('express');
const path = require('path');
const dp = require('./config/mongoose');
const Contact = require('./modules/contact');


const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//for geting input from browser
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));


// OWN MIDDLEWARE
// // middleware1
// app.use(function(req, res, next){
//     req.myName = "rohit";
//     // console.log("hey I'm inside a middleware1 function");
//     next();
// });
// // middleware2
// app.use(function(req, res, next){
//     console.log(req.myName);
//     console.log("hey I'm inside a middleware2 function");
//     next();
// });

// Contact List

// var ContactList = [
//     {
//         name : "rohit",
//         phone : "9631993381"
//     },
//     {
//         name : "Deeksha",
//         phone : "1234567890"
//     },
//     {
//         name : "sandeep",
//         phone : "0987654321"
//     },
//     {
//         name: "Babu",
//         phone: "9670326423"
//     }
// ]

// Delete Contact
app.get('/delete-contact', function(req, res){
    // get the id from query in the url
    let id = req.query.id;

    //  find the contact in the database using id and delete

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting n objectfrom database');
            return;
        }

        return res.redirect('back');
    });

    // let phone = req.query.phone;

    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
 
    // if(contactIndex != -1) {
    //     ContactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');

    // console.log(req.query);
});

// app.get('/delete-contact/:phone', function(req, res){

//     let phone = req.params.phone;
//     console.log(req.params);
// });

// POST Request

app.post('/create-contact' , function(req , res){

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err) {
            console.log('error in creting a contact list ');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('back');
    });

    // ContactList.push(req.body);

    // ContactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('back');
    // console.log(req.body);
    // return res.redirect('/practice');
});

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err) {
            console.log('Error in fetching contact from db');
            return;
        }

        return res.render('contact',{
            title: 'Contact List',
            contact_list: contacts
        });
    });

    // return res.render('contact',{
    //     title: 'Contact List',
    //     contact_list: ContactList
    // });
    
});

app.get('/home', function(req, res){

    console.log(__dirname);
    // res.send('<h1> cool! It is running. </h1>');
    return res.render('home', {title: 'I am flying'});
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "let's play with EJS"
    });
});

app.listen(port, function(err){
    if(err) {
        console.log("there is an error in running server", err);
        return;
    }

    console.log("server is up and running on port: ", port);
});