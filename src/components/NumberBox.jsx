import React from 'react';

const NumberBox = ({ number, isRevealed, isWrong, onClick }) => {
  return (
    <div className="box-wrapper" onClick={onClick}>
      <div
        className={`box ${isRevealed ? 'flipped correct' : ''} ${
          isWrong ? 'flipped wrong' : ''
        }`}
      >
        <div className="front">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="svg-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v6.75m0 0H7.5m4.5 0h4.5M3.75 9a8.25 8.25 0 1116.5 0A8.25 8.25 0 013.75 9z"
            />
          </svg>
        </div>
        <div className="back">{number}</div>
      </div>
    </div>
  );
};

export default NumberBox;
