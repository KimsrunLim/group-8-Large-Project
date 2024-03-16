import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import HomePage from './pages/HomePage.js';
import LeaderBoardPage from './pages/LeaderBoardPage.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/home" index element={<HomePage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
