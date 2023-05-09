# Connect 4 clone with real-time multiplayer

## Features
 - Real-time multiplayer with Socket.IO
 - Custom game options - number of rows, columns, and matches to win
 - Spectators links
 - Token image and colour customisation
 - Token image resized before upload

## Screenshots

Room options

![room](https://user-images.githubusercontent.com/115355216/237022790-04a60d38-edd4-4a88-94c2-d9b92c4baa9d.png)

Player win

![win](https://user-images.githubusercontent.com/115355216/237023209-f0b67dae-f69f-4c0e-9fcc-072b877678f4.png)

Player turn

![turn](https://user-images.githubusercontent.com/115355216/237022972-43b521d6-c8bc-4999-a71f-f16cdcf320b4.png)


## Docker

1. Build docker images:
    - `docker build -t connect-4-client client/`
    - `docker build -t connect-4-server server/`
2. Run containers:
    - `docker run -p 8080:8080 connect-4-server`
    - `docker run -p 3000:3000 connect-4-client`

### Docker compose

Example:

```yaml
version: '2.1'
services:
  connect-4-client:
    image: connect-4-client:latest
    container_name: connect-4-client
    ports:
      - 3000:3000
  connect-4-server:
    image: connect-4-server:latest
    container_name: connect-4-server
    ports:
      - 8080:8080
```
