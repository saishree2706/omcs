const { Int32 } = require('bson');
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: Number,
    patientId: String,
    doctorId: String,
    problem: String,
    appointmentDate:Date,
    createdTimestamp:Date,
    modifiedTimestamp:Date,
    isActive: Boolean,
    isAccepted: Boolean,
    status:String,
    consultationFee: Number,
});

module.exports = mongoose.model('Appointment', appointmentSchema);