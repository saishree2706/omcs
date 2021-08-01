const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const Appointment = require('./Appointment');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/all', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        console.log(appointments);
        res.json(appointments);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.post('/new', jsonParser, async (req, res) => {
    try {
        const appointments = await Appointment.find();
        console.log(appointments);

        const appointment = new Appointment({

            appointmentId: appointments.length + 1,
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            problem: req.body.problem,
            appointmentDate: req.body.appointmentDate,
            createdTimestamp: req.body.createdTimestamp,
            modifiedTimestamp: req.body.modifiedTimestamp,
            isActive: req.body.isActive,
            isAccepted: req.body.isAccepted,
            status: req.body.status,
            consultationFee: req.body.consultationFee

        });
        try {
            const a1 = await appointment.save();
            res.json(a1);
        } catch (err) {
            console.log(err);
            res.send('Error... ' + err);
        }

    } catch (err) {
        res.send('Error...' + err)
    }

});

router.get('/getOne/:appointmentId', async (req, res) => {
    try {
        var query = { appointmentId: req.params.appointmentId };
        const appointment = await Appointment.find(query);
        console.log(appointment);
        res.json(appointment);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/getByPatientIdAndStatus/:patientId/:status', async (req, res) => {
    try {
        var query = { patientId: req.params.patientId, isActive: req.params.status };
        const appointments = await Appointment.find(query);
        console.log(appointments);
        res.json(appointments);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/getByDoctor/:doctorId', async (req, res) => {
    try {
        var query = { doctorId: req.params.doctorId };
        const appointments = await Appointment.find(query);
        console.log(appointments);
        res.json(appointments);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/getByPatient/:patientId', async (req, res) => {
    try {
        console.log("appointments");
        var query = { patientId: req.params.patientId };
        const appointments = await Appointment.find(query);
        console.log(appointments);
        res.json(appointments);
    } catch (err) {
        console.log(err);
        res.send('Error...' + err)
    }
});

router.get('/getToday/:doctorId', async (req, res) => {
    try {
        var query = { isAccepted: true, doctorId: req.params.doctorId };
        const appointments = await Appointment.find(query);
        console.log(appointments);
        res.json(appointments);
    } catch (err) {
        res.send('Error...' + err)
    }
});

router.get('/updateAll', jsonParser, async (req, res) => {
    try {

        const appointments = await Appointment.find();

        for (i = 0; i < appointments.length; i++) {
            const appointment = appointments[i];
            if (appointment.appointmentId > 3) {
                await appointment.delete();
            }
            else {
                if (appointment.problem == "a")
                    appointment.problem = "Dental checkup";
                appointment.patientId = "9676805020";
                appointment.isActive = true;
                appointment.isAccepted = false;
                appointment.appointmentDate = "2021-06-10T16:44:00.000Z";
                const appointmentNew = await appointment.save();
            }

        }

        // for(i=0;i<appointments.length;i++)
        // {
        //     const appointment=appointments[i];
        //     if(appointment.appointmentId%5==0)
        //     {
        //         appointment.problem="ear pain";
        //     }
        //     else if(appointment.appointmentId%5==1)
        //     {
        //         appointment.problem="stomach pain";
        //     }
        //     else if(appointment.appointmentId%5==2)
        //     {
        //         appointment.problem="dental problem";
        //     }else if(appointment.appointmentId%5==3)
        //     {
        //         appointment.problem="general checkup";
        //     }
        //     else{
        //         appointment.problem="body pains";
        //     }

        //     appointment.appointmentDate = "2021-06-01T16:44:00.000Z";
        //     const appointmentNew = await appointment.save();
        // }


        res.send("success");
    }
    catch (err) {
        console.log(err);
        res.send("Error..." + err);
    }
});

router.patch('/update/:appointmentId', jsonParser, async (req, res) => {
    try {

        var query = { appointmentId: req.params.appointmentId };
        const appointment = await Appointment.findOne(query);
        console.log(appointment);

        if (appointment == 'undefined' || appointment == 'null') {
            console.log("No such appointment found");
            res.send("No such appointment found");
            return;
        }

        appointment.appointmentId = req.body.appointmentId;
        appointment.patientId = req.body.patientId;
        appointment.doctorId = req.body.doctorId;
        appointment.problem = req.body.problem;
        appointment.appointmentDate = req.body.appointmentDate;
        appointment.createdTimestamp = req.body.createdTimestamp;
        appointment.modifiedTimestamp = req.body.modifiedTimestamp;
        appointment.isActive = req.body.isActive;
        appointment.isAccepted = req.body.isAccepted;
        appointment.consultationFee = req.body.consultationFee;
        appointment.status = req.body.status;

        console.log(appointment);

        const appointmentNew = await appointment.save();
        res.json(appointmentNew);
    }
    catch (err) {
        console.log(err);
        res.send("Error..." + err);
    }
});

module.exports = router