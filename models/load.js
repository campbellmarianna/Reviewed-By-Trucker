// Object Document Mapper
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Load = mongoose.model ('Load', {
    pickupDate: String,
    originLocation: String,
    destination: String,
    price: String
});

module.exports = Load;
