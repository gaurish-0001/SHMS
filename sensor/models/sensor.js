const mongoose = require('mongoose');

module.exports = mongoose.model('SensorValues', new mongoose.Schema({
    humidity: String,
    temperature: String
}, { collection: 'dht-sensorvalues' }));