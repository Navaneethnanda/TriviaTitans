import { useState,useEffect } from "react";
import dogo from '../../Assets/dogo.avif'
import { useNavigate } from 'react-router-dom';
import {  signOut,onAuthStateChanged } from "firebase/auth";
import { HeartIcon } from '@heroicons/react/24/solid';
import { auth } from '../../firebase';


export default function ProfilePage() {
    const navigate=useNavigate();

    const [currentUser,setCurrentUser]=useState("");

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setCurrentUser(user.displayName);
            } else {
             navigate("/login");
            }
          });
    },[]);




   

    const [liked, setliked] = useState(true);


    const handleLogout = () => {               
        signOut(auth).then(() => {
 console.log("loggedout");
 navigate("/login");
}).catch((error) => {

 console.log("error",error);
});
    }

    return (
        <div className="flex items-center justify-center ">

            <div className="bg-white w-full sm:w-[640px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
                <div className="font-bold text-3xl mb-4  mx-auto text-center" >Profile </div>
                <div>

                    <img className="mx-auto rounded-full h-52 w-52 object-cover" src={dogo} onClick={() => setliked(!liked)} alt="profile pic" />

                    <HeartIcon className="w-7  relative mx-auto bottom-8" style={{ color: liked ? "#ffadad" : "red" }} onClick={() => setliked(!liked)} />
                </div>
                
               <div >
                    <div className=" text-2xl mt-4" >{currentUser}</div>

                    

                    <div className=""><button className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md" onClick={handleLogout}>signout</button></div>

                 

                </div>









            </div>
        </div>


    );


}