
import { useState,useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

export default function AdminHome() {
    const [allgames, setAllGames] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games');
            console.log(response.data.value);
            setAllGames(response.data.value);
            setData(allgames);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

    fetchData();
  }, []);

    const navigate = useNavigate();
    console.log("-------------")


    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 },
      ]);
    
      const handleView= (id) => {
        // Logic for handling edit action
        console.log(`view game with ID: ${id}`);
        navigate("/questions", {state: id});
      };

    return (
        
        <>  
        {data?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="flex items-center justify-center ">
        <div className="bg-white w-full sm:w-[640px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
            <div className="font-bold text-3xl mb-4  mx-auto text-center" >Create  <Link to="/creategame" className="text-blue-800 underline">Game</Link></div>
            {/* <div className="font-bold text-3xl mb-4  mx-auto text-center" >Create  <Link to="/createquestion" className="text-blue-800 underline">Question</Link></div> */}
        </div>
        </div>
        <div className="flex items-center justify-center ">
        <div className="bg-white w-full sm:w-[100%] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <table style={{ width: '100%'}}>
          <thead>
            <tr style={{ width: '100%'}}>
              <th style={{ width: '30%', color: 'black' }}>Id</th>
              <th style={{ width: '15%', color: 'black' }}>QuizName</th>
              <th style={{ width: '15%', color: 'black' }}>Category</th>
              <th style={{ width: '15%', color: 'black' }}>Difficulty</th>
              <th style={{ width: '15%', color: 'black' }}>Start Time</th>
              <th style={{ width: '10%', color: 'black' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allgames.map((item) => (
              <tr key={item.Id}>
                <td style={{ textAlign: 'center', width: '30%', color: "blue" }}>{item.Id}</td>
                <td style={{ textAlign: 'center', width: '15%', color: "blue" }}>{item.GameName}</td>
                <td style={{ textAlign: 'center', width: '15%', color: "blue" }}>{item.Category}</td>
                <td style={{ textAlign: 'center', width: '15%', color: "blue" }}>{item.Difficulty}</td>
                <td style={{ textAlign: 'center', width: '15%', color: "blue" }}>{item.StartTime}</td>
                <td style={{ textAlign: 'center', width: '10%'}}>
                <button style={{ color: "green" }} onClick={() => handleView(item.Id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </>
        )}
        </>
      );
}