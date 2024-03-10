import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
