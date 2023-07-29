import { useState, useEffect } from "react";
import dogo from "../../Assets/dogo.avif";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { HeartIcon } from "@heroicons/react/24/solid";
import { auth } from "../../firebase";
import Modal from "react-modal";
import axios from "axios";
import Chatbot from "../chatbot/Chatbot";

export default function ProfilePage() {
  const [saved, setsaved] = useState(true);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [liked, setLiked] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // File or URL
  const [profilePictureUrl, setProfilePictureUrl] = useState(""); // File or URL
  const [gamesPlayed, setGamesPlayed] = useState("");
  const [totalWins, setTotalWins] = useState("");
  const [points, setPoints] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chat,setChat]=useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);

        fetchActiveUserDetails(user.email);
        localStorage.setItem("email",user.email);
        localStorage.setItem("username",user.displayName);
        //setName(user.displayName || "");
        //setEmail(user.email || "");
      } else {
        navigate("/login");
      }
    });
  }, []);

  const fetchActiveUserDetails = (email) => {
    axios
      .post(
        "https://1on3r7usi4.execute-api.us-east-1.amazonaws.com/getUserDetails/getuserdetails",
        { email }
      )
      .then((response) => {
        //console.log("User details:", response.data);
        const userData = JSON.parse(response.data.body).user;
        console.log("User details:", userData);
        console.log("**User details:", response.data);
        setCurrentUser(userData);
        setEmail(userData?.email || "");
        setName(userData.name || "");
        setProfilePicture(userData.profilePicture || "");
        setProfilePictureUrl(userData.profilePictureUrl || "");
        setPhoneNumber(userData.phoneNumber || "");
        setAddress(userData.address || "");
        setGamesPlayed(userData.gamesPlayed || 0);
        setTotalWins(userData.totalWins || 0);
        setPoints(userData.points || 0);
      })
      .catch((error) => {
        console.log("Error fetching user details:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDetails = () => {
    const userData = {
      name,
      email,
      phoneNumber,
      address,
      profilePicture,
      gamesPlayed,
      totalWins,
      points,
    };

    setEmail(email);
    setName(name);
    setPhoneNumber(phoneNumber);
    setAddress(address);
    setGamesPlayed(gamesPlayed);
    setTotalWins(totalWins);
    setPoints(points);

    if (profilePicture) {
      try {
        // try {
        //   const formData = new FormData();
        //   formData.append('image', profilePicture);

        //   const response = axios.post('https://1on3r7usi4.execute-api.us-east-1.amazonaws.com/uploadProfilePicture/uploadprofilepicture', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });

        //   userData.profilePictureUrl = response.data.profilePictureUrl
        //   console.log('Image uploaded successfully');
        // } catch (error) {
        //   console.error('Error uploading image:', error);
        // }
        // If profilePicture is set, upload it to S3
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const base64Data = fileReader.result.split(",")[1];
          userData.profilePicture = base64Data; // Set profilePicture to the base64-encoded data
          console.log("if***" + userData);
          saveUserData(userData);
        };
        fileReader.readAsDataURL(profilePicture);
      } catch (e) {
        saveUserData(userData);
      }
    } else {
      console.log("else***" + userData);
      saveUserData(userData);
    }
  };

  const saveUserData = (userData) => {
    axios
      .post(
        "https://1on3r7usi4.execute-api.us-east-1.amazonaws.com/updateUserDetails/updateuserdetails",
        userData
      )
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log("Error saving data:", error);
      });
  };

  return (
    <div className="flex items-center justify-center ">
    <div className={"fixed bottom-4 right-4  p-3 text-xl rounded-lg transition-opacity duration-500 ease-in-out  md:w-[40vw] xl:w-[30vw] "+(chat?"opacity-0 hidden":"opacity-100 block") } >
    <Chatbot chat={chat} setChat={setChat}/>
    </div>
      <div className="bg-white w-full sm:w-[640px] margin top mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-3xl">Profile</div>
          <button
            className="bg-blue-500 text-white font-bold text-xl p-4 rounded-md"
            onClick={handleLogout}
          > 
            Signout
          </button>
        </div>

        <div>
          <img
            className="mx-auto rounded-full h-52 w-52 object-cover"
            src={currentUser.profilePicture} // Update this line
            onClick={() => setLiked(!liked)}
            alt="profile pic"
          />
          <HeartIcon
            className="w-7 relative mx-auto bottom-8"
            style={{ color: liked ? "#ffadad" : "red" }}
            onClick={() => setLiked(!liked)}
          />
        </div>

        <div className="mt-8">
          <div className="flex justify-between">
            <p className="text-2xl">
              <b>Personal Details</b>
            </p>
            <button
              className="bg-blue-500 text-white font-bold text-xl p-2 rounded-md"
              onClick={handleOpenModal}
            >
              Edit
            </button>
          </div>
          <div className="text-2xl mt-4">Email: {email}</div>
          <div className="text-2xl mt-4">Name: {name}</div>
          <div className="text-2xl mt-4">Phone: {phoneNumber}</div>
          <div className="text-2xl mt-4">Address: {address}</div>
        </div>

        <div className="bg-gray-100 p-4 mt-8">
          <p className="text-2xl text-center">Trivia Statistics</p>
          <div className="text-2xl mt-4">Total Games Played: {gamesPlayed}</div>
          <div className="text-2xl mt-4">Total Wins: {totalWins}</div>
          <div className="text-2xl mt-4">Total Points: {points}</div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Modal"
        className="flex items-center justify-center"
      >
        <div className="bg-white w-full sm:w-[640px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
          <h2 className="text-2xl text-center">Edit Personal Details</h2>
          <span className="mb-2">
            <b>Name</b>
            <span className="text-red-600">*</span>
          </span>
          <input
            className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="email">
            <b>Email</b>
            <span className="text-red-600">*</span>
          </label>
          <input
            className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <br />
          <br />
          <label htmlFor="profilePicture">
            <b>Profile Picture</b>
          </label>
          <br />
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <br />
          <br />
          <label htmlFor="phoneNumber">
            <b>Phone Number</b>
          </label>
          <input
            className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="address">
            <b>Address</b>
          </label>
          <textarea
            className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <br />
          <div className="modal-buttons flex justify-between">
            <div className=" bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer">
              <input
                type="submit"
                value="Save"
                className="cursor-pointer"
                onClick={handleSaveDetails}
              />
            </div>
            <div className=" bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer ">
              <input
                type="submit"
                value="Cancel"
                className="cursor-pointer"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
      </Modal>

      <div
        className={"fixed bottom-4 right-4 bg-[#C1292E] p-3 transition-opacity duration-500 ease-in-out text-white font-bold text-xl rounded-full cursor-pointer  "+(chat?"opacity-100 block":"opacity-0 hidden")}
        onClick={()=>{setChat(!chat)}}>
  <p>    Help and FAQ</p>
        
      </div>
    </div>
  );
}
