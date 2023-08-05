import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function GameDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeGame = location.state?.game;
  const [teamList, setTeamList] = useState(['none']);
  const [team, setTeam] = useState('none');
  const [active, setActive] = useState(true);
  const gameStartDate = activeGame?.StartDate;
  const gamestartTime = activeGame?.StartTime;

  console.log(gameStartDate);
  console.log(gamestartTime);



  // for letting user access the game  only if time now is less than 10 minutes form quizstart time
  useEffect(() => {
    if (compareDates(gameStartDate) === 0) {
      if (compareTime(gamestartTime) === 0) {
        setActive(true);
        console.log(compareDates(gameStartDate) === 0, compareTime(gamestartTime) === 0)
      } else {
        setActive(false);
        console.log(compareDates(gameStartDate) === 0, compareTime(gamestartTime) === 0)
      }
    } else {
      setActive(false);
      console.log(compareDates(gameStartDate) === 0, compareTime(gamestartTime) === 0, (new Date()).getTime())
    }
  }, [])



// Helper function to compare dates
  function compareDates(date1) {
    const date1Object = new Date(date1);
    const date2Object = new Date();

    if (date1Object.setHours(0, 0, 0, 0) === date2Object.setHours(0, 0, 0, 0)) {
      return 0; // Dates are equal
    } else if (date1Object.getTime() > date2Object.getTime()) {
      return 1; // date1 is later than date2
    } else {
      return -1; // date1 is earlier than date2
    }
  }

  function compareTime(givenTime) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const [givenHours, givenMinutes] = givenTime.split(":");
    const parsedGivenHours = parseInt(givenHours);
    const parsedGivenMinutes = parseInt(givenMinutes);

    if (currentHours === parsedGivenHours && currentMinutes - parsedGivenMinutes >= 0 && currentMinutes - parsedGivenMinutes <= 10) {
      return 0; // Times are equal
    } else if (currentHours > parsedGivenHours || (currentHours === parsedGivenHours && currentMinutes > parsedGivenMinutes)) {
      return 1; // Given time is in the past (before current time)
    } else {
      return -1; // Given time is in the future (after current time)
    }
  }

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const getTeamsData = {
      "UserEmail": userEmail
    }
    // Simulating API call to fetch teamList (uncomment the actual API call if needed)
    // Reference: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
    
    axios.post('https://s1hy3ogy5d.execute-api.us-east-1.amazonaws.com/prod', getTeamsData)
      .then(response => {
        console.log(response.data.Teams)
        setTeamList(response.data.Teams);
      })
      .catch(error => {
        console.error('Failed to fetch team list:', error);
      });

    // Simulating static team list for demonstration
    // setTeamList(["none", "dal Gladiators", "dal player", "halifax heros"]);
  }, []);

  const handleJoinGame = async (game) => {
    if (team === "none") {
      alert("Select a team to participate");
      return;
    }

    try {
      navigate(`/game/${game.Id}`, { state: { team, time: gamestartTime, date: gameStartDate, gameName: game.GameName } });
      // Redirect the user to the game page or display a confirmation message
    } catch (error) {
      console.error('Failed to join the game:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  const handleInviteTeam = async () => {
    const userEmail = localStorage.getItem("email");
    if (team === "none") {
      alert("Select a team to participate");
    } else {
      try {
        const joinGameData = {
          "TeamName": team,
          "GameName": activeGame.GameName,
          "Inviter": userEmail
        }
        const response = await axios.post("https://i8g2i9qqic.execute-api.us-east-1.amazonaws.com/prod", joinGameData);
        if (response.data.status === 'success') {
          alert(response.data.message);
        } else {
          alert("Unable to send game invite email.")
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (!activeGame) {
    return <div>Loading...</div>;
  }

  const isDropdownEmpty = teamList.length === 0;
  const joinButtonDisabled = isDropdownEmpty || !active;


  return (
    <div className="mt-8 w-3/4 mx-auto bg-[#f9f9f9] px-6 py-7 rounded-xl ">
      <div className="flex items-center justify-center ">
        {active ? (
          <div className="px-4 py-2 bg-green-500 rounded-md text-white font-bold">
            Game is Active
          </div>
        ) : (
          <div className="px-4 py-2 bg-red-500 rounded-md text-white font-bold">
            Game is Inactive
          </div>
        )}
      </div>
      <div className="flex   justify-between  rounded-xl items-center">
        <div className="">
          <h2 className="my-4 text-2xl font-semibold ">{activeGame.GameName}</h2>
          <p> <span className="font-bold text-lg ">Category: </span>
            {activeGame.Category}</p>
          <p> <span className="font-bold text-lg ">Difficulty: </span>
            {activeGame.Difficulty}</p>
          <p> <span className="font-bold text-lg ">Start date:  </span>
            {activeGame.StartDate ? activeGame.StartDate : ""}</p>
          <p> <span className="font-bold text-lg ">Start Time:  </span>
            {activeGame.StartTime}</p>

          <div>
            <button
              className={`bg-[#c1282e] text-white font-semibold font-serif rounded-xl px-5 py-3 mt-3 ${joinButtonDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleJoinGame(activeGame)}
              disabled={joinButtonDisabled}
              style={{ filter: joinButtonDisabled ? 'grayscale(0.9)' : 'none' }}
            >
              Join Game
            </button>
          </div>

          <div>
            <button
              className={`bg-[#c1282e] text-white font-semibold font-serif rounded-xl px-5 py-3 mt-3 ${joinButtonDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleInviteTeam()}
              disabled={joinButtonDisabled}
              style={{ filter: joinButtonDisabled ? 'grayscale(0.9)' : 'none' }}
            >
              Invite Team
            </button>
          </div>

        </div>
        <div>
          <label className="block text-center">Select the team <span className="text-red-700 text-2xl font-bold">*</span></label>
          <select
            className="mt-1 px-5 py-3 bg-[#f9f9f9] border rounded-xl"
            value={team}
            onChange={(e) => { setTeam(e.target.value); }}
            disabled={joinButtonDisabled}
          >
            {teamList.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default GameDetailsPage;
