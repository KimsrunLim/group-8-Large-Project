import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
