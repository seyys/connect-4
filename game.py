import numpy as np
import pygame
import sys
import math
import custom_exception


class connect4:
    def __init__(self, num_rows, num_cols, num_match):
        self.num_rows = num_rows
        self.num_cols = num_cols
        self.num_match = num_match
        self.player_turn = 1
        self.board = board = np.zeros((self.num_rows, self.num_cols))

    def move(self, col, player):
        if player != self.player_turn:
            return "error_player_turn"
        if not (col > 0 and col < self.num_cols):
            Exception(custom_exception.DropOutOfBoardError)
        if self.board[-1][col] != 0:
            Exception(custom_exception.DropOutOfBoardError)
        if player != self.player_turn:
            Exception(custom_exception.WrongPlayerTurnError)
        row = max(*np.where(self.board[:,col] == 0))
        self.board[row, col] = player
        if self.check_win(row, col, player):
            return "win"
        self.player_turn = self.player_turn % 2 + 1
        return None
    
    def check_win(self, row, col, player):
        if connect4.check_line(self.board[row,:], self.num_match, player):
            return True
        if connect4.check_line(self.board[:,col], self.num_match, player):
            return True
        if connect4.check_line(self.board.diagonal(col-row), self.num_match, player):
            return True
        if connect4.check_line(np.fliplr(self.board).diagonal((self.num_cols-1-col)-row), self.num_match, player):
            return True
        return False

    @staticmethod
    def check_line(line, num_match, player):
        without_reset = (line == player).cumsum()
        reset_at = (line != player)
        overcount = np.maximum.accumulate(without_reset * reset_at)
        result = without_reset - overcount
        return max(result) >= num_match

    def draw_board(board, screen):
        for column in range(COLUMN_COUNT):
            for row in range(ROW_COUNT):
                pygame.draw.rect(screen, BOARD_COLOUR, (column*SQUARESIZE, row*SQUARESIZE+SQUARESIZE, SQUARESIZE, SQUARESIZE))

                if board[row][column] == 0:
                    pygame.draw.circle(screen, BLACK, (column*SQUARESIZE+int(SQUARESIZE/2), row*SQUARESIZE+SQUARESIZE+int(SQUARESIZE/2)), RADIUS)
                elif board[row][column] == 1:
                    pygame.draw.circle(screen, P1_COLOUR, (column*SQUARESIZE+int(SQUARESIZE/2), row*SQUARESIZE+SQUARESIZE+int(SQUARESIZE/2)), RADIUS)
                else:
                    pygame.draw.circle(screen, P2_COLOUR, (column*SQUARESIZE+int(SQUARESIZE/2), row*SQUARESIZE+SQUARESIZE+int(SQUARESIZE/2)), RADIUS)
        pygame.display.update()