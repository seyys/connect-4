class DropOutOfBoardError(Exception):
    """ Check that piece is dropped in valid column """
    pass

class WrongPlayerTurnError(Exception):
    """ Check that it is the correct player's turn """
    pass