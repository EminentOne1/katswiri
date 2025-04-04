import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import '@ant-design/v5-patch-for-react-19';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
    
      </Routes>
    </Router>
  );
};

export default App;
