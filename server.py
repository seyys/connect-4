import socketio
from aiohttp import web
from room import Room
import json
from states import GameState


def find_room(room):
    return [r for r in rooms if r.find_room(room) != None][0]

async def update_board(room):
    message = {"board": list(list(x) for x in room.game.board),
                "player_turn": room.uuid[room.game.player_turn]
    }
    await sio.emit("update_board", json.dumps(message), room=room.room_id)

async def winner_found(room):
    message = {"winner": room.uuid[room.game.game_state.value],
                "win_idx": room.game.win_idx}
    await sio.emit("winner_found", json.dumps(message), room=room.room_id)

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
    await update_board(room_sid_map[sid])
    if room_sid_map[sid].game.game_state != GameState.IN_PROGRESS:
        await winner_found(room_sid_map[sid])
    return error

@sio.on("new_room")
async def new_room(sid, msg):
    r = Room(json.loads(msg))
    rooms.append(r)
    return json.dumps(r.uuid)

@sio.on("join_room")
async def join_room(sid, data):
    r = find_room(data["roomUuid"])
    r.set_sid_roomuuid_map(sid, data["roomUuid"])
    room_sid_map[sid] = r
    sio.enter_room(sid, r.room_id)
    await update_board(r)
    if r.game.game_state != GameState.IN_PROGRESS:
        await winner_found(r)
    return json.dumps({"player_number": r.player[sid],
                        "avatars": r.avatar})

@sio.on("set_avatar")
async def set_avatar(sid, data):
    r = room_sid_map[sid]
    r.set_avatar(sid, json.loads(data)["avatar"])
    await sio.emit("update_avatar", json.dumps({"avatars": r.avatar}), room=r.room_id)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    web.run_app(app)