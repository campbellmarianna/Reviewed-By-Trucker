// Object Document Mapper
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Load = mongoose.model ('Load', {
    company: String,
    pickupDate: String,
    originLocation: String,
    destination: String,
    rate: String
});

module.exports = Load;
