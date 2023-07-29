import React, { useState, useEffect } from "react";

const Question = ({ question,currentQuestionIndex,handleAnswer,isSubmitted}) => {


  const [timeLeft, setTimeLeft] = useState(20); // Set time for each question (in seconds)
  const [saveStatus,setSaveStatus]=useState("save");
  const [saveFlag,setSaveFlag]=useState(false);


  const handlesave=()=>{
    setSaveStatus("...saving");
    setTimeout(()=>{setSaveStatus("saved");setSaveFlag(true);},1000);
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 ) {
        setTimeLeft( timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  return (
    <div className="w-full md:w-[80%] mt-4">
      <div className="bg-white shadow-md rounded-lg px-14 py-6">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold">Quiz Game</h1>
          <p>Time Left: {timeLeft} seconds</p>
        </div>
        <h5 className="mb-2 text-lg font-semibold">
          Question {currentQuestionIndex + 1}
        </h5>
        <p className="mb-1">Category: {question.Category}</p>
        <p className="mb-1">Difficulty: {question.Difficulty}</p>
        <p className="mb-2 font-bold mt-4">{question.Question}</p>

        <ul className="list-unstyled mt-3">
          <li className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.Id}
                value={question.Option1}
                onChange={() => handleAnswer(question.Id, question.Option1)}
                disabled={saveFlag}
                className="mr-2"
              />
              {question.Option1}
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.Id}
                value={question.Option2}
                onChange={() => handleAnswer(question.Id, question.Option2)}
                disabled={saveFlag}
                className="mr-2"
              />
              {question.Option2}
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.Id}
                value={question.Option3}
                onChange={() => handleAnswer(question.Id, question.Option3)}
                disabled={saveFlag}
                className="mr-2"
              />
              {question.Option3}
            </label>
          </li>
          <li className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={question.Id}
                value={question.Option4}
                onChange={() => handleAnswer(question.Id, question.Option4)}
                disabled={saveFlag}
                className="mr-2"
              />
              {question.Option4}
            </label>
          </li>
        </ul>


    
          
          <button
            className="px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={handlesave}>
            {saveStatus}
          </button>
       
      </div>
    </div>
  );
};

export default Question;
