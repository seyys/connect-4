import socketio
from aiohttp import web
from room import Room
import json


rooms = []
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on("move")
def move(sid, data):
    pass

@sio.on("new_room")
async def new_room(sid):
    r = Room()
    rooms.append(r)
    return json.dumps(r.uuid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    web.run_app(app)