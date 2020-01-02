const awsIot = require('aws-iot-device-sdk');
const mqtt = require('mqtt');

let defaultOptions = {
    localClientUrl: 'mqtt://localhost:1883'
}

function MqttRepeater(topics, awsClientConfig, options) {
    this.topics = topics;

    this.options = options || {};

    for (k in defaultOptions) {
        if (typeof this.options[k] === 'undefined') {
          this.options[k] = defaultOptions[k];
        } else {
          this.options[k] = options[k];
        }
    }

    const localClient = mqtt.connect(this.options.localClientUrl);
    const awsClient = awsIot.device(awsClientConfig);

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
    
        topics.forEach((topic) => {
            localClient.subscribe(topic, (err) => {
                console.log(`subscribed to topic '${topic}' on local mqtt client`);
            });
        })
    });
    
    localClient.on('message', (topic, message) => {
        console.log(`republishing message to topic '${topic}'`);
        console.log(message.toString());
        awsClient.publish(topic, message);
    })
}

module.exports = MqttRepeater