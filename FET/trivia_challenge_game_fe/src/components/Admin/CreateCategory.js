import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [categoryname, setCategoryName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomId = uuidv4();

    const data = {
      Id: randomId,
      Category: categoryname,
    };

    const requestPayload = {
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      await axios.post(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/categories",
        requestPayload
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    navigate("/categories");
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  ">
          Create Category For Game
        </div>

        <form action="#">
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Categort <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="text"
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category"
              required
            />
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
  );
}
