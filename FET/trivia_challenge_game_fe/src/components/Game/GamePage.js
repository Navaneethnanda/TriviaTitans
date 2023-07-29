import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import Question from "./Question";
import Modal from "react-modal";

function GamePage() {
  // Time configuration for question and break time
  const questiontime = 2; // Time for each question in seconds
  const breaktime = 1; // Break time between questions in seconds
const navigate=useNavigate();
  const location = useLocation();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questiontime);
  const [breakTime, setBreakTime] = useState(breaktime);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chat, setChat] = useState(true);
  const team = location.state?.team;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [submitButton,setSubmitButton]=useState("submit");



  // Fetch data for the selected game ID from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions"
      );
      const allData = response.data.value;
      const filteredArray = allData.filter((item) => item.GameId === id);
      setAllQuestions(filteredArray);
      setQuestionCount(filteredArray.length);
      if(filteredArray.length==0){
        alert("!!!!no questions associated with the quiz are found please contact the administrator. Heading back to lobby");

        navigate("/lobby");

        // setTimeout(() => {
        // }, 2000);
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
    const timer = setInterval(() => {
      if (!isBreakTime) {
        console.log("questionview")
        // During question time
        if (timeLeft > 0 && !isSubmitted) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else if (timeLeft === 0 && !isSubmitted) {
          // When the time for a question is up
          setIsBreakTime(true); // Set break time to true
          setTimeLeft(breakTime); // Set time for the break
        }
        else if(timeLeft === 0 && isSubmitted) {
          handleSubmit();
        }
      } else {

        console.log("breeak view")
        // During break time
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          setIsBreakTime(false); // Reset break time to false
          handleNextQuestion(); // Move to the next question
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreakTime, isSubmitted, timeLeft, breakTime]);




  // Handle user selected answers for a question
  const handleAnswer = (questionId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
    // console.log(selectedAnswers);
  };





  // Move to the next question
  const handleNextQuestion = () => {
    console.log(isSubmitted,"handle next question",currentQuestionIndex);
    if (currentQuestionIndex+1 < allQuestions.length - 1) {

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(questiontime); // Set time for the next question
      
    } else{
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);  
      setIsSubmitted(true); // If all questions are answered, set submission to true
    }
  };

  const handleSubmit = () => {
    // Handle submit logic
    console.log("Selected Answers:", selectedAnswers);
    setSubmitButton("submitted");
    setTimeout(() => {
    
    }, 1000);
  };

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
        </div>
      ) : (
        <Question
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswer={handleAnswer}
          isSubmitted={isSubmitted}
        />
      )}

      {/* questions section */}



      {/* Display submit button when all questions are answered */}
      {isSubmitted && (
        <button
          className="px-4 py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          onClick={handleSubmit}
          disabled
        >
          {submitButton}
        </button>
      )}

      
    </div>
  );
}

export default GamePage;
