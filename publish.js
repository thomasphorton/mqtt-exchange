const mqtt = require('mqtt');
const localClient = mqtt.connect('mqtt://localhost:1883');

localClient.on('connect', () => {
    console.log(`connected to local mqtt client`);

    let message = {
        lat: 43,
        lon: 65
    };

    localClient.publish('test', JSON.stringify(message));
    console.log(`published message:`);
    console.log(message);
});
