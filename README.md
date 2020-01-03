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

`awsClientConfig` is borrowed directly from the AWS IoT SDK:

```javascript
{
    keyPath,
    certPath,
    caPath,
    clientId,
    host
}
```

`options` currently only supports taking a `localClientUrl`, which defaults to `mqtt://localhost:1883`:

```javascript
{
    localClientUrl
}
```