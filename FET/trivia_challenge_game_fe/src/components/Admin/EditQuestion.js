import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function EditQuestion() {
  const navigate = useNavigate();

  const location = useLocation();
  const questionId = location.state;

  const [questionname, setQuestionName] = useState();
  const [option1, setoption1] = useState();
  const [option2, setoption2] = useState();
  const [option3, setoption3] = useState();
  const [option4, setoption4] = useState();
  const [answer, setAnswer] = useState();
  const [hint, setHint] = useState();
  const [gameId, setGameId] = useState();
  const [questioncategory, setQuestionCategory] = useState();
  const [questiondifficultylevel, setQuestionDifficultyLevel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataVal = {
          questionId: questionId,
        };

        const response = await axios.post(
          "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/question",
          dataVal
        );

        const editdata = response.data.value;
        setQuestionName(editdata.Question);
        setoption1(editdata.Option1);
        setoption2(editdata.Option2);
        setoption3(editdata.Option3);
        setoption4(editdata.Option4);
        setAnswer(editdata.Answer);
        setHint(editdata.Hint);
        setGameId(editdata.GameId);
        setQuestionCategory(editdata.Category);
        setQuestionDifficultyLevel(editdata.Difficulty);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categories = [
    "Arts and Culture",
    "History",
    "Modern Technology",
    "Movies, Books & TV-Shows",
    "Sport",
  ];

  const difficultylevel = ["Easy", "Medium", "Hard"];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setQuestionCategory(selectedCategory);
  };

  const handleDifficultyLevelChange = (e) => {
    const selectedDifficulty = e.target.value;
    setQuestionDifficultyLevel(selectedDifficulty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataVal = {
      question:
        questionname +
        " " +
        questionname +
        " " +
        questionname +
        " " +
        questionname +
        " " +
        questionname,
    };
    const tagresponse = await axios.post(
      "https://us-central1-serverless-question-tagging.cloudfunctions.net/question-tag",
      dataVal
    );
    console.log("------------------------------------------------");
    const tags = tagresponse?.data[0]?.split("/")?.join(",")?.substring(1);

    const data = {
      Id: questionId,
      Question: questionname,
      Option1: option1,
      Option2: option2,
      Option3: option3,
      Option4: option4,
      Answer: answer,
      Hint: hint,
      Category: questioncategory,
      Difficulty: questiondifficultylevel,
      GameId: gameId,
      AutomatedTag: tags,
    };

    const requestPayload = {
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      await axios.post(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions",
        requestPayload
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  ">
          Update Question For Game
        </div>

        <form action="#">
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Question <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={questionname}
              onChange={(e) => setQuestionName(e.target.value)}
              placeholder="Enter Question"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Option 1 <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={option1}
              onChange={(e) => setoption1(e.target.value)}
              placeholder="Enter Question"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Option 2 <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={option2}
              onChange={(e) => setoption2(e.target.value)}
              placeholder="Enter Option 1"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Option 3 <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={option3}
              onChange={(e) => setoption3(e.target.value)}
              placeholder="Enter Option 2"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Option 4 <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={option4}
              onChange={(e) => setoption4(e.target.value)}
              placeholder="Enter Option 3"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Answer <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Option 4"
              required
            />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Hint <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Enter Hint"
              required
            />
          </div>

          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Category <span className="text-red-600">*</span>
            </span>
            <select
              id="questioncategory"
              value={questioncategory}
              onChange={handleCategoryChange}
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            >
              <option value="">Select Category</option>
              {categories.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Difficulty Level <span className="text-red-600">*</span>
            </span>
            <select
              id="questiondifficultylevel"
              value={questiondifficultylevel}
              onChange={handleDifficultyLevelChange}
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            >
              <option value="">Select Difficulty Level</option>
              {difficultylevel.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex   items-center mt-3">
            <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer">
              <input
                type="submit"
                value="Update"
                className="cursor-pointer"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
