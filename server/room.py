from uuid import uuid4 as uuid
import game

class Room:
    @staticmethod
    def gen_uuid():
        return str(uuid()).replace('-', '')

    def __init__(self, msg):
        self.uuid = {1: str(Room.gen_uuid()), 2: str(Room.gen_uuid()), "spectator": str(Room.gen_uuid())}
        self.player = {}
        self.playerCustomisation = {"avatar": {}, "colour": {}}
        self.room_id = str(Room.gen_uuid())
        # Initialise board
        self.game = game.connect4(int(msg["num_rows"]), int(msg["num_cols"]), int(msg["num_matches"]))
    
    def move(self, sid, d):
        return self.game.move(d["col"], self.player[sid])
    
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

    def set_sid_roomuuid_map(self, sid, player):
        self.player[sid] = self.find_player(player)

    def set_avatar(self, sid, data):
        if data["avatar"] != None:
            self.playerCustomisation["avatar"][self.player[sid]] = data["avatar"]
        if data["colour"] != None:
            self.playerCustomisation["colour"][self.player[sid]] = data["colour"]