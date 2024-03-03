import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Testingpage from './pages/Testingpage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Testingpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
