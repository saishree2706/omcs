const { Int32 } = require('bson');
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    branchName: String,
    firstName: String,
    lastName: String,
    sex: String,
    accntPassword:String,
    position: String,
    phoneNumber: String,
    contactMail: String,
    address: String,
    flagDoctor: Boolean,
    flagActive: Boolean,
    aboutMe: String,
    rating: Number,
    dateOfBirth: Date,
    image:String
});

module.exports = mongoose.model('Doctor', doctorSchema);
