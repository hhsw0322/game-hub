import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import MemoryGame from './components/MemoryGame';
import WordGame from './components/WordGame';

function App() {
  const [currentGame, setCurrentGame] = useState('tic-tac-toe');

  const renderGame = () => {
    switch(currentGame) {
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'memory':
        return <MemoryGame />;
      case 'word':
        return <WordGame />;
      default:
        return <TicTacToe />;
    }
  };

  return (
    <div className="game-container">
      <header className="header">
        <h1>Game Hub</h1>
      </header>
      
      <div className="nav-buttons">
        <button 
          className={`nav-button ${currentGame === 'tic-tac-toe' ? 'active' : ''}`}
          onClick={() => setCurrentGame('tic-tac-toe')}
        >
          Tic Tac Toe
        </button>
        <button 
          className={`nav-button ${currentGame === 'memory' ? 'active' : ''}`}
          onClick={() => setCurrentGame('memory')}
        >
          Memory Game
        </button>
        <button 
          className={`nav-button ${currentGame === 'word' ? 'active' : ''}`}
          onClick={() => setCurrentGame('word')}
        >
          Word Game
        </button>
      </div>

      <div className="game-board">
        {renderGame()}
      </div>
    </div>
  );
}

export default App;
