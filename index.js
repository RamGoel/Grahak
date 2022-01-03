const express = require('express');
const path = require('path')
const app = express()
const ejs = require('ejs')
const form = require('formidable')
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Users")

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));


var RegSchema = new mongoose.Schema({
    name: String,
    bname: String,
    num: Number,
    email: String,
    locate: String,
    passw: String
});



var User = mongoose.model("User", RegSchema);


app.use(express.static('css'));



app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login', {
        data: 'Login Now'
    })
});
app.post('/loginPost', async (req, res) => {
    console.log(req.body)
    
    var log=await User.updateOne({ 'email': req.body.email },{'name':'mansi'});
    var log2=await User.findOne({'name':'mansi'});
    
    
    console.log(log)
    
    if (req.body.email == "register@123") {
        if (req.body.passw == 1234) {
            res.render('Dash')
            //Add items with database in this line
        } else {
            res.send('Incorrect Credentials');
        }
    }
     
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/registerPost', (req, res) => {
    console.log(req.body)
    const len = req.body.num.toString().length;
    console.log(len)
    const mail = req.body.email.split('.');

    var myData = new User(req.body);
    if (len == 10) {
        if (mail[1] == "com") {

            //Data Saving 
            myData.save()
                .then(item => {
                    res.render('login', {
                        data: "Registration successful! Login Now"
                    })
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });


        } else {
            res.send('Enter Correct mail Id');
        }
    } else {
        res.send("Please Enter Correct Phone Number");
    }











});


app.get('/prod', (req, res) => {

    res.render('Product') //Add product Details from database
});
app.get('/order', (req, res) => {
    res.render('BookOrder', {
        message: "Place you Order Now"
    })
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

app.get('/addprod', (req, res) => {
    res.render('AddProd', {
        message: "Roll on Customers Now"
    })
});
app.get('/mngprod', (req, res) => {
    res.render('ManageProd')
});
app.get('/profile', (req, res) => {
    res.render('SellProfile')
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


app.get('/editProd', (req, res) => {
    res.render('AddProd', {
        message: "Change Product Details"
    })
});

app.get('/dltProd', (req, res) => {
    res.send('Product Deleted');
});
app.get('/editProfile', (req, res) => {
    res.send('This feature is currently Unavailible');
});











app.listen(3000, () => {
    console.log('App listening on port 3000!');
});