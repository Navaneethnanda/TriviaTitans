import axios from "axios";
import React, { useState } from "react";

const Question = ({ question, currentQuestionIndex, handleAnswer, id, team, date, gameName, timeLeft }) => {
  const [saveStatus, setSaveStatus] = useState("save");
  const [saveFlag, setSaveFlag] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handlesave = async () => {
    setSaveStatus("...saving");
    try {
      const payload = {
        "gameid": id,
        "teamid": team,
        "questionid": question.Id,
        "category": question.Category,
        "date": date,
        "gamename": gameName,
        "score": 0 + (selectedAnswer === question.Answer)
      };
      const response = await axios.post('https://1wxmtoxiab.execute-api.us-east-1.amazonaws.com/dev/', payload);
      setSaveStatus("answer locked");
      setSaveFlag(true);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className="w-full md:w-[80%] mt-4">
      <div className="bg-white shadow-md rounded-lg px-14 py-6">
        <div className="text-center mb-9">
          <h1 className="mt-4 text-3xl font-bold">Quiz Game</h1>
          <p>Time Left: {timeLeft} seconds</p>
          <p>* Don't forget to save your answer</p>
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
                onChange={() => { setSelectedAnswer(question.Option1); handleAnswer(question.Id, question.Option1); }}
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
                onChange={() => { setSelectedAnswer(question.Option2); handleAnswer(question.Id, question.Option2); }}
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
                onChange={() => { setSelectedAnswer(question.Option3); handleAnswer(question.Id, question.Option3); }}
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
                onChange={() => { setSelectedAnswer(question.Option4); handleAnswer(question.Id, question.Option4); }}
                disabled={saveFlag}
                className="mr-2"
              />
              {question.Option4}
            </label>
          </li>
        </ul>

        <div className="mt-3">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Hide Hint" : "Reveal Hint"}
          </button>
          {showHint && <p className="mt-2 font-semibold">Hint: {question.Hint}</p>}
        </div>

        <button
          className="px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={handlesave} disabled={saveFlag}
        >
          {saveStatus}
        </button>

     
      </div>
    </div>
  );
};

export default Question;
