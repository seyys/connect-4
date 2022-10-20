from uuid import uuid4 as uuid

class Room:
    def __init__(self):
        self.uuid = {"p1": str(uuid()), "p2": str(uuid()), "spectator": str(uuid())}
        # Initialise board