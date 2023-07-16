import { useState,useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { onAuthStateChanged,FacebookAuthProvider,GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function GameCreation() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const fprovider = new FacebookAuthProvider();

  const [gamename, setGameName] = useState();
  const [gamecategory, setGameCategory] = useState();
  const [gamedifficultylevel, setGameDifficultyLevel] = useState();
  const [gamestarttime, setGameStartTime] = useState(new Date());

  const categories = [
    "Arts and Culture",
    "History",
    "Modern Technology",
    "Movies, Books & TV-Shows",
    "Sport"
  ];

  const difficultylevel = [
    "Easy",
    "Medium",
    "Hard"
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    setGameCategory(selectedCategory);
  };

  const handleDifficultyLevelChange = (e) => {
    const selectedDifficulty = e.target.value;
    console.log(selectedDifficulty);
    setGameDifficultyLevel(selectedDifficulty);
  };
//   useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           navigate("/profile");
//         } 
//       });
// },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomId = uuidv4();

    console.log("-------------------------------")
    console.log(gamename);
    console.log(gamecategory);
    console.log(gamedifficultylevel);
    console.log(gamestarttime);

    const data={
      "Id": randomId,
      "GameName": gamename,
      "Category": gamecategory,
      "Difficulty": gamedifficultylevel,
      "StartTime": gamestarttime
      }

      const requestPayload = {
        method: 'POST',
        body: JSON.stringify(data) // Convert the data object to a JSON string
      };

      try {
      const response = await axios.post('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games',requestPayload);
      console.log(response.data.value);
      }catch (error) {
        console.log('Error fetching data:', error);
      }

      const state = {
        id: randomId,
        name: gamename,
        // Add additional values as needed
      };
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center ">

      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  " >Create Game</div>

        <form action="#">
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Game Name <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={gamename} onChange={(e) => setGameName(e.target.value)} placeholder="Enter Game Name" required />
          </div>
          <div className="w-full inline-grid grid-cols-1">
          <span className="mb-2">Category <span className="text-red-600">*</span></span>
          <select
            id="gamecategory"
            value={gamecategory}
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
          <span className="mb-2">Difficulty Level <span className="text-red-600">*</span></span>
          <select
            id="gamedifficultylevel"
            value={gamedifficultylevel}
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

          <div className="w-full inline-grid grid-cols-1">
          <span className="mb-2">Start Date <span className="text-red-600">*</span></span>
          <div>
          <DatePicker selected={gamestarttime} onChange={(gamestarttime) => setGameStartTime(gamestarttime)} />
          </div>
          </div>
          <div className="flex   items-center mt-3">
            <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer">
              <input type="submit" value="Create" className="cursor-pointer" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}