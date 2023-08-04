import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";

function CreateTeam() {

    const navigate = useNavigate();
    const [teamName, setTeamname] = useState("");
    const userEmail=localStorage.getItem("email");

    const handleSubmit = async () => {
        const teamData = {
            "UserEmail": userEmail,
            "TeamName": teamName,
            "UserRole": "Admin"
        }
        try {
            const response = await axios.post("https://lffl4ynmg7.execute-api.us-east-1.amazonaws.com/prod", teamData);
            if (response.data.status === 'success') {
                alert("Team has been created! Redirecting to Manage Team page");
                navigate(`/team/manage/${teamName}`, { state: { teamName } });
            } else {
                alert("Team Creation Failed.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-3xl mb-4">Create Team</div>
                    <TextField
                        className="mb-4"
                        label="Team Name"
                        variant="outlined"
                        value={teamName}
                        onChange={(input) => {
                            setTeamname(input.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleSubmit}
                    >
                        Create Team
                    </button>
                </div>
            </div>
        </div>
    )    
}

export default CreateTeam;