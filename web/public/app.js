const Sensor_URL = 'http://localhost:5003';

let dhtsensordata = [];
let dhtsensordata1 = [];
let lastdhtdata = [];
let lastdhtdata1 = [];

$.get(`${Sensor_URL}/dht-sensorvalues`)
    .then(response => {
        response.forEach(device => {
            dhtsensordata.push(device.humidity);
        });
        
        response.forEach(device => {
            dhtsensordata1.push(device.temperature);
        });

        // response.forEach(device => {
        //     timedata.push(device.date);
        // });

        lastdhtdata = dhtsensordata.slice(-150);
        lastdhtdata1 = dhtsensordata1.slice(-150);
        // lasttimeval = timedata.slice(-150);

        for (let i = 0; i < 150; i++) {
            const newRow = $('<tr>');
            newRow.append(`<td>${lastdhtdata[i]}</td>`);
            newRow.append(`<td>${lastdhtdata1[i]}</td>`);
            // newRow.append(`<td>${lastmotionval[i]}</td>`);
            // newRow.append(`<td>${lasttimeval[i]}</td>`);
            $('#sensorvalues tbody').append(newRow);
        }
    })