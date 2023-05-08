# Connect 4 client with multiplayer in realtime with socketio

## Features
- Realtime multiplayer with socketio
- Game options - board rows, columns, number of matches to win
- Spectator links to watch game
- Token image and colour customisation
- Image resizing before uploading

# Docker

1. Build docker image: `docker build -t connect-4-client .`
2. Run container: `docker run -p 3000:3000 connect-4-client`

## Docker compose

Example:

```
version: '2.1'
services:
  connect-4-client:
    image: connect-4-client:latest
    container_name: connect-4-client
    ports:
      - 3000:3000
```