import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";

function InviteMember() {

    const navigate = useNavigate();
    const location = useLocation();
    const teamName = location.state.teamName
    const [invitee, setInvitee] = useState("");
    const userEmail=localStorage.getItem("email");

    const handleSubmit = async () => {
        const inviteData = {
            "Inviter": userEmail,
            "TeamName": teamName,
            "Invitee": invitee
        }
        try {
            const response = await axios.post("https://90oijvfggh.execute-api.us-east-1.amazonaws.com/prod", inviteData);
            if (response.data.status === 'success') {
                alert("Invite email sent! Redirecting to Manage Team page");
                navigate(`/team/manage/${teamName}`, { state: { teamName } });
            } else {
                alert("Unable to send invite.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-3xl mb-4">Invite Member</div>
                    <TextField
                        className="mb-4"
                        label="Invitee"
                        variant="outlined"
                        value={invitee}
                        onChange={(input) => {
                            setInvitee(input.target.value)
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleSubmit}
                    >
                        Send Invite
                    </button>
                </div>
            </div>
        </div>
    )    
}

export default InviteMember;