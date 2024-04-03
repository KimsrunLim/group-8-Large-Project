import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import HomePage from './pages/HomePage.js';
import LeaderBoardPage from './pages/LeaderBoardPage.js';
import SpeedTypingPage from './pages/SpeedTypingPage.js';
import ReactionGamePage from './pages/ReactionGamePage.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/home" index element={<HomePage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<SignupPage />} />
        <Route path="/leaderboard" index element={<LeaderBoardPage />} />
        <Route path="/speedtyping" index element={<SpeedTypingPage />} />
        <Route path="/reactiongame" index element={<ReactionGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
