const awsIot = require('aws-iot-device-sdk');
const mqtt = require('mqtt');
const localClient = mqtt.connect('mqtt://localhost:1883');

const awsClient = awsIot.device({
    keyPath: './certs/mqtt-repeater-device.private.key',
    certPath: './certs/mqtt-repeater-device.cert.pem',
    caPath: './certs/root-CA.crt',
    clientId: 'mqtt-repeater',
    host: 'azjfhkr6oxmy5-ats.iot.us-west-2.amazonaws.com'
});

awsClient.on('connect', () => {
    console.log('connected to aws mqtt client');
});
awsClient.on('close', () => {
    console.log('close');
});
awsClient.on('reconnect', () => {
    console.log('reconnect');
});
awsClient.on('offline', () => {
    console.log('offline');
});
awsClient.on('error', (error) => {
    console.log('error', error);
});
awsClient.on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
});

localClient.on('connect', () => {
    console.log(`connected to local mqtt client`);

    localClient.subscribe('#', (err) => {
        if (!err) {
            localClient.publish('topic', 'hello world');
        }
    });
});
localClient.on('message', (topic, message) => {
    console.log(`republishing message to topic '${topic}'`);
    console.log(message.toString());
    awsClient.publish(topic, message);
})