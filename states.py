from enum import Enum


class GameState(Enum):
    IN_PROGRESS = 0
    P1_WIN = 1
    P2_WIN = 2

class Error(Enum):
    PLAYER_TURN = 1
    GAME_OVER = 2