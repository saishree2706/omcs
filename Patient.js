const { Int64 } = require('bson');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    sex: String,
    phoneNumber: String,
    contactMail: String,
    dateOfBirth: Date,
    address: String,
    insuranceId: String,
    accntPassword: String,
    flagPatient: Boolean

});

module.exports = mongoose.model('Patient', patientSchema);