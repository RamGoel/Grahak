const express = require('express');
const path = require('path')
const app = express()
const ejs = require('ejs')
const form = require('formidable')
var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/Users")

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/css'));
app.use(express.static(__dirname+'/js'));
app.use(express.static(__dirname+'/images'));

// var RegSchema = new mongoose.Schema({
//     name: String,
//     bname: String,
//     num: Number,
//     email: String,
//     locate: String,
//     passw: String
// });



// var User = mongoose.model("User", RegSchema);






app.post('/loginPost', (req, res) => {
    console.log(req.body)
    
    // var log=await User.updateOne({ 'email': req.body.email },{'name':'mansi'});
    // var log2=await User.findOne({'name':'mansi'});
     
    
  
    
    if (req.body.email == "register@123") {
        if (req.body.passw =='shiv') {
            res.json
            //Add items with database in this line
        } else {
            res.send('Incorrect Credentials');
        }
    }
     
});


app.post('/registerPost', (req, res) => {
    console.log(req.body)
    const len = req.body.num.toString().length;
    console.log(len)
    const mail = req.body.email.split('.');

    // var myData = new User(req.body);
    if (len == 10) {
        if (mail[1] == "com") {

            // //Data Saving 
            // myData.save()
            //     .then(item => {
                    res.send("Success")
                // })
                // .catch(err => {
                //     res.status(400).send("unable to save to database");
                // });


        } else {
            res.send('Enter Correct mail Id');
        }
    } else {
        res.send("Please Enter Correct Phone Number");
    }











});



app.post('/orderPost', (req, res) => {

    const len = req.body.num.toString().length;
    console.log(len)



    if (len == 10) {


        res.render('BookOrder', {
            message: "Ordered Successfully"
        })

    } else {
        res.send("Please Enter 10 digit Phone Number");
    }
});



app.post('/prodPost', (req, res) => {
    console.log(req.body)
    if (req.body != "") {
        res.render('AddProd', {
            message: "Product Added Successfuly"
        })
    } else {
        res.render('AddProd', {
            message: "Invalid Details"
        });
    }
});





app.listen(3000, () => {
    console.log('App listening on port 3000!');
});