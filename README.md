# Websocket exporter

## Getting Started

```
docker run -d -p 9189:9189 -e ENDPOINT='ws://www.abc.com,wss://www.abc.com,ws://wwwbcd.com' --name websocket_exporter -it wsjhk/websocket_exporter
```

That's it! Server is now listening on port 9189.

Environment variable ENDPOIINT must be passed to the container.

> demo:
```
curl 94.191.109.129:9189/metrics
# HELP websocket websocket_help
# TYPE websocket gauge
websocket{url="ws://www.bcd.com",status="error"} 0
websocket{url="ws://www.abc.com",status="ok"} 1
websocket{url="wss://www.abc.com",status="ok"} 1
```
