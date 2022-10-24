from uuid import uuid4 as uuid
import game

class Room:
    num_rows = 6
    num_cols = 7
    num_match = 4

    def __init__(self):
        self.uuid = {1: str(uuid()), 2: str(uuid()), "spectator": str(uuid())}
        self.player = {}
        self.room_id = str(uuid())
        # Initialise board
        self.game = game.connect4(Room.num_rows, Room.num_cols, Room.num_match)
    
    def move(self, sid, d):
        self.game.move(d["col"], self.player[sid])
    
    def find_room(self, room_uuid):
        for v in self.uuid.values():
            if v == room_uuid:
                return self.room_id
        return None
    
    def find_player(self, uuid):
        for k, v in self.uuid.items():
            if v == uuid:
                return k
        return None