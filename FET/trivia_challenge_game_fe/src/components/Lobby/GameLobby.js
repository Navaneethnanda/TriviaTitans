import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

function GameLobby() {
  const navigate = useNavigate();
  const [triviaGames, setTriviaGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');







  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("email",user.email);
        localStorage.setItem("username",user.displayName);
      } else {
        navigate("/login");
      }
    });
  }, []);




const startgame=(id)=>{
console.log(id);
navigate("/game/"+id)

};



  useEffect(() => {
    axios
      .get("https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games")
      .then((response) => {
        setTriviaGames(response.data.value);
        setFilteredGames(response.data.value);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const filteredByDifficulty = selectedDifficulty
      ? triviaGames.filter((game) => game.Difficulty === selectedDifficulty)
      : triviaGames;

    const filteredBySearchTerm = filteredByDifficulty.filter(
      (game) =>
        (game.GameName && game.Category) && (game.GameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.Category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredGames(filteredBySearchTerm);
  }, [selectedDifficulty, searchTerm, triviaGames]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleJoinGame = (game) => {
    console.log("User joined the game:", game);
    navigate("/gameDetails", { state: { game } });

    // Add your logic to handle the user joining the game
    // Redirect the user to the game page or display a confirmation message
  };

  return (
    <div className="container mx-auto pb-5">

      <div className="filters">
        <div className="filter-item mt-4">
          <label>
            Difficulty:
            <select
              className="ms-3"
              value={selectedDifficulty}
              onChange={handleFilterDifficulty}
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>

        
        <div className="filter-item search-item mt-4 mb-4">
          <label>
            Search:
            <input
              className="ms-3"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </label>
        </div>
      </div>
      <div className="games-container ">
        {filteredGames.map(game => (
          <div key={game.Id} className="game card">
            <div className="cardsBody">
              <h2 className="text-3xl font-bold font-">{game.GameName}</h2>
              <p><span className="font-bold text-lg ">Category: </span>{game.Category}</p>
              <p><span className="font-bold text-lg ">Difficulty: </span>{game.Difficulty}</p>
              <p><span className="font-bold text-lg ">Start Time: </span>{game.StartTime}</p>
              <button className="game-details-button " onClick={() => handleJoinGame(game)}>Game Details</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameLobby;
