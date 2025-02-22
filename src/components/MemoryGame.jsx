import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const CARD_PAIRS = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎧', '🎸'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (cardId) => {
    if (
      flipped.length === 2 || 
      flipped.includes(cardId) || 
      matched.includes(cardId)
    ) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-container">
      <div className="memory-header">
        <h2>Memory Game</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>Moves: {moves}</div>
          <button onClick={initializeGame} className="reset-button">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="status-message win-message">
          Congratulations! You won in {moves} moves!
        </div>
      )}

      <div className="memory-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`memory-card ${
              (flipped.includes(card.id) || matched.includes(card.id)) 
                ? 'flipped' 
                : ''
            }`}
            disabled={matched.includes(card.id)}
          >
            {(flipped.includes(card.id) || matched.includes(card.id)) 
              ? card.emoji 
              : '?'
            }
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
