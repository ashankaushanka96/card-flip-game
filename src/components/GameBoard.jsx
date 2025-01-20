import React, { useState, useEffect } from 'react';
import NumberBox from './NumberBox';
import ResetButton from './ResetButton';
import CongratulationsModal from './CongratulationsModal';

const GameBoard = () => {
  const [boxCount, setBoxCount] = useState(12); // Default number of boxes
  const [numbers, setNumbers] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [expectedNumber, setExpectedNumber] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [wrongIndex, setWrongIndex] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false); // Track game completion

  useEffect(() => {
    setNumbers(generateShuffledNumbers(boxCount));
    setRevealed(Array(boxCount).fill(false));
  }, [boxCount]);

  // Generate shuffled numbers
  const generateShuffledNumbers = (count) => {
    const nums = Array.from({ length: count }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  };

  const handleBoxClick = (index) => {
    const chosenNumber = numbers[index];

    if (chosenNumber === expectedNumber) {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      setExpectedNumber((prev) => prev + 1);

      // Check if the game is completed
      if (expectedNumber === boxCount) {
        setIsCompleted(true); // Show congratulations modal
      }
    } else {
      setAttempts((prev) => prev + 1);
      setWrongIndex(index); // Highlight wrong card
      setTimeout(() => {
        setWrongIndex(null); // Clear wrong highlight
        setRevealed(Array(boxCount).fill(false)); // Reset all cards
        setExpectedNumber(1); // Reset sequence
      }, 1000); // Delay to show wrong card
    }
  };

  const resetGame = () => {
    setNumbers(generateShuffledNumbers(boxCount));
    setRevealed(Array(boxCount).fill(false));
    setExpectedNumber(1);
    setAttempts(0);
    setWrongIndex(null);
    setIsCompleted(false); // Hide congratulations modal
  };

  const handleBoxCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setBoxCount(newCount);
    resetGame();
  };

  return (
    <div className="game-container">
      <h1 className="title">Card Flip Game</h1>
      <p className="instructions">Click the cards in ascending order!</p>
      <div className="settings">
        <label htmlFor="boxCount">Number of Boxes:</label>
        <select id="boxCount" value={boxCount} onChange={handleBoxCountChange}>
          {Array.from({ length: 16 }, (_, i) => i + 1).map(
            (count) =>
              count > 1 && (
                <option key={count} value={count}>
                  {count}
                </option>
              )
          )}
        </select>
      </div>
      <div className="grid">
        {numbers.map((number, index) => (
          <NumberBox
            key={index}
            number={number}
            isRevealed={revealed[index]}
            isWrong={wrongIndex === index}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <div className="footer">
        <ResetButton onReset={resetGame} />
        <p className="attempts">Wrong Attempts: {attempts}</p>
      </div>
      {isCompleted && <CongratulationsModal onReset={resetGame} attempts={attempts} />}
    </div>
  );
};

export default GameBoard;
