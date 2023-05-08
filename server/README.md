# Connect 4 server with multiplayer in realtime with socketio

# Docker

1. Build docker image: `docker build -t connect-4-server .`
2. Run container: `docker run -p 8080:8080 connect-4-server`

## Docker compose

Example:

```
version: '2.1'
services:
  connect-4-server:
    image: connect-4-server:latest
    container_name: connect-4-server
    ports:
      - 8080:8080
```