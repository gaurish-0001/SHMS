const express = require('express');
const mongoose = require('mongoose')
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const Sensordata = require('./models/sensor');

mongoose.connect(
    "mongodb+srv://Vicky1234:Vicky12345@cluster0.6vg99a2.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 5003;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const URL = 'mqtt://localhost:1883';
const humidity = 'humidity'
const temperature = 'temperature'

const client = mqtt.connect(URL);

app.get('/dht-sensorvalues', async (req, res) => {
    try {
        const data = await Sensordata.find();
        res.send(data);
    } catch (err) {
        console.error('Failed to fetch sensor data', err);
        res.status(500).send('An error occurred');
    }
});

client.on('connect', function () {
    console.log('Connected to MQTT broker');

    client.subscribe(humidity, function (err) {
        if (err) {
            console.error('Failed: ', err);
        } else {
            console.log('Subscribed: ', humidity);
        }
    });

    client.subscribe(temperature, function (err) {
        if (err) {
            console.error('Failed: ', err);
        } else {
            console.log('Subscribed: ', temperature);
        }
    });
});

a = 0;
b = 0;

client.on('message', function (topic, message) {
    console.log(topic, ' ', message.toString());

    if (topic === 'humidity') {
        a = message;

    } else if (topic === 'temperature') {
        b = message;
    }

    if (a && b) {
        const NewDevice = new Sensordata({
            humidity: a,
            temperature: b
        })
        NewDevice.save()
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
