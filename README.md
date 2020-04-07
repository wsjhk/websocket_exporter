# Websocket exporter

## Getting Started

```
# docker build -t wss-exporter .
# docker tag wss-exporter:latest wss-expoter:v0.0.1
# docker run -d -p 9189:9189 -e ENDPOINT='ws://www.abc.com,wss://www.abc.com,ws://www.bcd.com' --name websocket_exporter -it websocket_exporter:v0.0.1
```

That's it! Server is now listening on port 9189.

Environment variable ENDPOIINT must be passed to the container.

> demo:
```
# curl localhost:9189/metrics
# HELP websocket websocket_help
# TYPE websocket gauge
websocket{url="ws://www.bcd.com",status="error"} 0
websocket{url="ws://www.abc.com",status="ok"} 1
websocket{url="wss://www.abc.com",status="ok"} 1
```
