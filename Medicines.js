const { Int32 } = require('bson');
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    appointmentId: Number,
    medicineName: String,
    price: Number,
    dosage: Number,
    dateFrom: Date,
    dateTo: Date,
    timingMorning: Number,
    timingAfternoon: Number,
    timingEvening: Number
});

module.exports = mongoose.model('Medicine', medicineSchema);
