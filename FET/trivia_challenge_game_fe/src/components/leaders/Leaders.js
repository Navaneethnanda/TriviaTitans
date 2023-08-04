import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaders() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("all-time");

  useEffect(() => {
    fetchLeaderboardData();
    transferDataTOFireStore();
  }, [timeFrame]);

  const transferDataTOFireStore = async () => {
    axios
      .post(
        "https://us-east1-aerial-sandbox-386517.cloudfunctions.net/GameDataTransfer"
      )
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error saving data:", error);
      });
  };

  const fetchLeaderboardData = async () => {
    try {
      // Replace 'LEADERBOARD_API_URL' with the actual API endpoint for fetching leaderboard data
      const response = await axios.get(
        `LEADERBOARD_API_URL?timeFrame=${timeFrame}`
      );
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
    }
  };

  const handleTimeFrameChange = (selectedTimeFrame) => {
    setTimeFrame(selectedTimeFrame);
  };

  return (
    <div className="bg-white w-3/4 mx-auto px-5 mt-6">
      <div className="container mx-auto p-4">
        <h1 className="mt-4 text-3xl font-bold text-center ">
          Global Leaderboard
        </h1>

        <iframe
          width="900"
          height="750"
          src="https://lookerstudio.google.com/embed/reporting/8709c497-28a4-4efb-b9df-fd00773456e7/page/GP2YD"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Leaders;
