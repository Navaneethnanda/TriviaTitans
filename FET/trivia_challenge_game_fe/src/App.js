import { useState, useEffect } from "react";
import Header from "./components/authentication/Header";
import Regestration from "./components/authentication/Regestration";
import Home from "./components/authentication/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import bgImg from "./Assets/bg-doodle.jpeg";
import "./App.css";
import Login from "./components/authentication/Login";
import ProfilePage from "./components/authentication/ProfilePage";
import SecurityQuestion from "./components/authentication/SecurityQuestion";
import AdminHome from "./components/Admin/AdminHome";
import GameCreation from "./components/Admin/GameCreation";
import QuestionCreation from "./components/Admin/QuestionCreation";
import Question from "./components/Admin/Questions";
import EditQuestion from "./components/Admin/EditQuestion";
import Categories from "./components/Admin/Categories";
import CreateCategory from "./components/Admin/CreateCategory";
import GameLobby from "./components/Lobby/GameLobby";
import GameDetailsPage from "./components/Lobby/GameDetailsPage";
import Chat from "./components/Game/Chat";
import Chatbot from "./components/chatbot/Chatbot";
import GamePage from "./components/Game/GamePage";
import TeamOptions from "./components/Team/teamOptions";
import CreateTeam from "./components/Team/createTeam";
import SelectTeam from "./components/Team/selectTeam";
import ManageTeam from "./components/Team/manageTeam";
import InviteMember from "./components/Team/inviteMember";
import Invitation from "./components/Team/getInvitation";
import GameDashBoard from "./components/Admin/GameDashboard";
import Leaders from "./components/leaders/Leaders";
import Temp from "./components/Temp";

import PostGame from "./components/Game/PostGame";
import { TempleBuddhist } from "@mui/icons-material";
function App() {
 

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen"
    >
      <Router>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/Regestration" element={<Regestration />} />
          <Route path="/SQ" element={<SecurityQuestion />} />
          <Route path="/team" element={<TeamOptions />} />
          <Route path="/team/create" element={<CreateTeam />} />
          <Route path="/team/select-team" element={<SelectTeam />} />
          <Route path="/team/manage/:teamname" element={<ManageTeam />} />
          <Route path="/team/:teamname/invite" element={<InviteMember />} />
          <Route
            path="/invitation/:teamname/:inviter"
            element={<Invitation />}
          />

          {/*Admin Routes */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/creategame" element={<GameCreation />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/createquestion" element={<QuestionCreation />} />
          <Route path="/editquestions" element={<EditQuestion />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/createcategory" element={<CreateCategory />} />

          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/gameDetails" element={<GameDetailsPage />} />
          <Route path="/game/:id" element={<GamePage />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/gamedashboardadmin" element={<GameDashBoard />} />
              
          <Route path="/postgame/:id" element={<PostGame />} /> 
          <Route path="/temp" element={<Temp />} /> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
