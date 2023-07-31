import React from "react";
import { useNavigate } from "react-router-dom";

function TeamOptions() {

    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/team/create');
    }

    const handleManage = () => {
        navigate('/team/select-team')
    }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[640px] margin top mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
                <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-3xl">Team Options</div>
                    <button
                        className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleCreate}
                    >
                        Create Team
                    </button>
                    <button
                        className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md"
                        onClick={handleManage}
                    >
                        Manage Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeamOptions;