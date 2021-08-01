const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const static_path=path.join(__dirname)

const url = 'mongodb://localhost:27017/Trial'
const port = process.env.PORT || 3000

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connection successful')
}).catch((error) => {
    console.log('connection refused')
})

const con = mongoose.connection

app.get("/", (req, res) => {
    res.send("Welcome page")
})

app.get("*", (req, res) => {
    res.send("404 Error page")
})

app.listen(port, () => {
    console.log('server is running at port...' + port);
})

app.post("/sign_up",(req,res)=>{
    console.log('hereeee')
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    
    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password     
    }

    con.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            console.log(err);
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('about.html');
});

const bookRouter=require('C:\Users\amrita\Desktop\crudJS\src\routes\books.js');
app.use('/book',bookRouter);

const userRouter=require('./routes/UserRoute')
app.use('/user',userRouter)