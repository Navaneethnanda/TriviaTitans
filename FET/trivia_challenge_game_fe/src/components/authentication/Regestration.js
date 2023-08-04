import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";
import axios from "axios";



export default function Regestration() {


  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");

  const questionOptions = [
    "What is your favorite color?",
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What is your favorite movie?",
    "What city were you born in?",
  ];

  const handleQuestion1Change = (e) => {
    const selectedQuestion = e.target.value;
    setQuestion1(selectedQuestion);
    setQuestion2(selectedQuestion !== question2 ? question2 : "");
    setQuestion3(selectedQuestion !== question3 ? question3 : "");
  };

  const handleQuestion2Change = (e) => {
    const selectedQuestion = e.target.value;
    setQuestion2(selectedQuestion);
    setQuestion1(selectedQuestion !== question1 ? question1 : "");
    setQuestion3(selectedQuestion !== question3 ? question3 : "");
  };

  const handleQuestion3Change = (e) => {
    const selectedQuestion = e.target.value;
    setQuestion3(selectedQuestion);
    setQuestion1(selectedQuestion !== question1 ? question1 : "");
    setQuestion2(selectedQuestion !== question2 ? question2 : "");
  };




  const setData = async () => {
    try {
      const data = {
        "username": email,
        "securityQuestion1": question1,
        "securityQuestion2": question2,
        "securityQuestion3": question3,
        "answer1": answer1,
        "answer2": answer2,
        "answer3": answer3,
      }
      const response = await axios.post('https://r66ypo4nf8.execute-api.us-east-1.amazonaws.com/test/setsq', data);
      console.log(response);


    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };




  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // File or URL
  const [gamesPlayed, setGamesPlayed] = useState("");
  const [totalWins, setTotalWins] = useState("");
  const [points, setPoints] = useState("");


  const navigate = useNavigate();




  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expression patterns
    const lettersOnly = /^[A-Za-z]+$/;
    // regex reference https://mailtrap.io/blog/validate-emails-in-react/#:~:text=Normally%2C%20React%20email%20validation%20regex,%5BA%2DZ0%2D9.
    const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //regex reference https://stackoverflow.com/a/19605207/12443260
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


    if (firstName === '') {
      alert('First Name is required.');
      return;
    }
    if (!firstName.match(lettersOnly)) {
      alert('First Name should contain only letters.');
      return;
    }

    // Validate last name
    if (lastName === '') {
      alert('Last Name is required.');
      return;
    }
    if (!lastName.match(lettersOnly)) {
      alert('Last Name should contain only letters.');
      return;
    }

    // Validate email
    if (email === '') {
      alert('Email is required.');
      return;
    }
    if (!email.match(emailFormat)) {
      alert('Invalid Email format.');
      return;
    }

    // Validate password
    if (password === '') {
      alert('Password is required.');
      return;
    }
    if (!password.match(passwordFormat)) {
      alert('Password should be alphanumeric and contain at least 8 characters with special characters.');
      return;
    }

    // Validate confirm password
    if (confirmPassword === '') {
      alert('Confirm Password is required.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Confirm Password should match the Password field.');
      return;
    }

    if (!answer1.match(lettersOnly)) {
      alert('security question answer should contain only letters.');
      return;
    }

    if (!answer2.match(lettersOnly)) {
      alert('security question answer should contain only letters.');
      return;
    }

    if (!answer3.match(lettersOnly)) {
      alert('security question answer should contain only letters.');
      return;
    }



    setPersistence(auth, browserLocalPersistence).then(async () => {

      await setData();


      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const displayName = firstName + " " + lastName;
      await updateProfile(auth.currentUser, { displayName: displayName }).catch(
        (err) => console.log(err)
      );
      const userData = {
        name:firstName+" "+lastName,
        email:email,
        phoneNumber:"",
        address:"",
        profilePicture:"",
        gamesPlayed:0,
        totalWins:0,
        points:0
      };

      saveUserData(userData);

      navigate('/login');

    });

  };
  const saveUserData = (userData) => {
    axios
      .post('https://1on3r7usi4.execute-api.us-east-1.amazonaws.com/updateUserDetails/updateuserdetails', userData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error saving data:", error);
      });
  };
  return (
    <div className="flex items-center justify-center">

      <div className="bg-white w-full sm:w-[640px] margin top mt-6 mb-16 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  " >Registration</div>












        <form action="#">
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 sm:space-x-4">
            <div className="w-full  inline-grid grid-cols-1">
              <span className="mb-2">First Name <span className="text-red-600">*</span></span>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" placeholder="E.g: John " type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="w-full inline-grid grid-cols-1">
              <span className="mb-2">Last Name <span className="text-red-600">*</span></span>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="smith" required />
            </div>
          </div>
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">Email / Username <span className="text-red-600">*</span></span>
            <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johnsmith@hotmail.com" required />
          </div>
          <div className="my-4 grid grid-cols-1 sm:grid-cols-2 sm:space-x-4">
            <div className="w-full  inline-grid grid-cols-1">
              <span className="mb-2">Password <span className="text-red-600">*</span></span>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />
            </div>
            <div className="w-full  inline-grid grid-cols-1">
              <span className="mb-2">Confirm Password <span className="text-red-600">*</span></span>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" required />
            </div>

          </div>









          <div className="container mx-auto mt-8">
            <h2 className="text-lg font-bold mb-4">Security Questions</h2>

            <div className="flex flex-col space-y-4">
              <label htmlFor="question1" className="font-medium">
                Question 1 <span className="text-red-600">*</span>
              </label>
              <select
                id="question1"
                value={question1}
                onChange={handleQuestion1Change}
                className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              >
                <option value="">Select a question</option>
                {questionOptions
                  .filter((option) => option !== question2 && option !== question3)
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="email" value={answer1} onChange={(e) => setAnswer1(e.target.value)} placeholder="Anwer" required />
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              <label htmlFor="question2" className="font-medium">
                Question 2 <span className="text-red-600">*</span>
              </label>
              <select
                id="question2"
                value={question2}
                onChange={handleQuestion2Change}
                className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              >
                <option value="">Select a question</option>
                {questionOptions
                  .filter((option) => option !== question1 && option !== question3)
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="email" value={answer2} onChange={(e) => setAnswer2(e.target.value)} placeholder="Anwer" required />
            </div>

            <div className="flex flex-col space-y-4 mt-4">
              <label htmlFor="question3" className="font-medium">
                Question 3 <span className="text-red-600">*</span>
              </label>
              <select
                id="question3"
                value={question3}
                onChange={handleQuestion3Change}
                className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              >
                <option value="">Select a question</option>
                {questionOptions
                  .filter((option) => option !== question1 && option !== question2)
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              <input className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1" type="email" value={answer3} onChange={(e) => setAnswer3(e.target.value)} placeholder="Anwer" required />

            </div>
          </div>







          <div className="flex   items-center mt-8">
            <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md  cursor-pointer">
              <input type="submit" value="Register" onClick={handleSubmit}  />

            </div>
            <Link to="/Login" className="text-blue-800 underline ml-auto">already a user? Login</Link>
          </div>

        </form>



      </div>
    </div>


  );


}