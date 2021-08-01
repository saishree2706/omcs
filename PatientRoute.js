 const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Patient = require('./Patient');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/all', async (req, res) => {
    try {
        const patients = await Patient.find();
        console.log(patients);
        res.json(patients);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.post('/new',jsonParser,async(req,res)=>
{
    const patient=new Patient({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        sex:req.body.sex,
        phoneNumber:req.body.phoneNumber,
        contactMail:req.body.contactMail,
        address:req.body.address,
        dateOfBirth:req.body.dateOfBirth,
        insuranceId:req.body.insuranceId,
        accntPassword:req.body.accntPassword,
        flagPatient:req.body.flagPatient,
    })
    
    try{
       const u1= await patient.save();
       res.json(u1);
    }catch(err)
    {
        console.log(err);
        res.send('Error... '+err);
    }
});

router.get('/getByPhoneNumber/:phoneNumber',async (req, res) => {
    try {
        var query = { phoneNumber: req.params.phoneNumber};
        const patients = await Patient.find(query);
        console.log(patients);
        res.json(patients);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.patch('/update/:phoneNumber',jsonParser,async(req,res)=>
{
    try{

        var query = { phoneNumber: req.params.phoneNumber};
        const patient=await Patient.find(query);
        console.log(patient);

        if(patient == 'undefined' || patient == 'null')
        {
            console.log("No user found");
            res.send("No user found");
            return;
        }

        patient.firstName=req.body.firstName;
        patient.lastName=req.body.lastName;
        patient.age=req.body.age;
        patient.sex=req.body.sex;
        patient.phoneNumber=req.body.phoneNumber;
        patient.contactMail=req.body.contactMail;
        patient.address=req.body.address;
        patient.dateOfBirth=req.body.dateOfBirth;
        patient.insuranceId=req.body.insuranceId;
        patient.accntPassword=req.body.accntPassword;
        patient.flagPatient=req.body.flagPatient;
        // "dateOfBirth":"2014/11/20 04:11",   format of date
        console.log(patient);
        
        const patientNew=await patient.save();
        res.json(patientNew);
    }
    catch(err )
    {
        res.send("Error..."+err);
    }
});

var mongoose = require("mongoose")
var nodemailer = require('nodemailer');

router.get('/forgotPassword/:phoneNumber', async(req, res)=>{
    var query = { phoneNumber: req.params.phoneNumber};
    var patients=await Patient.find(query);

  
    if(patients.length == 0){
        console.log("Invalid Phone Number");
        res.send("Invalid Phone Number");
        return;
    }

    console.log(patients[0]);

    //Random password Generator
    const num = 8;
    const randomNameGenerator = num => {
       let res = '';
       for(let i = 0; i < num; i++){
          const random = Math.floor(Math.random() * 27);
          res += String.fromCharCode(97 + random);
       };
       return res;
    };
    newPassword = randomNameGenerator(num);
    console.log(newPassword);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tony2021june@gmail.com',
        pass: '@sai2020@'
      }
    });

    // var password = Buffer.from(newPassword,'base64').toString();
    var newQuery = {$set:{accntPassword: newPassword}};

    console.log("fname"+patients[0].lastName);

    var message = 'Hello '+patients[0].firstName+
    '!\nYou\'ve requested for password'
    +'!\nYour User Id is: '+patients[0].phoneNumber+' and new password is: '+newPassword
    +'\nMake sure to change your password once logged in.\n\nThanks for using DocPat!!!';
    var mailOptions = {
      from: 'tony2021june@gmail.com',
      to: patients[0].contactMail,
      subject: 'DocPat - PASSWORD',
      text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Successfully Changed your Password!');
      }
    });

    

    Patient.updateOne(query, newQuery, function(err, result){
        if(err) throw err;
        console.log("1 record Updated");
    });

});



module.exports = router;