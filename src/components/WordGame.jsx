import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

// Organized word list with categories
const WORD_CATEGORIES = {
  'Programming': ['REACT', 'JAVASCRIPT', 'PYTHON', 'CODE', 'DEVELOPER', 'FUNCTION', 'VARIABLE'],
  'Animals': ['LION', 'TIGER', 'ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO'],
  'Food': ['PIZZA', 'BURGER', 'SUSHI', 'PASTA', 'COOKIE', 'DONUT', 'SANDWICH'],
  'Sports': ['SOCCER', 'TENNIS', 'BASKETBALL', 'FOOTBALL', 'HOCKEY', 'BASEBALL', 'VOLLEYBALL'],
  'Colors': ['BLUE', 'GREEN', 'PURPLE', 'YELLOW', 'ORANGE', 'WHITE', 'BLACK']
};

const MAX_TRIES = 6;

const WordGame = () => {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingTries, setRemainingTries] = useState(MAX_TRIES);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Pick random category and word
    const categories = Object.keys(WORD_CATEGORIES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = WORD_CATEGORIES[randomCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    setWord(randomWord);
    setCategory(randomCategory);
    setGuessedLetters(new Set());
    setRemainingTries(MAX_TRIES);
    setGameStatus('playing');
  };

  const getMaskedWord = () => {
    return word
      .split('')
      .map(letter => guessedLetters.has(letter) ? letter : '_')
      .join(' ');
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newTries = remainingTries - 1;
      setRemainingTries(newTries);
      
      if (newTries === 0) {
        setGameStatus('lost');
      }
    } else {
      const isComplete = word
        .split('')
        .every(letter => newGuessedLetters.has(letter));
      
      if (isComplete) {
        setGameStatus('won');
      }
    }
  };

  const getKeyboardLetters = () => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  };

  return (
    <div className="word-container">
      <div className="word-header">
        <h2>Word Guessing Game</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>Tries left: {remainingTries}</div>
          <button onClick={initializeGame} className="reset-button">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <div className="category-hint">
        Category: {category}
      </div>

      <div className="word-display">
        {getMaskedWord()}
      </div>

      <div className="word-length-hint">
        Word length: {word.length} letters
      </div>

      {gameStatus !== 'playing' && (
        <div className={`status-message ${
          gameStatus === 'won' ? 'win-message' : 'lose-message'
        }`}>
          {gameStatus === 'won' 
            ? 'Congratulations! You won!' 
            : `Game Over! The word was: ${word}`
          }
        </div>
      )}

      <div className="keyboard-grid">
        {getKeyboardLetters().map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
            className={`keyboard-button ${
              guessedLetters.has(letter)
                ? word.includes(letter)
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordGame;
