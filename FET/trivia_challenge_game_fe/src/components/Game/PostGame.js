import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import Leaderboard from "./LearderBoard";

const PostGame = () => {
    const location = useLocation();

    const { id } = useParams();
    const allQuestions = location.state?.allQuestions;
    const selectedAnswers = location.state?.selectedAnswers;
    const [dashboardList, setDashboardList] = useState([]);
    const [gamename,setGameName]=useState("Game");

    const fetchDashboardData = async () => {
        try {
            const response = await axios.post(
                "  https://1wxmtoxiab.execute-api.us-east-1.amazonaws.com/dev/dashboard"
                , { "gameid": id });
            console.log("dsfsdfsdfsdf", response.data.body);
            setDashboardList(response.data.body);
            if(response.data.body ){
                setGameName(response.data.body[0].gamename)
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => { fetchDashboardData(); }, []);

    return (
        <div className="mt-8 w-3/4 mx-auto bg-[#f9f9f9] px-6 py-7 rounded-xl">

            <Leaderboard gamename={gamename} list={dashboardList} />
            <h1 className="text-2xl font-semibold mb-4">{allQuestions? "Results":""}</h1>
            {allQuestions?allQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.Id];
                const isAnswered = userAnswer !== undefined;

                return (
                    <div key={question.Id} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Question {index + 1}:</h2>
                        <p>{question.Question}</p>
                        <div className="mt-2">
                            {isAnswered ? (
                                <>
                                    <p className="font-semibold">Your Answer: {userAnswer}</p>
                                    <p className="font-semibold">Correct Answer: {question.Answer}</p>
                                    {userAnswer === question.Answer ? (
                                        <p className="text-green-600">You got it right!</p>
                                    ) : (
                                        <p className="text-red-600">You got it wrong!</p>
                                    )}
                                </>
                            ) : (
                                <p className="text-red-600">You didn't answer this question.</p>
                            )}
                        </div>
                    </div>
                );
            }):""}
        </div>
    );

};

export default PostGame;
