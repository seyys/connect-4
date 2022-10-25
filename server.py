import socketio
from aiohttp import web
from room import Room
import json
from states import GameState


def find_room(room):
    return [r for r in rooms if r.find_room(room) != None][0]

rooms = []
room_sid_map = {}
sio = socketio.AsyncServer(cors_allowed_origins="*")
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on("move")
async def move(sid, data):
    error = room_sid_map[sid].move(sid, data)
    await sio.emit("update_board", json.dumps(list(list(x) for x in room_sid_map[sid].game.board)), room=room_sid_map[sid].room_id)
    if room_sid_map[sid].game.game_state != GameState.IN_PROGRESS:
        await sio.emit("winner_found", json.dumps({"winner": room_sid_map[sid].uuid[room_sid_map[sid].game.game_state.value]}), room=room_sid_map[sid].room_id)
    return error

@sio.on("new_room")
async def new_room(sid):
    r = Room()
    rooms.append(r)
    return json.dumps(r.uuid)

@sio.on("join_room")
async def join_room(sid, data):
    r = find_room(data["roomUuid"])
    r.player[sid] = r.find_player(data["roomUuid"])
    room_sid_map[sid] = r
    sio.enter_room(sid, r.room_id)
    await sio.emit("update_board", json.dumps(list(list(x) for x in room_sid_map[sid].game.board)), room=room_sid_map[sid].room_id)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    web.run_app(app)