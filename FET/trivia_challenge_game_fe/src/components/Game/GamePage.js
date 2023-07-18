import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function GamePage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [gameId] = useState("7438791d-10b5-410a-b2d8-ca8114ddcc24"); // Replace with the actual game ID
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const filteredArray = allData.filter((item) => item.GameId === gameId);
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
      setTimeLeft(20);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleSubmit = () => {
    // Handle submit logic
    console.log("Selected Answers:", selectedAnswers);
    setIsSubmitted(true);
  };

  if (allQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="mt-4">Quiz Game</h1>
      <p>Time Left: {timeLeft} seconds</p>
      <Row className="justify-content-center">
        <Col xs={20} md={18} lg={50}>
          <Card className="text-center">
            <Card.Header>
              <h5>Question {currentQuestionIndex + 1}</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>{currentQuestion.Question}</Card.Text>
              <Card.Text>Category: {currentQuestion.Category}</Card.Text>
              <Card.Text>Difficulty: {currentQuestion.Difficulty}</Card.Text>
              <ul className="list-unstyled">
                <li>
                  <label>
                    <input
                      type="radio"
                      name={currentQuestion.Id}
                      value={currentQuestion.Option1}
                      onChange={() =>
                        handleAnswer(
                          currentQuestion.Id,
                          currentQuestion.Option1
                        )
                      }
                      disabled={isSubmitted}
                    />
                    Option 1: {currentQuestion.Option1}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={currentQuestion.Id}
                      value={currentQuestion.Option2}
                      onChange={() =>
                        handleAnswer(
                          currentQuestion.Id,
                          currentQuestion.Option2
                        )
                      }
                      disabled={isSubmitted}
                    />
                    Option 2: {currentQuestion.Option2}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={currentQuestion.Id}
                      value={currentQuestion.Option3}
                      onChange={() =>
                        handleAnswer(
                          currentQuestion.Id,
                          currentQuestion.Option3
                        )
                      }
                      disabled={isSubmitted}
                    />
                    Option 3: {currentQuestion.Option3}
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name={currentQuestion.Id}
                      value={currentQuestion.Option4}
                      onChange={() =>
                        handleAnswer(
                          currentQuestion.Id,
                          currentQuestion.Option4
                        )
                      }
                      disabled={isSubmitted}
                    />
                    Option 4: {currentQuestion.Option4}
                  </label>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {isSubmitted ? (
        <Button variant="secondary" disabled>
          Next
        </Button>
      ) : (
        <Button variant="primary" onClick={handleNextQuestion}>
          Next
        </Button>
      )}
      {isSubmitted && (
        <Button variant="success" onClick={handleSubmit} disabled>
          Submit
        </Button>
      )}
    </Container>
  );
}

export default GamePage;
