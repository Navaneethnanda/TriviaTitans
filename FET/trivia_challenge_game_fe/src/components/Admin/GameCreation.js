import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function GameCreation() {
  const navigate = useNavigate();
  const [gamename, setGameName] = useState();
  const [gamecategory, setGameCategory] = useState();
  const [gamedifficultylevel, setGameDifficultyLevel] = useState();

  const date = new Date();
  let formatteddate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const [gamestartDate, setGameStartDate] = useState(formatteddate);
  const [categories, setCategories] = useState([]);
  const [gamestartTime, setGameStarttime] = useState("");

  const difficultylevel = ["Easy", "Medium", "Hard"];

  const handleDateChange = (date) => {
    let formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    setGameStartDate(formattedDate);
  };

  const handleTimeChange = (date) => {
    setGameStarttime(String(date.format("HH:mm")));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setGameCategory(selectedCategory);
  };

  const handleDifficultyLevelChange = (e) => {
    const selectedDifficulty = e.target.value;
    setGameDifficultyLevel(selectedDifficulty);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/categories"
        );

        setCategories(response.data.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomId = uuidv4();

    if (
      !gamename ||
      !gamecategory ||
      !gamedifficultylevel ||
      !gamestartDate ||
      !gamestartTime
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const data = {
      Id: randomId,
      GameName: gamename,
      Category: gamecategory,
      Difficulty: gamedifficultylevel,
      StartDate: gamestartDate,
      StartTime: gamestartTime,
    };

    const requestPayload = {
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      await axios.post(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games",
        requestPayload
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    try{ 
      const newGameAlertData = {
        "GameName": gamename
      }
      const response = await axios.post("https://nliq5hix4m.execute-api.us-east-1.amazonaws.com/prod", newGameAlertData);
    } catch (error) {
      console.error("Error sending new game alert", error);
    }

    navigate("/admin");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {categories?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
              <div className="font-bold text-2xl mb-4  ">Create Game</div>

              <form action="#">
                <div className="w-full inline-grid grid-cols-1">
                  <span className="mb-2">
                    Game Name <span className="text-red-600">*</span>
                  </span>
                  <input
                    className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
                    type="text"
                    value={gamename}
                    onChange={(e) => {
                      setGameName(e.target.value);
                      console.log(gamestartTime);
                    }}
                    placeholder="Enter Game Name"
                    required
                  />
                </div>
                <div className="w-full inline-grid grid-cols-1">
                  <span className="mb-2">
                    Category <span className="text-red-600">*</span>
                  </span>
                  <select
                    id="gamecategory"
                    value={gamecategory}
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
                  <span className="mb-2">
                    Difficulty Level <span className="text-red-600">*</span>
                  </span>
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

                <div className="w-full inline-grid grid-cols-1 mt-5">
                  <span className="mb-2">
                    Start Date <span className="text-red-600">*</span>
                  </span>
                  <div className="flex justify-start items-center ">
                    <DatePicker
                      format="MM-dd-y"
                      value={gamestartDate}
                      onChange={(date) => {
                        handleDateChange(date);
                      }}
                      className=" border-gray-200 border-[1px] rounded-sm shadow-sm p-1 mr-2"
                    />
                  </div>
                </div>

                <div className="w-full inline-grid grid-cols-1 mt-5">
                  <span className="mb-2">
                    Time <span className="text-red-600">*</span>
                  </span>
                  <div className="flex justify-start items-center ">
                    <StaticTimePicker
                      label="Controlled picker"
                      value={gamestartTime}
                      onChange={(newValue) => handleTimeChange(newValue)}
                    />
                  </div>
                </div>

                <div className="flex   items-center mt-3">
                  <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer">
                    <input
                      type="submit"
                      value="Create"
                      className="cursor-pointer"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center cursor-pointer ">
            <div className="bg-white w-full sm:w-[480px] mx-auto text-center margin top mt-3 p-4 rounded-md shadow-sm border-[1px]">
              <button
                className="font-bold text-3xl mb-4  mx-auto text-center"
                style={{ color: "green" }}
                onClick={() => handleBack()}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </LocalizationProvider>
  );
}
