import { colors } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";


const Leaderboard = ({ gamename, list }) => {
  // Get the top 3 positions from the list or fill with empty strings if list is empty or less than 3 elements
  const positions = list.map((item) => item.teamid);
  const [heights, setHeights] = useState([100, 200, 150]);
  const colors = ["#cd7f32", "#FFD700", "#c0c0c0"];
const numbers=[3,1,2];
 

return (
    <div className="mt-8 w-full mx-auto bg-[#f9f9f9] px-6 py-7 rounded-xl flex justify-center">
      <div className=" ">
        <h1 className="text-center text-3xl font-semibold ">{gamename} Leaderboard</h1>
        <div className="flex items-end mt-9">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mx-3">
              <div className="flex justify-center">
                <Box
                  height={heights[index]}
                  color={colors[index]}
                  index={index}
                  className="text-xl font-bold pt-5"
                >
                  {numbers[index]}
                </Box>
              </div>
              <h2 className="text-center truncate ">{positions[numbers[index]-1] || "-"}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Box = styled.div`
  width: 100px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: white;
  margin: 10px 0px;

  animation: Leaderboard-animation 2s ease-in-out;

  @keyframes Leaderboard-animation {
    0% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;

export default Leaderboard;