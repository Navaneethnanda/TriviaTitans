import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import 'react-datepicker/dist/react-datepicker.css';

export default function QuestionCreation() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameId = location.state;
  console.log("---------------");
  console.log(gameId);
  const [questionname, setQuestionName] = useState();
  const [option1, setoption1] = useState();
  const [option2, setoption2] = useState();
  const [option3, setoption3] = useState();
  const [option4, setoption4] = useState();
  const [answer, setAnswer] = useState();
  const [hint, setHint] = useState();
  const [questioncategory, setQuestionCategory] = useState();
  const [questiondifficultylevel, setQuestionDifficultyLevel] = useState();
  const [categories, setCategories] = useState([]);



  const difficultylevel = [
    "Easy",
    "Medium",
    "Hard"
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    setQuestionCategory(selectedCategory);
  };


  const handleDifficultyLevelChange = (e) => {
    const selectedDifficulty = e.target.value;
    console.log(selectedDifficulty);
    setQuestionDifficultyLevel(selectedDifficulty);
  };

  useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await axios.get('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/categories');
        console.log(response.data.value);
        setCategories(response.data.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

  fetchData();
 },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("-------------------------------")
    console.log(questionname);
    console.log(option1);
    console.log(option2);
    console.log(option3);
    console.log(option4);
    console.log(answer);
    console.log(hint);
    console.log(questioncategory);
    console.log(questiondifficultylevel);
  
    const randomId = uuidv4();

    const data={
      "Id": randomId,
      "Question": questionname,
      "Option1": option1,
      "Option2": option2,
      "Option3": option3,
      "Option4": option4,
      "Answer": answer,
      "Hint": hint,
      "Category": questioncategory,
      "Difficulty": questiondifficultylevel,
      "GameId": gameId
      }

      const requestPayload = {
        method: 'POST',
        body: JSON.stringify(data) // Convert the data object to a JSON string
      };

      try {
      const response = await axios.post('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions',requestPayload);
      console.log(response.data.value);
      }catch (error) {
        console.log('Error fetching data:', error);
      }
      navigate("/admin");
  };

  return (
    <>  
    {categories?.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <> 
    <div className="flex items-center justify-center ">

      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  " >Create Question For Game</div>

        <form action="#">
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Question <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={questionname} onChange={(e) => setQuestionName(e.target.value)} placeholder="Enter Question" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Option 1 <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={option1} onChange={(e) => setoption1(e.target.value)} placeholder="Enter Question" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Option 2 <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={option2} onChange={(e) => setoption2(e.target.value)} placeholder="Enter Option 1" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Option 3 <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={option3} onChange={(e) => setoption3(e.target.value)} placeholder="Enter Option 2" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Option 4 <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={option4} onChange={(e) => setoption4(e.target.value)} placeholder="Enter Option 3" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Answer <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter Option 4" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Hint <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={hint} onChange={(e) => setHint(e.target.value)} placeholder="Enter Hint" required />
          </div>

          <div className="w-full inline-grid grid-cols-1">
          <span className="mb-2">Category <span className="text-red-600">*</span></span>
          <select
            id="questioncategory"
            value={questioncategory}
            onChange={handleCategoryChange}
            className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
          >
            <option value="">Select Category</option>
            {categories.map((option, index) => (
                <option key={index} value={option.Category}>
                  {option.Category}
                </option>
              ))}
          </select>     
          </div>
          <div className="w-full inline-grid grid-cols-1">
          <span className="mb-2">Difficulty Level <span className="text-red-600">*</span></span>
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
              <input type="submit" value="Create" className="cursor-pointer" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
    )}
   </>
  );
}