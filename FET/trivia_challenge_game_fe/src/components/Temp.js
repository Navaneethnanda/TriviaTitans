import { colors } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Temp = ({gamename,list}) => {
  const positions = [3,1,2];
  const [heights, setHeights] = useState([100, 200, 150]);
  const colors=["#cd7f32","#FFD700","#c0c0c0"]

  const handleClick = (position) => {
    const newHeights = [...heights];
    newHeights[position - 1] = 200;
    setHeights(newHeights);
  };
 
  return (
    <div className="mt-8 w-3/4 mx-auto bg-[#f9f9f9] px-6 py-7 rounded-xl flex justify-center">
    <div className=" ">
      <h1 className="text-center text-3xl font-semibold ">gamename Leaderboard</h1>
      <div className="flex items-end  mt-4">
        {positions.map((position, index) => (
          <div className="mx-3">
          <div className="flex justify-center">

          <Box
            key={position}
            height={heights[index]}
            color={colors[index]}
            onClick={() => handleClick(position)}
            index={index}
           className="text-xl font-bold pt-5">
            {position}
          </Box>
          </div>
          <h2 className="text-center   truncate ">{position}</h2>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const Box = styled.div` 
  width: 100px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: white;
  margin: 10px 0px;
  

  animation: Temp-animation 2s ease-in-out ;

  @keyframes Temp-animation {
    0% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }


`;

export default Temp;
