import React from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function GameDetailsPage() {
  const location = useLocation();
  const activeGame = location.state?.game;

  const handleJoinGame = async (game) => {
    console.log('User joined the game:', game);

    try {
      await axios.post(`/join/${game.Id}`);
      console.log('User joined the game successfully');
      // Redirect the user to the game page or display a confirmation message
    } catch (error) {
      console.error('Failed to join the game:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  if (!activeGame) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="game-details card">
        <h2>{activeGame.GameName}</h2>
        <p>Category: {activeGame.Category}</p>
        <p>Difficulty: {activeGame.Difficulty}</p>
        <p>Start Time: {activeGame.StartTime}</p>
        {/* <Link to="/lobby" className="btn btn-primary btn-sm float-end">
          Go Back
        </Link> */}
        <button className="btn btn-primary" onClick={() => handleJoinGame(activeGame)}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default GameDetailsPage;
