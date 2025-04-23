import React, { useState, useEffect } from 'react';
import './Classic.css';

function ClassicApp() {
  const WORD_LENGTH = 5;
  const MAX_ATTEMPTS = 6;
  const WORDS = ['REACT', 'WORLD', 'HELLO', 'CODER', 'CLONE', 'LOGIC', 'STYLE'];
  
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length === WORD_LENGTH) {
        checkGuess();
      } else {
        setMessage('Word too short');
        setTimeout(() => setMessage(''), 1000);
      }
      return;
    }

    if (key === 'DELETE') {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const checkGuess = () => {
    if (currentGuess === targetWord) {
      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess;
      setGuesses(newGuesses);
      setGameOver(true);
      setMessage('You won!');
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);
    setCurrentGuess('');
    setCurrentRow(currentRow + 1);

    if (currentRow + 1 === MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`Game over! The word was ${targetWord}`);
    }
  };

  const getLetterColor = (row, col) => {
    if (row >= currentRow) return '';

    const letter = guesses[row][col];
    if (!letter) return '';

    if (targetWord[col] === letter) {
      return 'correct';
    } else if (targetWord.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  const getKeyColor = (key) => {
    if (!targetWord) return '';

    for (let row = 0; row < currentRow; row++) {
      const guess = guesses[row];
      for (let col = 0; col < guess.length; col++) {
        if (guess[col] === key) {
          if (targetWord[col] === key) {
            return 'correct';
          } else if (targetWord.includes(key)) {
            return 'present';
          } else {
            return 'absent';
          }
        }
      }
    }
    return '';
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ];

  return (
    <div className="wordle-app">
      <h1>Wordle Clone</h1>
      {message && <div className="message">{message}</div>}
      
      <div className="board">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, col) => {
              const letter = row === currentRow && col < currentGuess.length 
                ? currentGuess[col] 
                : row < currentRow && guesses[row]?.[col] || '';
              const color = row < currentRow ? getLetterColor(row, col) : '';
              
              return (
                <div key={col} className={`cell ${color}`}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              const keyColor = getKeyColor(key);
              return (
                <button
                  key={key}
                  className={`key ${keyColor} ${key.length > 1 ? 'wide-key' : ''}`}
                  onClick={() => handleKeyPress(key)}
                >
                  {key === 'DELETE' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassicApp;