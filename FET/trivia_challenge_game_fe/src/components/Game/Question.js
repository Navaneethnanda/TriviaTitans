// Question.js
import React, { useState } from "react";

const Question = ({
  question,
  currentQuestionIndex,
  handleAnswer,
  isSubmitted,
}) => {


  const [timeLeft, setTimeLeft] = useState(120);
  
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
                disabled={isSubmitted}
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
                disabled={isSubmitted}
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
                disabled={isSubmitted}
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
                disabled={isSubmitted}
                className="mr-2"
              />
              {question.Option4}
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Question;
