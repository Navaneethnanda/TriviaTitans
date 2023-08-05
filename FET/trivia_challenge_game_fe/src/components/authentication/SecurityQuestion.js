import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithRedirect,FacebookAuthProvider, signInWithEmailAndPassword, setPersistence, browserSessionPersistence,signInWithPopup,GoogleAuthProvider } from "firebase/auth";




export default function SecurityQuestion() {
 
    const navigate=useNavigate();
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    const [usersAnswer,setUsersAnswer] = useState("");
    const [type,setType]=useState("user");

    const location = useLocation();
    const data = location.state;
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");;

    useEffect(()=>{
if(data){
setUsername(data.username);
setPassword(data.password);
}
else{
    navigate("/login");
}

    },[]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.post('https://r66ypo4nf8.execute-api.us-east-1.amazonaws.com/test/sq',  {
                username:data.username
              });
              setQuestion(response.data.Question);
              setAnswer(response.data.answer);
              setType(response.data.role);
              console.log(response);
              console.log(response.data.answer,"f");
              localStorage.setItem("type",response.data.role);

            } catch (error) {
              console.log('Error fetching data:', error);
            }
          };
    
        fetchData();
      }, []);


      const login=()=>{
        console.log("sdfsddsf");
        if(usersAnswer==answer){
            
          console.log(123);
                signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                  const user = userCredential.user;


                  navigate('/lobby');

                })
                .catch((error) => {
                  console.log("login error");
                })
          
          
          
        }
        else{
          console.log(12);
            navigate("/login");
        }

      };
    





  return (
    <div className="flex items-center justify-center ">

      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4" >Security Question</div>


        <div className="w-full inline-grid grid-cols-1">
        <span className="mb-2"> {question} <span className="text-red-600">*</span> </span>
        <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text"  value={usersAnswer} onChange={(e) => setUsersAnswer(e.target.value)} placeholder="johnsmith@hotmail.com" required />
      </div>

        
      <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md my-6 ">
      <button type="submit" onClick={login}>Login</button>
      </div>

     




      </div>
    </div>


  );


}