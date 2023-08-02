import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SelectTeam() {

    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const userEmail=localStorage.getItem("email");

    useEffect(() => {
        const userData = {
            "UserEmail": userEmail
        }
        const fetchTeams = async () => {
            try {
                const response = await axios.post("https://s1hy3ogy5d.execute-api.us-east-1.amazonaws.com/prod", userData);
                setTeams(response.data.Teams);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeams();
    }, [])

    const handleTeamSelect = (teamName) => {
        navigate(`/team/manage/${teamName}`, { state: { teamName } });
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-3xl mb-4">Select Team</div>
                    {teams.map((team, index) => (
                        <button 
                            key={index}
                            className="text-blue-500 mb-2"
                            onClick={() => handleTeamSelect(team)}
                        >
                            {team}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectTeam;
