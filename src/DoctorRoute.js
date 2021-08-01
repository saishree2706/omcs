const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Doctor = require('./Doctor');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/all', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        console.log(doctors);
        res.json(doctors);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.post('/new', jsonParser, async (req, res) => {
    const doctor = new Doctor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        sex: req.body.sex,
        phoneNumber: req.body.phoneNumber,
        contactMail: req.body.contactMail,
        address: req.body.address,
        accntPassword: req.body.accntPassword,
        flagDoctor: req.body.flagDoctor,
        flagActive: req.body.flagActive,
        branchId: req.body.branchId,
        position: req.body.position,
        aboutMe: req.body.aboutMe,
        rating: req.body.rating
    });

    try {
        const d1 = await doctor.save();
        res.json(d1);
    } catch (err) {
        console.log(err);
        res.send('Error... ' + err);
    }
});

router.get('/getByPhoneNumber/:phoneNumber', async (req, res) => {
    try {
        var query = { phoneNumber: req.params.phoneNumber };
        const doctors = await Doctor.find(query);
        console.log(doctors);
        res.json(doctors);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.patch('/update/:phoneNumber', jsonParser, async (req, res) => {
    try {

        var query = { phoneNumber: req.params.phoneNumber };
        const doctor = await Doctor.findOne(query);
        console.log(doctor);
        if(doctor == 'undefined' || doctor == null)
        {
            console.log("No user found");
            res.send("No user found");
            return;
        }
        doctor.firstName=req.body.firstName;
        doctor.lastName= req.body.lastName;
        doctor.age= req.body.age;
        doctor.sex= req.body.sex;
        doctor.phoneNumber= req.body.phoneNumber;
        doctor.contactMail= req.body.contactMail;
        doctor.address= req.body.address;
        doctor.accntPassword= req.body.accntPassword;
        doctor.flagDoctor= req.body.flagDoctor;
        doctor.flagActive= req.body.flagActive;
        doctor.branchId= req.body.branchId;
        doctor.position= req.body.position;
        doctor.aboutMe= req.body.aboutMe;
        doctor.rating= req.body.rating;
   

        console.log(doctor);

        const doctorNew = await doctor.save();
        res.json(doctorNew);
    }
    catch (err) {
        res.send("Error..." + err);
    }
})

module.exports = router