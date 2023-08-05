import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import Question from "./Question";
import Modal from "react-modal";
import Leaderboard from "./LearderBoard";

function GamePage() {
  // Time configuration for question and break time
  const questiontime = 20; // Time for each question in seconds
  const breaktime = 10; // Break time between questions in seconds

  const navigate = useNavigate();
  const location = useLocation();
  const [allQuestions, setAllQuestions] = useState([]);
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questiontime);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chat, setChat] = useState(true);
  const team = location.state?.team;
  const startDate = location.state?.date;
  const startTime = location.state?.time;
  const gameName = location.state?.gameName;
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [submitButton, setSubmitButton] = useState("submit");
  const [dashboardList, setDashboardList] = useState([]);

  // Fetch data for the selected game ID from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions"
      );
      const allData = response.data.value;
      const filteredArray = allData.filter((item) => item.GameId === id);
      setAllQuestions(filteredArray);
      console.log("the question count is ", filteredArray.length);

      const timeRequired = filteredArray.length * questiontime + (filteredArray.length - 1) * breaktime;
      const gameStart = new Date(startDate);
      gameStart.setHours(startTime.split(":")[0]);
      gameStart.setMinutes(startTime.split(":")[1]);

      const timenow = new Date();
      let seconds = Math.round((timenow.getTime() - gameStart.getTime()) / 1000);
      if (seconds >= timeRequired) {
        alert(
          "!!!!   Quiz finshed go to dashboards !!!!!"
        );
        navigate("/lobby");

      }
      else {

        if (Math.floor(seconds / (questiontime + breaktime)) == filteredArray.length - 1) {
          setCurrentQuestionIndex(filteredArray.length - 1);
          setTimeLeft(questiontime - (seconds % (questiontime + breaktime)));
          setIsSubmitted(true);
        }
        else {
          const currentCycle = Math.floor(seconds / (questiontime + breaktime))
          if (seconds % (questiontime + breaktime) < questiontime) {
            setCurrentQuestionIndex(currentCycle);
            setIsBreakTime(false); // Set break time to true
            setTimeLeft(questiontime - (seconds % (questiontime + breaktime)));

          }
          else {
            setCurrentQuestionIndex(currentCycle);
            setIsBreakTime(true); // Set break time to true
            fetchDashboardData();
            setTimeLeft((questiontime + breaktime) - (seconds % (questiontime + breaktime)));
          }

        }

      }






      if (filteredArray.length === 0) {
        alert(
          "!!!!no questions associated with the quiz are found please contact the administrator. Heading back to lobby"
        );
        navigate("/lobby");
      }
    } catch (error) {
      console.error("Failed to fetch trivia questions:", error);
    }
  };

  // brings all the queswtions required for the gamme in the beginning of the game.
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (!isBreakTime) {
      console.log("question view");
      // During question time
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      } else if (timeLeft === 0 && !isSubmitted) {
        // When the time for a question is up
        setIsBreakTime(true); // Set break time to true
        fetchDashboardData();
        setTimeLeft(breaktime); // Set time for the break
      } else if (timeLeft === 0 && isSubmitted) {
        console.log("submitted");
        handleSubmit();
      }
    } else {
      console.log("break view");
      // During break time
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      } else {
        setIsBreakTime(false); // Reset break time to false
        handleNextQuestion(); // Move to the next question
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isBreakTime, isSubmitted]);

  // Handle user selected answers for a question
  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  // Move to the next question
  const handleNextQuestion = () => {
    console.log(isSubmitted, "handle next question", currentQuestionIndex);
    if (currentQuestionIndex + 1 < allQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(questiontime); // Set time for the next question
    } else if (currentQuestionIndex + 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(questiontime);
      setIsSubmitted(true); // If all questions are answered, set submission to true
    }
  };

  const handleSubmit = () => {
    // Handle submit logic
    console.log("Selected Answers:", selectedAnswers);
    setSubmitButton("submitting");
    setSubmitButton("submitted");
    console.log(allQuestions, selectedAnswers);
    navigate("/postgame/" + id, { state: { allQuestions, selectedAnswers,team } });
    // setTimeout(() => {

    // }, 3000);
  };


  const fetchDashboardData = async () => {
    try {
      const response = await axios.post(
        "  https://1wxmtoxiab.execute-api.us-east-1.amazonaws.com/dev/dashboard"
        , { "gameid": id });
      console.log("dsfsdfsdfsdf", response.data.body);
      setDashboardList(response.data.body);

    }
    catch (e) {
      console.log(e);
    }
  }



  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center">
      {/* Chat section */}
      <div
        className={
          "fixed bottom-4 right-4 p-3 text-xl rounded-lg transition-opacity duration-500 ease-in-out md:w-[40vw] xl:w-[30vw] " +
          (chat ? "opacity-0 hidden" : "opacity-100 block")
        }
      >
        <Chat chat={chat} setChat={setChat} id={team} />
      </div>
      <div
        className={
          "fixed bottom-4 right-4 bg-[#C1292E] p-3 transition-opacity duration-500 ease-in-out text-white font-bold text-xl rounded-full cursor-pointer " +
          (chat ? "opacity-100 block" : "opacity-0 hidden")
        }
        onClick={() => {
          setChat(!chat);
        }}
      >
        <p>Team Chat</p>
      </div>
      {/*chat section*/}

      {/* questions section */}
      {allQuestions.length === 0 ? (
        <p>Loading questions...</p>
      ) : isBreakTime ? (
        <div className="mt-8 w-3/4 mx-auto bg-[#f9f9f9] px-6 py-7 rounded-xl ">
          Your next question will be up in {timeLeft} seconds.
          <Leaderboard gamename={gameName} list={dashboardList} />




          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Question {currentQuestionIndex + 1}:</h2>
            <p>{allQuestions[currentQuestionIndex].Question}</p>
            <div className="mt-2">
              {selectedAnswers[allQuestions[currentQuestionIndex].Id]?(
                <div>
                  <p className="font-semibold">Your Answer: {selectedAnswers[allQuestions[currentQuestionIndex].Id]}</p>
                  <p className="font-semibold">Correct Answer: {allQuestions[currentQuestionIndex].Answer}</p>
                  {selectedAnswers[allQuestions[currentQuestionIndex].Id] === allQuestions[currentQuestionIndex].Answer ? (
                    <p className="text-green-600">You got it right!</p>
                  ) : (
                    <p className="text-red-600">You got it wrong!</p>
                  )}
                  
                </div>
              ) : (
                <p className="text-red-600">You didn't answer this question.</p>
              )}
              <p><span className="font-semibold text-lg"> Explanation : </span>{allQuestions[currentQuestionIndex].Explanation}</p>
            </div>
          </div>











        </div>
      ) : (
        <Question
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswer={handleAnswer}
          isSubmitted={isSubmitted}
          id={id}
          team={team}
          date={startDate}
          gameName={gameName}
          timeLeft={timeLeft}

        />
      )}
      {/* questions section */}

      {/* Display submit button when all questions are answered */}
      {isSubmitted && (
        <button
          className="px-4 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"
          onClick={handleSubmit}

        >
          {submitButton}
        </button>
      )}
    </div>
  );
}

export default GamePage;
