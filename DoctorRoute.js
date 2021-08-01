const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Doctor = require('./Doctor');

var nodemailer = require('nodemailer');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/all', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        console.log(doctors);
        res.json(doctors);
    } catch (err) {
        res.send('Error...' + err);
    }
});

router.get('/forgotPassword/:phoneNumber', async (req, res) => {

    console.log('hereee');
    try {
        var query = { phoneNumber: req.params.phoneNumber };
        const doctor = await Doctor.find(query);

        var password = Buffer.from(doctor[0].accntPassword, 'base64').toString();
        console.log(password);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bangaru.amrita1110@gmail.com',
                pass: 'sasikala123'
            }
        });

        const result = randomNameGenerator(8);
        console.log("result" + result);
        doctor[0].accntPassword = Buffer.from(result).toString('base64');

        try {
            const d1 = await doctor[0].save();

            var mailOptions = {
                from: 'bangaru.amrita110@gmail.com',
                to: d1.contactMail,
                subject: 'OMCS-Password',
                text: 'Hello Dr. ' + d1.firstName + ' ' + d1.lastName +
                    '.\nYour new password for Online Medical Consultation System is ' + result +
                    '. \nMake sure to change your password once logged in.'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.send();
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send(doctor);
                }
            });
        } catch (err) {
            console.log(err);
        }

    } catch (err) {
        res.send('Error...' + err);
    }

});


const randomNameGenerator = num => {
    let result = '';
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 27);
        result += String.fromCharCode(97 + random);
    };
    return result;
};

router.get('/branch/:branchName', async (req, res) => {
    try {
        var query = { branchName: req.params.branchName };
        const doctors = await Doctor.find(query);
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
        dateOfBirth: req.body.dateOfBirth,
        sex: req.body.sex,
        phoneNumber: req.body.phoneNumber,
        contactMail: req.body.contactMail,
        address: req.body.address,
        accntPassword: req.body.accntPassword,
        flagDoctor: req.body.flagDoctor,
        flagActive: req.body.flagActive,
        branchName: req.body.branchName,
        position: req.body.position,
        aboutMe: req.body.aboutMe,
        rating: req.body.rating,
        image: req.body.image
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
        if (doctor == 'undefined' || doctor == null) {
            console.log("No user found");
            res.send("No user found");
            return;
        }
        doctor.firstName = req.body.firstName;
        doctor.lastName = req.body.lastName;
        doctor.dateOfBirth = req.body.dateOfBirth;
        doctor.sex = req.body.sex;
        doctor.phoneNumber = req.body.phoneNumber;
        doctor.contactMail = req.body.contactMail;
        doctor.address = req.body.address;
        doctor.accntPassword = req.body.accntPassword;
        doctor.flagDoctor = req.body.flagDoctor;
        doctor.flagActive = req.body.flagActive;
        doctor.branchName = req.body.branchName;
        doctor.position = req.body.position;
        doctor.aboutMe = req.body.aboutMe;
        doctor.rating = req.body.rating;
        doctor.image = req.body.image;


        console.log(doctor);

        const doctorNew = await doctor.save();
        res.json(doctorNew);
    } catch (err) {
        res.send("Error..." + err);
    }
})

module.exports = router