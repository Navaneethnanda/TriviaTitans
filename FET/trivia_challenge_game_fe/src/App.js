import { useState,useEffect } from 'react';
import Header from './components/authentication/Header';
import Regestration from './components/authentication/Regestration';
import Home from './components/authentication/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,useNavigate
} from "react-router-dom";
import bgImg from './Assets/bg-doodle.jpeg';
import './App.css';
import Login from './components/authentication/Login';
import ProfilePage from './components/authentication/ProfilePage';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import SecurityQuestion from './components/authentication/SecurityQuestion';

function App() {
  const [currentUser,setCurrentUser]=useState("");
  

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
      } else {
          setCurrentUser("")
      }
    });
},[]);



  return (
    <div style={{
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }} className='min-h-screen'>






      <Router>
        <Header />


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path='/' element={<Home />} />
      
          <Route path='/Login' element={<Login />} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/Regestration' element={<Regestration />} />
          <Route path='/SQ' element={<SecurityQuestion />} />
        
      
          </Routes>
      </Router>

    </div>
  );
}

export default App;
