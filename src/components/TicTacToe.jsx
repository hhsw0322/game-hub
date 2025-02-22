import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  return (
    <div className="tictactoe-container">
      <div className="tictactoe-header">
        <h2>Tic Tac Toe</h2>
        <button onClick={resetGame} className="reset-button">
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="status-message">
        Next player: {isXNext ? 'X' : 'O'}
      </div>

      <div className="tictactoe-grid">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="tictactoe-cell"
          >
            {square}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
