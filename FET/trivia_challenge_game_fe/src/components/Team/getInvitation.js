import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function Invitation() {

    const {teamname, inviter} = useParams();
    const decodedInviterEmail = decodeURIComponent(inviter);
    const userEmail=localStorage.getItem("email");

    const handleAccept = async () => {
        const acceptData = {
            "TeamName": teamname,
            "Inviter": decodedInviterEmail,
            "Invitee": userEmail
        }
        try{
            const response = await axios.post("https://mcfn0zybr4.execute-api.us-east-1.amazonaws.com/prod", acceptData);
            console.log(response.data)
            if(response.data.status === 'success') {
                alert("You have accepted the invitaiton! Please close this window.");
            } else {
                alert(inviter)
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    const handleReject = async () => {
        const rejectData = {
            "TeamName": teamname,
            "Inviter": decodedInviterEmail,
            "Invitee": userEmail
        }
        try{
            const response = await axios.post("https://mqa4dh0qld.execute-api.us-east-1.amazonaws.com/prod", rejectData);
            if(response.data.status === 'success') {
                alert("You have rejected the invitaiton! Please close this window.");
            } else {
                alert("Error in rejecting invitation.")
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] margin top mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-3xl">You have been invited to a team!</div>
                    <button
                        className="bg-green-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleReject}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Invitation;