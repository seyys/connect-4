import numpy as np
import pygame
import sys
import math
import custom_exception
from states import GameState, Error


class connect4:
    def __init__(self, num_rows, num_cols, num_match):
        self.num_rows = num_rows
        self.num_cols = num_cols
        self.num_match = num_match
        self.player_turn = 1
        self.board = board = np.zeros((self.num_rows, self.num_cols))
        self.game_state = GameState.IN_PROGRESS

    def move(self, col, player):
        if self.game_state != GameState.IN_PROGRESS:
            return {"error": Error.GAME_OVER}
        if player != self.player_turn:
            return {"error": Error.PLAYER_TURN}
        if not (col > 0 and col < self.num_cols):
            Exception(custom_exception.DropOutOfBoardError)
        if self.board[-1][col] != 0:
            Exception(custom_exception.DropOutOfBoardError)
        row = max(*np.where(self.board[:,col] == 0))
        self.board[row, col] = player
        # Need to cast row and col to int or you get json serialisation problems later
        win = self.check_win(int(row), int(col), player)
        if win:
            self.win_idx = win
            if player == 1:
                self.game_state = GameState.P1_WIN
            else:
                self.game_state = GameState.P2_WIN
        self.player_turn = self.player_turn % 2 + 1
        return {"error": None}
    
    def check_win(self, row, col, player):
        match = connect4.check_line(self.board[row,:], self.num_match, player)
        if match:
            return [[row, x] for x in match]

        match = connect4.check_line(self.board[:,col], self.num_match, player)
        if match:
            return [[x, col] for x in match]
        
        offset = col-row
        match = connect4.check_line(self.board.diagonal(offset), self.num_match, player)
        if match:
            return [[x if offset > 0 else x-offset, x+offset if offset > 0 else x] for x in match]
        
        offset = (self.num_cols-1-col)-row
        match = connect4.check_line(np.fliplr(self.board).diagonal(offset), self.num_match, player)
        if match:
            return [[x if offset > 0 else x-offset, (self.num_cols-x-1)-offset if offset > 0 else (self.num_cols-x-1)] for x in match]

        return False

    @staticmethod
    def check_line(line, num_match, player):
        without_reset = (line == player).cumsum()
        reset_at = (line != player)
        overcount = np.maximum.accumulate(without_reset * reset_at)
        result = without_reset - overcount
        if max(result) >= num_match:
            # Get indices of match
            pattern_longest_match = ''.join(str(x) for x in list(range(1,max(result)+1)))
            idx_start = ''.join(str(x) for x in result).index(pattern_longest_match)
            idx_end = idx_start + len(pattern_longest_match)
            return list(range(idx_start, idx_end))
        else:
            return None

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