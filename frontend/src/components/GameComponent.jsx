import React, { useState } from 'react';
import LoaderComponent from './LoaderComponent';
import MapComponent from './MapComponent';
import NotificationContainer from './NotificationContainer';

const GameComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [scores, setScores] = useState([]);
  const [round, setRound] = useState(0);

  const handlePlaceGuess = (coords) => {
    setNotifications((prev) => [...prev, `Guess placed at ${coords}`]);
  };

  const handleSubmitGuess = (coords) => {
    setRound((prev) => prev + 1);
    setScores((prev) => [...prev, calculateScore(coords)]);
    setNotifications((prev) => [...prev, 'Guess submitted!']);
  };

  const calculateScore = (coords) => {
    // Placeholder score calculation
    return Math.random() * 100;
  };

  return (
    <div>
      <LoaderComponent />
      <NotificationContainer notifications={notifications} />
      <MapComponent onPlaceGuess={handlePlaceGuess} onSubmitGuess={handleSubmitGuess} />
      <div>
        Round: {round} | Scores: {scores.join(', ')}
      </div>
    </div>
  );
};

export default GameComponent;
