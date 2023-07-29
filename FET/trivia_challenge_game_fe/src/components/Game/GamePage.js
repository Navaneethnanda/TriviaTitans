// GamePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useLocation } from "react-router-dom";
import Chat from "./Chat";
import Question from "./Question";

function GamePage() {
  const location = useLocation();
  const [allQuestions, setAllQuestions] = useState([]);
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chat, setChat] = useState(true);
  const team=location.state?.team;
  
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !isSubmitted) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else if (timeLeft === 0 && !isSubmitted) {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions"
      );
      const allData = response.data.value;
      const filteredArray = allData.filter((item) => item.GameId === id);
      setAllQuestions(filteredArray);
    } catch (error) {
      console.error("Failed to fetch trivia questions:", error);
    }
  };

  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(120);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleSubmit = () => {
    // Handle submit logic
    console.log("Selected Answers:", selectedAnswers);
    setIsSubmitted(true);
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center">
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

      {allQuestions.length === 0 ? (
        <p>Loading questions...</p>
      ) : currentQuestion ? (
        <Question
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswer={handleAnswer}
          isSubmitted={isSubmitted}
        />
      ) : (
        <p>No questions available for this game ID.</p>
      )}
      {isSubmitted ? (
        <button
          className="px-4 py-2 mt-4 bg-gray-400 rounded-lg cursor-not-allowed"
          disabled
        >
          Next
        </button>
      ) : (
        <button
          className="px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      )}
      {isSubmitted && (
        <button
          className="px-4 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          onClick={handleSubmit}
          disabled
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default GamePage;
