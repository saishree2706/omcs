const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Medicine = require('./Medicines');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/all', async (req, res) => {
    try {
        var query = { appointmentId: 0 };
        const medicines = await Medicine.find(query);
        console.log(medicines);
        res.json(medicines);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/updateAll', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        for (i = 0; i < medicines.length; i++) {
            if (medicines[i].medicineName == '-1')
                medicines[i].medicineName = 'Benzocaine';
            await medicines[i].save();
        }
        res.send("success");
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/getByAppointment/:appointmentId', async (req, res) => {
    try {
        var query = { appointmentId: req.params.appointmentId };
        const medicines = await Medicine.find(query);
        console.log(medicines);
        res.json(medicines);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/getByPatient/:appointmentId', async (req, res) => {
    try {
        var query = { appointmentId: req.params.appointmentId };
        const medicines = await Medicine.find(query);
        console.log(medicines);
        res.json(medicines);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.post('/new', jsonParser, async (req, res) => {
    const medicine = new Medicine({
        appointmentId: req.body.appointmentId,
        medicineName: req.body.medicineName,
        price: req.body.price,
        dosage: req.body.dosage,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        timingMorning: req.body.timingMorning,
        timingAfternoon: req.body.timingAfternoon,
        timingEvening: req.body.timingEvening
    });

    try {
        const m1 = await medicine.save();
        res.json(m1);
    } catch (err) {
        console.log(err);
        res.send('Error... ' + err);
    }
});

var nodemailer = require('nodemailer');

var nodemailer = require('nodemailer');
router.post('/sendCalendarInvite', jsonParser, async (req, res) => {
    console.log("here1234");
    var mail = req.body.mail;
    var time = req.body.time;
    var fromDate = req.body.fromDate;
    var toDate = req.body.toDate;
    var timeTo = req.body.timeTo;
    var medicineName = req.body.medicineName;
    console.log(time + "from time");
    console.log(timeTo + "to time");
    console.log(fromDate + " to " + toDate);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tony2021june@gmail.com',
            pass: '@sai2020@'
        }
    });



    let time1 = fromDate + time;
    let time2 = fromDate + timeTo;

    let endDate = toDate + 'T182959Z;';
    let createdDate = fromDate + 'T020011Z'


    let str1 = 'BEGIN:VCALENDAR\r\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\r\nVERSION:2.0\r\nCALSCALE:GREGORIAN\r\nMETHOD:REQUEST\r\nBEGIN:VTIMEZONE\r\nTZID:Asia/Kolkata\r\nX-LIC-LOCATION:Asia/Kolkata\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:+0530\r\nTZOFFSETTO:+0530\r\nTZNAME:IST\r\nDTSTART:19700101T000000\r\nEND:STANDARD\r\nEND:VTIMEZONE\r\nBEGIN:VEVENT\r\nDTSTART;TZID=Asia/Kolkata:';
    let str2 = time1 + '\r\nDTEND;TZID=Asia/Kolkata:' + time2 + '\r\nRRULE:FREQ=DAILY;UNTIL=' + endDate + '\r\nDTSTAMP:' + createdDate;
    let str3 = '\r\nORGANIZER;CN=tony2021june@gmail.com:mailto:tony2021june@gmail.com\r\nCREATED:20210530T020007Z\r\nSEQUENCE:0\r\nSTATUS:CONFIRMED\r\nSUMMARY:Your Medicines Timings from DocPat\r\nTRANSP:OPAQUE\r\nDESCRIPTION:\n\nThis mail is regarding your medicines timings from DocPat.\nPlease Ignore if Calendar Invite is already received\r\nEND:VEVENT\r\nEND:VCALENDAR'

    let content = str1 + str2 + str3;

    var mailOptions = {
        from: 'tony2021june@gmail.com',
        to: mail,
        subject: 'Calendar invite',
        text: 'This is your medicine Alert list for' + medicineName,
        icalEvent: {
            filename: 'invite.ics',
            method: 'request',
            content: content
        }
    };
    console.log("here123");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Calendar Invite has been sent to your Email ID');
        }
    });

});
module.exports = router;