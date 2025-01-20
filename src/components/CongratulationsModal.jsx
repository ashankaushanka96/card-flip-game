import React from 'react';

const CongratulationsModal = ({ onReset, attempts }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 className="modal-title">🎉 Congratulations! 🎉</h1>
        <p className="modal-text">You completed the game with {attempts} wrong attempts!</p>
        <button className="reset-button" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
