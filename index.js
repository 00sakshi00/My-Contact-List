//npm install express
//npm install ejs

const express=require('express');
const { request } = require('http');
const path = require('path');
const port=8000;

const db= require('./config/mongoose');
const Contact= require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middle ware
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name:"abc",
        phone:"645321566"
    },
    {
        name:"def",
        phone:"654156127"
    },
    {
        name:"ghi",
        phone:"456135484"
    }
];

// from server to browser
app.get('/',function(req,res){

    Contact.find({}, function(err,contacts){
        if(err){
            console.log('error in fetching contact');
            return;
        }
        return res.render('home',{ 
            title: "My Contact List",
            contact_List:contacts
        });
    });

    /*
    return res.render('home',{ 
        title: "My Contact List",
        contact_List:contactList
    });
    */
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"practice with ejs"
    });
});

// browser to server
app.post('/create-contact',function(req,res){
    // return res.redirect('/practice'); 
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    /*
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    */

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })

});

app.get('/delete-contact',function(req,res){
    // get query from url
    
    //console.log(req.query.phone);

    //get id from url
    let id = req.query.id;

    //find contact in database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting from database');
            return;
        }
        return res.redirect('back');
    })
});

app.listen(port,function(err){
    if(err){
        console.log('error in running server ',err);
    }
    console.log('express server running on port: ',port)
});
