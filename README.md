# MQTT Exchange

Simple script to listen to a local MQTT broker and republish the messages to AWS IoT. Allows creating a mesh network of sensors with a single internet access point.

## Installation

```shell
npm i mqtt-exchange
```

## Usage
```javascript
const MqttExchange = require('mqtt-exchange');

let mqttExchange = new MqttExchange(topics, awsClientConfig, options);
```

## Parameters

### Topics
`topics` is an array of strings. Topics matching these strings will be passed between clients via subscriptions. Respects MQTT conventions (e.g. `#` for wildcards) Example:

```javascript
let topics = [
    'temperature/#',
    'humidity/#'
];
```

### AWSClientConfig
`awsClientConfig` is borrowed directly from the AWS IoT SDK:

```javascript
let awsClientConfig = {
    keyPath,
    certPath,
    caPath,
    clientId,
    host
};
```

### Options
`options` currently only supports taking a `localClientUrl`, which defaults to `mqtt://localhost:1883`:

```javascript
let options = {
    localClientUrl
};
```