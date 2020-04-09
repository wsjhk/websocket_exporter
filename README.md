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
websocket{url="ws://www.bcd.com"} 0
websocket{url="ws://www.abc.com"} 1
websocket{url="wss://www.abc.com"} 1
```

> 配置prometheus监控：
```
# vim /etc/prometheus/prometheus.yml //添加以下配置
- job_name: websocket
  scrape_interval: 10s
  scrape_timeout: 10s
  static_configs:
  - targets:
    - "localhost:9189"
    labels:
      target: wss
```
> 配置完成后reload：
```
# curl -X POST http://localhost:9090/-/reload
```
> 配置告警规则：
```
# cat /etc/prometheus/rules/websocket.rules
groups:
- name: websocket 监控
rules:
- alert: websocket 接口探测到异常
expr: websocket{job="websocket"} < 1
for: 30s
labels:
severity: 2
annotations:
summary: "接口{{ $labels.url }} 探测异常"
description: "websocket地址:{{ $labels.url }} , 状态为: down ."
```
