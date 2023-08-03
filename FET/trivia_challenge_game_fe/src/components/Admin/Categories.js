import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [allcategories, setAllCategories] = useState();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/categories"
        );
        console.log(response.data.value);
        setAllCategories(response.data.value);
        setData(allcategories);
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
      " https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/deletecategory",
      dataVal
    );

    try {
      const response = await axios.get(
        "https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/categories"
      );
      setAllCategories(response.data.value);
      setData(allcategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRedirect = () => {
    navigate("/createcategory");
  };

  return (
    <>
      {data?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[480px] mx-auto text-center margin top mt-3 p-4 rounded-md shadow-sm border-[1px]">
              <button
                className="font-bold text-3xl mb-4  mx-auto text-center"
                style={{ color: "blue" }}
                onClick={() => handleRedirect()}
              >
                Create Category
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="bg-white w-full sm:w-[100%] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "45%", color: "black" }}>ID</th>
                    <th style={{ width: "35%", color: "black" }}>Category</th>
                    <th style={{ width: "20%", color: "black" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allcategories.map((item) => (
                    <tr key={item.Id}>
                      <td
                        style={{
                          textAlign: "center",
                          width: "45%",
                          color: "blue",
                        }}
                      >
                        {item.Id}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "35%",
                          color: "blue",
                        }}
                      >
                        {item.Category}
                      </td>
                      <td style={{ textAlign: "center", width: "20%" }}>
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
