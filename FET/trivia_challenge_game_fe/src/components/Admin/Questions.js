import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Question() {
  const [allquestions, setAllQuestions] = useState();
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { object } = location.state;
  const gameId = object.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions"
        );
        const alldata = response.data.value;
        const filteredArray = alldata.filter((item) => item.GameId === gameId);
        setAllQuestions(filteredArray);
        setData(allquestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleDelete = async (id) => {
    console.log(id);
    const dataVal = {
      deleteId: id,
    };

    await axios.post(
      "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/deletequestion",
      dataVal
    );
    try {
      const response = await axios.get(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/questions"
      );
      const alldata = response.data.value;
      const filteredArray = alldata.filter((item) => item.GameId === gameId);
      setAllQuestions(filteredArray);
      setData(allquestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID: ${id}`);
    navigate("/editquestions", { state: id });
  };

  const handleRedirect = () => {
    navigate("/createquestion", { state: gameId });
  };

  return (
    <>
      {data?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[45%] margin top mt-3 p-3 rounded-md shadow-sm border-[1px]">
              <div
                className="font-bold text-3xl mb-4  mx-auto text-center"
                style={{ color: "green" }}
              >
                {object.name}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[480px] mx-auto text-center margin top mt-3 p-4 rounded-md shadow-sm border-[1px]">
              <button
                className="font-bold text-3xl mb-4  mx-auto text-center"
                style={{ color: "blue" }}
                onClick={() => handleRedirect()}
              >
                Create Question
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[100%] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "30%", color: "black" }}>ID</th>
                    <th style={{ width: "20%", color: "black" }}>Question</th>
                    <th style={{ width: "15%", color: "black" }}>Answer</th>
                    <th style={{ width: "10%", color: "black" }}>Category</th>
                    <th style={{ width: "10%", color: "black" }}>Difficulty</th>
                    <th style={{ width: "15%", color: "black" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allquestions.map((item) => (
                    <tr key={item.Id}>
                      <td
                        style={{
                          textAlign: "center",
                          width: "30%",
                          color: "blue",
                        }}
                      >
                        {item.Id}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "20%",
                          color: "blue",
                        }}
                      >
                        {item.Question}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "15%",
                          color: "blue",
                        }}
                      >
                        {item.Answer}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "10%",
                          color: "blue",
                        }}
                      >
                        {item.Category}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "10%",
                          color: "blue",
                        }}
                      >
                        {item.Difficulty}
                      </td>
                      <td style={{ textAlign: "center", width: "15%" }}>
                        <button
                          style={{ color: "green" }}
                          onClick={() => handleEdit(item.Id)}
                        >
                          Edit{" "}
                        </button>
                        <button
                          style={{ color: "red" }}
                          onClick={() => handleDelete(item.Id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[480px] mx-auto text-center margin top mt-3 p-4 rounded-md shadow-sm border-[1px]">
              <button
                className="font-bold text-3xl mb-4  mx-auto text-center"
                style={{ color: "black" }}
                onClick={() => handleBack()}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
