import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";

function ManageTeam() {

    const navigate = useNavigate();
    const location = useLocation();
    const teamName = location.state.teamName;
    const [teamData, setTeamData] = useState([]);
    const userEmail=localStorage.getItem("email");

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.post("https://vc14jrysjl.execute-api.us-east-1.amazonaws.com/prod", { "TeamName": teamName });
                setTeamData(response.data.Data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeamData();
    }, [teamName])

    const handleRoleChange = (index, event) => {
        const newTeamData = [...teamData];
        newTeamData[index].UserRole = event.target.value;
        setTeamData(newTeamData);
    }

    const handleSubmit = async () => {
        const dataToSubmit = {
            TeamName: teamName,
            UserRoles: teamData.map(member => ({ UserEmail: member.UserEmail, UserRole: member.UserRole }))
        };

        try {
            const response = await axios.post("https://0ffei9xb90.execute-api.us-east-1.amazonaws.com/prod", dataToSubmit);
            if (response.data.status === "success") {
                alert("Changes have been saved!");
            } else {
                alert("Changes were not saved. Please try again!")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLeave = async () => {
        const leaveData =  {
            "UserEmail": userEmail,
            "TeamName": teamName
        }

        try {
            const response = await axios.post("https://akwshyh2ka.execute-api.us-east-1.amazonaws.com/prod", leaveData);
            if (response.data.status === "success") {
                alert("You left the team! Redirecting you to profile page");
                navigate('/profile');
            } else {
                alert("Unable to leave team. Please try again!")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-3xl mb-4">{teamName}</div>
                    {teamData.map((member, index) => (
                        <div className="flex justify-between w-full mb-2" key={index}>
                            <span>{member.UserEmail}</span>
                            <TextField
                                value={member.UserRole}
                                variant="outlined"
                                onChange={(event) => handleRoleChange(index, event)}
                            />
                        </div>
                    ))}
                    <button
                        className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md mt-4"
                        onClick={handleSubmit}
                    >
                        Make Changes
                    </button>
                    <button
                        className="bg-green-500 text-white font-bold text-xl p-4 rounded-md mt-4"
                        onClick={() => navigate(`/team/${teamName}/invite`, { state: {teamName} })}
                    >
                        Invite User
                    </button>
                    <button
                        className="bg-red-500 text-white font-bold text-xl p-4 rounded-md mt-4"
                        onClick={handleLeave}
                    >
                        Leave Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManageTeam;
