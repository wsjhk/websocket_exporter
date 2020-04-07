const server = require('express')();
const client = require('prom-client');
const { WebSocketClient } = require('./websocket');
const ENDPOINT = process.env.ENDPOINT

var arr = ENDPOINT.toString().split(",");

const gauge = new client.Gauge({
  name: 'websocket',
  help: 'websocket_help',
  labelNames: ['url', 'status']
});

for (let index in arr) {
  const ws = new WebSocketClient();
  ws.open(arr[index]);
  ws.onopen = function (e) {
    gauge.labels(arr[index], 'ok').set(1);
  }
  ws.onerror = function (e) {
    gauge.labels(arr[index], 'error').set(0);
  }
}
server.get('/metrics', (req, res) => {
  res.end(client.register.metrics());
});

server.listen(9189);
