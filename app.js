const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongo = require('./mongo.js');
var cors = require('cors');

const app = express();

app.use(cors());

//Added

const connectToMongoDB = async() => {
    await mongo().then(mongoose=>{
        try{
            console.log("Connected to cloud");
        }catch (err) {
            res.send('Error...' + err)
        }
    })
}

connectToMongoDB();

//till here



const static_path=path.join(__dirname);

//const url = 'mongodb://localhost:27017/Trial';
const port = process.env.PORT || 3000;

/*mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connection successful')
}).catch((error) => {
    console.log('connection refused')
});
*/
//const con = mongoose.connection

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('./patient/landing_page.html');
})
/*app.get("/", (req, res) => {
    res.send("Welcome page")
})*/



app.listen(port, () => {
    console.log('server is running at port...' + port);
})

const bookRouter=require('./books');
app.use('/book',bookRouter);

const userRouter=require('./UserRoute');
app.use('/user',userRouter);

const patientRouter=require('./PatientRoute');
app.use('/patient',patientRouter);

const doctorRouter=require('./DoctorRoute');
app.use('/doctor',doctorRouter);

const appointmentRouter=require('./AppointmentRoute');
app.use('/appointment',appointmentRouter);

const medicineRouter=require('./MedicineRoute');
app.use('/medicine',medicineRouter);

// app.get("*", (req, res) => {
//     res.send("404 Error page");
// });

